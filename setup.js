#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const CONFIG_DIR = path.join(os.homedir(), '.claude-config');
const API_KEY_FILE = path.join(CONFIG_DIR, 'api-key.encrypted');

function createConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
    console.log('✅ Created config directory:', CONFIG_DIR);
  }
}

function encryptAPIKey(apiKey) {
  try {
    // Use machine-specific key for encryption
    const key = crypto.scryptSync(os.hostname() + os.userInfo().username, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Store IV and encrypted data together
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('❌ Encryption failed:', error.message);
    throw error;
  }
}

async function testAPIKey(apiKey) {
  try {
    const fetch = (await import('node-fetch')).default;
    
    console.log('🔍 Testing API key...');
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: 'Hello, just testing the API connection. Please respond with "API test successful".'
          }
        ]
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API test successful!');
      console.log('📡 Response:', data.content[0].text.trim());
      return true;
    } else {
      const errorText = await response.text();
      console.error('❌ API test failed:', response.status, response.statusText);
      console.error('   Error details:', errorText);
      return false;
    }
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    return false;
  }
}

function promptForAPIKey() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    console.log('\n🔧 Claude Auto Global Setup');
    console.log('═'.repeat(40));
    console.log('');
    console.log('To use automatic API detection, you need an Anthropic API key.');
    console.log('Get one at: https://console.anthropic.com/');
    console.log('');
    console.log('⚠️  Your API key will be encrypted and stored locally.');
    console.log('💡 You can also use ANTHROPIC_API_KEY environment variable.');
    console.log('');

    rl.question('Enter your Anthropic API key (or press Enter to skip): ', (apiKey) => {
      rl.close();
      resolve(apiKey.trim());
    });
  });
}

async function saveAPIKey(apiKey) {
  try {
    const encryptedKey = encryptAPIKey(apiKey);
    fs.writeFileSync(API_KEY_FILE, encryptedKey, { mode: 0o600 });
    console.log('✅ API key saved securely to:', API_KEY_FILE);
    return true;
  } catch (error) {
    console.error('❌ Failed to save API key:', error.message);
    return false;
  }
}

function showCurrentStatus() {
  console.log('\n📊 Current Configuration:');
  console.log('─'.repeat(30));
  
  // Check environment variable
  if (process.env.ANTHROPIC_API_KEY) {
    console.log('🌍 Environment: ANTHROPIC_API_KEY is set');
  } else {
    console.log('🌍 Environment: ANTHROPIC_API_KEY not set');
  }
  
  // Check encrypted file
  if (fs.existsSync(API_KEY_FILE)) {
    console.log('🔐 Stored key: Found encrypted API key');
  } else {
    console.log('🔐 Stored key: No encrypted API key found');
  }
  
  console.log('📁 Config dir:', CONFIG_DIR);
}

function showUsageInstructions() {
  console.log('\n🎉 Setup Complete!');
  console.log('═'.repeat(40));
  console.log('');
  console.log('Usage examples:');
  console.log('');
  console.log('  # These will use API (high context):');
  console.log('  claude-auto "analyze entire codebase"');
  console.log('  claude-auto "complete analysis of all files"');
  console.log('  claude-auto "maximum context review"');
  console.log('');
  console.log('  # These will use local Claude:');
  console.log('  claude-auto "fix this function"');
  console.log('  claude-auto "explain this code"');
  console.log('');
  console.log('  # Configuration:');
  console.log('  claude-auto --setup    # Re-run setup');
  console.log('  claude-auto --help     # Show help');
  console.log('');
  console.log('💡 The tool automatically detects when you need high-context API mode!');
}

async function main() {
  try {
    console.clear();
    showCurrentStatus();
    
    createConfigDir();
    
    const apiKey = await promptForAPIKey();
    
    if (!apiKey) {
      console.log('\n⚠️  Skipping API key setup.');
      console.log('   You can run "claude-auto --setup" again later.');
      console.log('   Or set ANTHROPIC_API_KEY environment variable.');
      showUsageInstructions();
      return;
    }
    
    // Validate API key format
    if (!apiKey.startsWith('sk-ant-')) {
      console.log('\n⚠️  Warning: API key should start with "sk-ant-"');
      console.log('   Are you sure this is correct? Continuing anyway...');
    }
    
    // Test the API key
    const isValid = await testAPIKey(apiKey);
    
    if (!isValid) {
      console.log('\n❌ API key test failed. Please check your key and try again.');
      console.log('   Run "claude-auto --setup" to retry.');
      process.exit(1);
    }
    
    // Save the API key
    const saved = await saveAPIKey(apiKey);
    
    if (saved) {
      showUsageInstructions();
    } else {
      console.log('\n❌ Setup failed. Please try again.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Setup error:', error.message);
    process.exit(1);
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Setup cancelled.');
  process.exit(0);
});

if (require.main === module) {
  main();
}