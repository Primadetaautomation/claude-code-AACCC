# Claude Auto Global - Troubleshooting Guide

This guide helps resolve common issues with Claude Auto Global installation and usage.

## Installation Issues

### Node.js Problems

#### "Node.js not found" or "node: command not found"

**Windows:**
```powershell
# Download and install Node.js from https://nodejs.org/
# Restart Command Prompt/PowerShell after installation
node --version
```

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from https://nodejs.org/
# Verify installation
node --version
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# CentOS/RHEL/Fedora
sudo dnf install nodejs npm

# Verify installation
node --version
```

#### Node.js Version Too Old

```bash
# Check current version
node --version

# If less than v16.0.0, upgrade:
# Windows: Download latest from nodejs.org
# macOS: brew upgrade node
# Linux: Follow distribution-specific upgrade process
```

### NPM Issues

#### Permission Errors (EACCES)

**macOS/Linux:**
```bash
# Change npm default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Or use Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
```

**Windows:**
```powershell
# Run PowerShell as Administrator
# Or use Node Version Manager for Windows (nvm-windows)
```

#### NPM Install Failures

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Claude CLI Issues

#### "Claude CLI not found"

1. **Install Claude CLI**
   - Visit: https://claude.ai/cli
   - Follow installation instructions for your OS
   - Restart terminal after installation

2. **PATH Issues**
```bash
# Check if claude is in PATH
which claude  # macOS/Linux
where claude  # Windows

# If not found, add to PATH or reinstall
```

3. **Authentication Issues**
```bash
# Login to Claude CLI
claude auth login

# Check status
claude auth status
```

## Runtime Issues

### API Key Problems

#### "API key test failed"

1. **Check API Key Format**
```bash
# Valid format: sk-ant-api03-xxxxx or sk-ant-xxxxx
echo $ANTHROPIC_API_KEY

# Set environment variable
export ANTHROPIC_API_KEY="sk-ant-your-key-here"  # macOS/Linux
set ANTHROPIC_API_KEY=sk-ant-your-key-here       # Windows
```

2. **Verify API Key**
   - Login to https://console.anthropic.com/
   - Check API keys section
   - Ensure key is active and has sufficient credits

3. **Reconfigure**
```bash
# Reset configuration
claude-auto --setup

# Or delete config and reconfigure
rm -rf ~/.claude-config
claude-auto --setup
```

#### "Encryption failed"

```bash
# Clear config and reconfigure
rm -rf ~/.claude-config
claude-auto --setup

# Check disk space
df -h  # macOS/Linux
dir   # Windows

# Check permissions
ls -la ~/.claude-config/  # Should be 700/600
```

### Agent Issues

#### "Agent not found"

```bash
# Check agent status
claude-auto --agent-status

# Reinstall agents
npm run install-agents

# Validate agent configurations
npm run validate-agents

# List available agents
ls -la agents/
```

#### "Invalid agent configuration"

```bash
# Validate specific agent
node scripts/install-agents.js --validate

# Check agent file syntax
cat agents/senior-fullstack-developer.json | jq .

# Fix JSON syntax errors manually
```

### Playwright Issues

#### "Playwright installation failed"

```bash
# Manual installation
npx playwright install

# Install system dependencies (Linux)
npx playwright install-deps

# Check installation
npx playwright --version
```

#### "Browser not found"

```bash
# Install browsers
npx playwright install chromium firefox webkit

# Check browser installation
npx playwright install --help
```

#### "Tests failing consistently"

```bash
# Run in headed mode for debugging
npm run test:e2e:headed

# Enable debug mode
npm run test:e2e:debug

# Check test results
npm run test:report
```

## Network Issues

### Proxy/Firewall Problems

```bash
# Configure npm proxy
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Configure npm registry
npm config set registry https://registry.npmjs.org/

# Check npm configuration
npm config list
```

### Certificate Issues

```bash
# Disable SSL verification (temporary fix)
npm config set strict-ssl false

# Or add certificate authority
npm config set ca ""
```

## Performance Issues

### Slow Response Times

1. **Check Network Connection**
```bash
# Test API connectivity
curl -I https://api.anthropic.com/v1/messages

