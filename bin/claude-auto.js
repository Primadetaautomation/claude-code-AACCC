#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const os = require('os');

// Import our API detector
const { needsAPI } = require('../lib/api-detector');
// Import cost control
const costControl = require('../scripts/cost-control');

const CONFIG_DIR = path.join(os.homedir(), '.claude-config');
const API_KEY_FILE = path.join(CONFIG_DIR, 'api-key.encrypted');

function getEncryptedAPIKey() {
  try {
    if (!fs.existsSync(API_KEY_FILE)) {
      return null;
    }
    
    const encryptedData = fs.readFileSync(API_KEY_FILE, 'utf8');
    const [iv, encrypted] = encryptedData.split(':');
    
    // Use machine-specific key for decryption
    const key = crypto.scryptSync(os.hostname() + os.userInfo().username, 'salt', 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('❌ Error reading API key:', error.message);
    return null;
  }
}

function getAPIKey() {
  // First check environment variable
  if (process.env.ANTHROPIC_API_KEY) {
    return process.env.ANTHROPIC_API_KEY;
  }
  
  // Then check encrypted file
  return getEncryptedAPIKey();
}

function callClaudeWithAPI(task) {
  // Check cost controls first
  const settings = costControl.loadSettings();
  const usage = costControl.loadUsage();
  
  // Check if API is disabled
  if (!settings.apiEnabled || settings.forceLocal) {
    console.log('⚠️  API Mode is DISABLED (Cost Control)');
    console.log('💡 Using local Claude instead...');
    callLocalClaude();
    return;
  }
  
  // Check cost limit
  if (settings.costLimit && usage.estimatedCost >= settings.costLimit) {
    console.log('🚫 COST LIMIT REACHED: $' + settings.costLimit);
    console.log('💡 Using local Claude instead...');
    console.log('   Run "claude-auto --cost-control" to adjust limit');
    callLocalClaude();
    return;
  }
  
  // Show cost warning if needed
  if (usage.estimatedCost >= settings.warningThreshold) {
    console.log('⚠️  Cost Warning: $' + usage.estimatedCost.toFixed(2) + ' spent this period');
  }
  
  // Require confirmation if enabled
  if (settings.requireConfirmation) {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    console.log('\n💰 This will use the Claude API (costs apply)');
    console.log('   Estimated cost: ~$0.015 per call');
    rl.question('   Continue? (y/n): ', (answer) => {
      rl.close();
      if (answer.toLowerCase() !== 'y') {
        console.log('❌ Cancelled - using local Claude instead');
        callLocalClaude();
        return;
      }
      proceedWithAPI();
    });
    return;
  }
  
  proceedWithAPI();
  
  function proceedWithAPI() {
    const apiKey = getAPIKey();
    
    if (!apiKey) {
      console.error('❌ No API key found. Run: claude-auto --setup');
      process.exit(1);
    }
    
    // Track usage
    const today = new Date().toISOString().split('T')[0];
    usage.totalCalls++;
    usage.apiCalls++;
    usage.estimatedCost += 0.015; // Rough estimate
    
    if (!usage.dailyUsage[today]) {
      usage.dailyUsage[today] = { calls: 0, cost: 0 };
    }
    usage.dailyUsage[today].calls++;
    usage.dailyUsage[today].cost += 0.015;
    
    costControl.saveUsage(usage);

    try {
      console.log('🤖 Using Claude API (High Context Mode)');
    
    // Pass all arguments to claude command with --api and --max-context flags
    const args = process.argv.slice(2);
    
    // Create environment with API key
    const env = { ...process.env, ANTHROPIC_API_KEY: apiKey };
    
    // Use claude with API mode and max context
    const claude = spawn('claude', ['--api', '--max-context=1000000', ...args], { 
      stdio: 'inherit',
      env: env
    });
    
    claude.on('error', (error) => {
      if (error.code === 'ENOENT') {
        console.error('❌ Claude CLI not found. Please install Claude first.');
        console.error('   Visit: https://claude.ai/cli');
      } else {
        console.error('❌ Error running claude with API:', error.message);
        console.log('🔄 Falling back to local claude...\n');
        callLocalClaude();
        return;
      }
      process.exit(1);
    });
    
    claude.on('close', (code) => {
      if (code !== 0) {
        console.error('❌ Claude API mode failed with exit code:', code);
        console.log('🔄 Falling back to local claude...\n');
        callLocalClaude();
      } else {
        process.exit(code);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('🔄 Falling back to local claude...\n');
    callLocalClaude();
  }
  } // End of proceedWithAPI
}

function callLocalClaude() {
  console.log('💻 Using Local Claude');
  
  // Track local usage
  const usage = costControl.loadUsage();
  usage.totalCalls++;
  usage.localCalls++;
  costControl.saveUsage(usage);
  
  try {
    // Pass all arguments to claude command
    const args = process.argv.slice(2);
    const claude = spawn('claude', args, { stdio: 'inherit' });
    
    claude.on('error', (error) => {
      if (error.code === 'ENOENT') {
        console.error('❌ Claude CLI not found. Please install Claude first.');
        console.error('   Visit: https://claude.ai/cli');
      } else {
        console.error('❌ Error running claude:', error.message);
      }
      process.exit(1);
    });
    
    claude.on('close', (code) => {
      process.exit(code);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

function runSetup() {
  console.log('🔧 Running setup...');
  try {
    execSync('node ' + path.join(__dirname, '..', 'setup.js'), { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Claude Auto Global - Intelligent Claude API Management

Usage:
  claude-auto [options] [task]
  claude-auto --setup          Configure API key
  claude-auto --cost-control   Manage costs and usage
  claude-auto --disable        Quick disable API mode
  claude-auto --enable         Quick enable API mode
  claude-auto --status         Show current status
  claude-auto --help           Show this help

Features:
  🤖 Automatically detects when to use Claude API for large context tasks
  💻 Falls back to local Claude for simple tasks
  🔐 Secure API key storage with encryption
  
Keywords that trigger API mode:
  - entire codebase    - complete analysis
  - all agents        - maximum context
  - 1m tokens         - comprehensive review

Examples:
  claude-auto "Review my entire codebase"          # Uses API
  claude-auto "Fix this function"                  # Uses local Claude
  claude-auto --setup                             # Configure API key

Environment Variables:
  ANTHROPIC_API_KEY    Override stored API key
`);
}

function main() {
  const args = process.argv.slice(2);
  
  // Handle flags
  if (args.includes('--setup')) {
    runSetup();
    return;
  }
  
  if (args.includes('--cost-control')) {
    costControl.showMenu();
    return;
  }
  
  if (args.includes('--disable')) {
    const settings = costControl.loadSettings();
    settings.apiEnabled = false;
    settings.forceLocal = true;
    costControl.saveSettings(settings);
    console.log('✅ API Mode DISABLED - Only local Claude will be used');
    console.log('💡 No API costs will be incurred');
    return;
  }
  
  if (args.includes('--enable')) {
    const settings = costControl.loadSettings();
    settings.apiEnabled = true;
    settings.forceLocal = false;
    costControl.saveSettings(settings);
    console.log('✅ API Mode ENABLED - Will use API when needed');
    console.log('💡 Run "claude-auto --cost-control" to manage costs');
    return;
  }
  
  if (args.includes('--status')) {
    const settings = costControl.loadSettings();
    const usage = costControl.loadUsage();
    console.log('\n📊 Claude Auto Status:');
    console.log('─────────────────────────');
    console.log(`API Mode: ${settings.apiEnabled ? '✅ ENABLED' : '❌ DISABLED'}`);
    console.log(`Estimated Costs: $${usage.estimatedCost.toFixed(2)}`);
    console.log(`API Calls Today: ${usage.apiCalls}`);
    console.log(`Cost Limit: ${settings.costLimit ? '$' + settings.costLimit : 'None'}`);
    console.log('\n💡 Use "claude-auto --cost-control" for detailed management');
    return;
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  // Get the task from arguments
  const task = args.join(' ');
  
  if (!task) {
    console.log('🤖 Claude Auto Global');
    console.log('💡 Tip: Use --help for usage information');
    callLocalClaude();
    return;
  }
  
  // Determine if we need API based on task content
  if (needsAPI(task)) {
    callClaudeWithAPI(task);
  } else {
    callLocalClaude();
  }
}

// Handle uncaught errors gracefully
process.on('uncaughtException', (error) => {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled promise rejection:', error.message);
  process.exit(1);
});

main();