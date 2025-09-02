#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const CONFIG_DIR = path.join(os.homedir(), '.claude-config');
const SETTINGS_FILE = path.join(CONFIG_DIR, 'settings.json');
const USAGE_FILE = path.join(CONFIG_DIR, 'usage.json');

// Ensure config directory exists
if (!fs.existsSync(CONFIG_DIR)) {
  fs.mkdirSync(CONFIG_DIR, { mode: 0o700 });
}

// Load or create settings
function loadSettings() {
  if (fs.existsSync(SETTINGS_FILE)) {
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
  }
  return {
    apiEnabled: true,
    forceLocal: false,
    costLimit: null,
    warningThreshold: 10, // $10 default warning
    requireConfirmation: false,
    trackUsage: true
  };
}

// Save settings
function saveSettings(settings) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
  console.log('✅ Settings saved');
}

// Load usage data
function loadUsage() {
  if (fs.existsSync(USAGE_FILE)) {
    return JSON.parse(fs.readFileSync(USAGE_FILE, 'utf8'));
  }
  return {
    totalCalls: 0,
    apiCalls: 0,
    localCalls: 0,
    estimatedCost: 0,
    lastReset: new Date().toISOString(),
    dailyUsage: {}
  };
}

// Save usage data
function saveUsage(usage) {
  fs.writeFileSync(USAGE_FILE, JSON.stringify(usage, null, 2));
}

// Interactive menu
async function showMenu() {
  const settings = loadSettings();
  const usage = loadUsage();

  console.log('\n🎮 Claude Auto - Cost Control Center\n');
  console.log('═══════════════════════════════════════════');

  // Status
  console.log('\n📊 Current Status:');
  console.log(`   API Mode: ${settings.apiEnabled ? '✅ ENABLED' : '❌ DISABLED'}`);
  console.log(`   Force Local: ${settings.forceLocal ? '✅ YES' : '❌ NO'}`);
  console.log(`   Cost Limit: ${settings.costLimit ? `$${settings.costLimit}` : 'None'}`);
  console.log(`   Warning at: $${settings.warningThreshold}`);
  console.log(`   Confirmation: ${settings.requireConfirmation ? '✅ Required' : '❌ Not required'}`);

  // Usage stats
  console.log('\n📈 Usage Statistics:');
  console.log(`   Total Calls: ${usage.totalCalls}`);
  console.log(`   API Calls: ${usage.apiCalls}`);
  console.log(`   Local Calls: ${usage.localCalls}`);
  console.log(`   Estimated Cost: $${usage.estimatedCost.toFixed(4)}`);
  console.log(`   Last Reset: ${new Date(usage.lastReset).toLocaleDateString()}`);

  console.log('\n═══════════════════════════════════════════');
  console.log('\n🔧 Options:\n');
  console.log('  1. 🟢 Enable API Mode (allow API calls)');
  console.log('  2. 🔴 Disable API Mode (force local only)');
  console.log('  3. 💰 Set cost limit');
  console.log('  4. ⚠️  Set warning threshold');
  console.log('  5. ✋ Toggle confirmation requirement');
  console.log('  6. 🔄 Reset usage statistics');
  console.log('  7. 📊 View detailed usage report');
  console.log('  8. 🚫 Emergency shutdown (disable everything)');
  console.log('  9. ❌ Exit\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((_resolve) => {
    rl.question('Select option (1-9): ', async (answer) => {
      rl.close();

      switch(answer) {
      case '1':
        settings.apiEnabled = true;
        settings.forceLocal = false;
        saveSettings(settings);
        console.log('\n✅ API Mode ENABLED - Claude Auto will use API when needed');
        break;

      case '2':
        settings.apiEnabled = false;
        settings.forceLocal = true;
        saveSettings(settings);
        console.log('\n✅ API Mode DISABLED - Only local Claude will be used');
        console.log('💡 This prevents ALL API costs');
        break;

      case '3':
        await setCostLimit(settings);
        break;

      case '4':
        await setWarningThreshold(settings);
        break;

      case '5':
        settings.requireConfirmation = !settings.requireConfirmation;
        saveSettings(settings);
        console.log(`\n✅ Confirmation ${settings.requireConfirmation ? 'REQUIRED' : 'NOT REQUIRED'} for API calls`);
        break;

      case '6':
        await resetUsage();
        break;

      case '7':
        await showDetailedReport();
        break;

      case '8':
        await emergencyShutdown();
        break;

      case '9':
        console.log('\n👋 Goodbye!');
        process.exit(0);
        break;

      default:
        console.log('\n❌ Invalid option');
      }

      // Show menu again unless exiting
      if (answer !== '9') {
        setTimeout(() => showMenu(), 1500);
      }
    });
  });
}

// Set cost limit
async function setCostLimit(settings) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((_resolve) => {
    rl.question('\n💰 Enter cost limit in USD (or 0 for no limit): $', (answer) => {
      rl.close();
      const limit = parseFloat(answer);

      if (isNaN(limit) || limit < 0) {
        console.log('❌ Invalid amount');
        _resolve();
        return;
      }

      settings.costLimit = limit === 0 ? null : limit;
      saveSettings(settings);

      if (settings.costLimit) {
        console.log(`\n✅ Cost limit set to $${settings.costLimit}`);
        console.log('⚠️  API calls will be blocked when limit is reached');
      } else {
        console.log('\n✅ Cost limit removed');
      }

      _resolve();
    });
  });
}