# Check DNS resolution
nslookup api.anthropic.com
```

2. **Local vs API Mode**
```bash
# Force local mode
claude-auto --local "your task"

# Check context detection
claude-auto --debug "your task"
```

### Memory Issues

```bash
# Check memory usage
# macOS/Linux
top -p $(pgrep node)
free -h

# Windows
tasklist /fi "imagename eq node.exe"
```

## File System Issues

### Permission Denied

**macOS/Linux:**
```bash
# Fix permissions
chmod 755 scripts/setup-mac.sh
chmod +x scripts/install-agents.js

# Fix config directory
chmod 700 ~/.claude-config/
chmod 600 ~/.claude-config/*
```

**Windows:**
```powershell
# Run as Administrator
# Right-click Command Prompt -> "Run as administrator"
```

### File Not Found

```bash
# Verify project structure
ls -la
tree  # If available

# Ensure all files are present
git status  # If in git repository
```

## Development Issues

### Test Failures

```bash
# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e

# Run with verbose output
npm test -- --verbose

# Run specific test file
npm test tests/unit/agents.test.js
```

### Linting Errors

```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Check formatting
npm run format:check
npm run format
```

## Getting Help

### Debug Mode

```bash
# Enable debug logging
DEBUG=claude-auto* claude-auto "your task"

# Verbose output
claude-auto --verbose "your task"

# Check system info
claude-auto --system-info
```

### Log Files

```bash
# Check logs (if available)
tail -f ~/.claude-config/logs/*.log

# System logs
# macOS: Console.app or /var/log/
# Linux: journalctl or /var/log/
# Windows: Event Viewer
```

### Environment Information

```bash
# Check environment
node --version
npm --version
claude --version
playwright --version

# Check PATH
echo $PATH

# Check environment variables
env | grep -i anthropic
env | grep -i claude
```

## Common Error Messages

### "ENOENT: no such file or directory"

```bash
# Usually missing file/directory
# Check if all setup steps were completed
npm run install-agents
npm run setup-playwright
```

### "ECONNREFUSED" or "ETIMEDOUT"

```bash
# Network connectivity issue
# Check internet connection
ping google.com

# Check proxy settings
npm config list
```

### "Cannot find module"

```bash
# Missing dependency
npm install

# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### "SyntaxError: Unexpected token"

```bash
# Usually JSON syntax error in config files
# Validate JSON files
cat agents/master-orchestrator.json | jq .

# Fix syntax manually or regenerate
```

## Reset Everything

If all else fails, complete reset:

```bash
# 1. Remove everything
rm -rf node_modules
rm -rf ~/.claude-config
rm -rf test-results
rm -rf playwright-report

# 2. Clean npm
npm cache clean --force

# 3. Reinstall everything
npm install
npm install -g .
npm run install-agents
npm run setup-playwright

# 4. Reconfigure
claude-auto --setup
```

## Getting Support

1. **Check GitHub Issues**: [Repository Issues](https://github.com/your-username/claude-auto-global/issues)
2. **Read Documentation**: README.md and docs/
3. **Community Help**: GitHub Discussions
4. **Create Issue**: Include:
   - Operating system and version
   - Node.js version (`node --version`)
   - Error messages
   - Steps to reproduce
   - Debug output (`DEBUG=* claude-auto ...`)

## Useful Commands Summary

```bash
# Installation
./scripts/setup-mac.sh           # macOS/Linux setup
.\scripts\setup-windows.bat      # Windows setup

# Configuration
claude-auto --setup              # Configure API key
claude-auto --help               # Show help

# Testing
npm test                         # Run all tests
npm run test:e2e                # Run E2E tests
npm run test:report             # View test reports

# Agents
npm run install-agents          # Install all agents
npm run validate-agents         # Validate configurations
claude-auto --agent-status      # Check agent status

# Maintenance
npm run lint                    # Check code quality
npm run format                  # Format code
npm run clean                   # Clean build artifacts

# Debugging
DEBUG=* claude-auto "task"      # Debug mode
claude-auto --verbose "task"    # Verbose output
```

Remember: Most issues can be resolved by ensuring all prerequisites are installed and properly configured!