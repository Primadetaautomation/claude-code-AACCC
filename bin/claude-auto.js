#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const os = require('os');

// Import our API detector
const { needsAPI } = require('../lib/api-detector');

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
  const apiKey = getAPIKey();
  
  if (!apiKey) {
    console.error('❌ No API key found. Run: claude-auto --setup');
    process.exit(1);
  }

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
}

function callLocalClaude() {
  console.log('💻 Using Local Claude');
  
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