// Set warning threshold
async function setWarningThreshold(settings) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((_resolve) => {
    rl.question('\n⚠️  Enter warning threshold in USD: $', (answer) => {
      rl.close();
      const threshold = parseFloat(answer);

      if (isNaN(threshold) || threshold < 0) {
        console.log('❌ Invalid amount');
        _resolve();
        return;
      }

      settings.warningThreshold = threshold;
      saveSettings(settings);
      console.log(`\n✅ Warning threshold set to $${settings.warningThreshold}`);

      _resolve();
    });
  });
}

// Reset usage statistics
async function resetUsage() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((_resolve) => {
    rl.question('\n⚠️  Reset all usage statistics? (y/n): ', (answer) => {
      rl.close();

      if (answer.toLowerCase() === 'y') {
        const newUsage = {
          totalCalls: 0,
          apiCalls: 0,
          localCalls: 0,
          estimatedCost: 0,
          lastReset: new Date().toISOString(),
          dailyUsage: {}
        };
        saveUsage(newUsage);
        console.log('\n✅ Usage statistics reset');
      } else {
        console.log('\n❌ Reset cancelled');
      }

      _resolve();
    });
  });
}

// Show detailed usage report
async function showDetailedReport() {
  const usage = loadUsage();

  console.log('\n📊 Detailed Usage Report');
  console.log('═══════════════════════════════════════════\n');

  // Overall stats
  console.log('📈 Overall Statistics:');
  console.log(`   Total API Calls: ${usage.apiCalls}`);
  console.log(`   Total Local Calls: ${usage.localCalls}`);
  console.log(`   API/Local Ratio: ${usage.totalCalls ? (usage.apiCalls/usage.totalCalls*100).toFixed(1) : 0}% API`);
  console.log(`   Total Estimated Cost: $${usage.estimatedCost.toFixed(4)}`);
  console.log(`   Average Cost per Call: $${usage.apiCalls ? (usage.estimatedCost/usage.apiCalls).toFixed(4) : 0}`);

  // Daily breakdown
  console.log('\n📅 Daily Usage (last 7 days):');
  const days = Object.keys(usage.dailyUsage || {}).slice(-7);

  if (days.length === 0) {
    console.log('   No usage data yet');
  } else {
    days.forEach(day => {
      const data = usage.dailyUsage[day];
      console.log(`   ${day}: ${data.calls} calls, $${data.cost.toFixed(4)}`);
    });
  }

  // Cost projection
  const daysActive = Math.max(1, Math.floor((Date.now() - new Date(usage.lastReset).getTime()) / (1000 * 60 * 60 * 24)));
  const dailyAverage = usage.estimatedCost / daysActive;

  console.log('\n💵 Cost Projections:');
  console.log(`   Daily Average: $${dailyAverage.toFixed(2)}`);
  console.log(`   Weekly Projection: $${(dailyAverage * 7).toFixed(2)}`);
  console.log(`   Monthly Projection: $${(dailyAverage * 30).toFixed(2)}`);

  console.log('\n═══════════════════════════════════════════');
  console.log('\nPress Enter to continue...');

  return new Promise((_resolve) => {
    process.stdin.once('data', () => _resolve());
  });
}

// Emergency shutdown
async function emergencyShutdown() {
  console.log('\n🚨 EMERGENCY SHUTDOWN ACTIVATED');
  console.log('═══════════════════════════════════════════\n');

  const settings = loadSettings();
  settings.apiEnabled = false;
  settings.forceLocal = true;
  settings.requireConfirmation = true;
  saveSettings(settings);

  console.log('✅ API Mode: DISABLED');
  console.log('✅ Force Local: ENABLED');
  console.log('✅ Confirmation: REQUIRED');
  console.log('\n🛡️ All API calls blocked - No costs will be incurred');
  console.log('💡 Run "claude-auto --cost-control" to re-enable features');

  setTimeout(() => process.exit(0), 2000);
}

// Check if should show cost warning
function checkCostWarning() {
  const settings = loadSettings();
  const usage = loadUsage();

  if (usage.estimatedCost >= settings.warningThreshold) {
    console.log('\n⚠️  WARNING: Estimated costs have reached $' + usage.estimatedCost.toFixed(2));
    console.log('   Run "claude-auto --cost-control" to manage settings\n');
  }

  if (settings.costLimit && usage.estimatedCost >= settings.costLimit) {
    console.log('\n🚫 COST LIMIT REACHED: $' + settings.costLimit);
    console.log('   API calls are now BLOCKED');
    console.log('   Run "claude-auto --cost-control" to adjust limit\n');
    return false; // Block API calls
  }

  return true; // Allow API calls
}

// Export for use in main claude-auto
module.exports = {
  loadSettings,
  saveSettings,
  loadUsage,
  saveUsage,
  checkCostWarning,
  showMenu
};

// Run menu if called directly
if (require.main === module) {
  showMenu();
}
