#!/bin/bash

# Claude Auto Global - macOS/Linux Setup Script
# This script installs all dependencies and configures the environment

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🤖 Claude Auto Global Setup - macOS/Linux${NC}"
echo -e "${BLUE}===============================================${NC}"

# Function to print status messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check Node.js
if ! command_exists node; then
    print_error "Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16+ is required. Current version: $(node --version)"
    exit 1
fi

print_success "Node.js $(node --version) is installed"

# Check npm
if ! command_exists npm; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

print_success "npm $(npm --version) is installed"

# Check Claude CLI
if ! command_exists claude; then
    print_warning "Claude CLI is not installed. Please install it from https://claude.ai/cli"
    read -p "Press Enter to continue or Ctrl+C to exit and install Claude CLI first..."
else
    print_success "Claude CLI is installed"
fi

# Install dependencies
print_status "Installing project dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Install globally
print_status "Installing claude-auto globally..."
npm install -g .

if [ $? -eq 0 ]; then
    print_success "claude-auto installed globally"
else
    print_error "Failed to install claude-auto globally"
    exit 1
fi

# Install agents
print_status "Installing Claude agents..."
npm run install-agents

if [ $? -eq 0 ]; then
    print_success "Claude agents installed"
else
    print_error "Failed to install Claude agents"
    exit 1
fi

# Setup Playwright
print_status "Setting up Playwright..."
npm run setup-playwright

if [ $? -eq 0 ]; then
    print_success "Playwright setup completed"
else
    print_warning "Playwright setup failed - you may need to run 'npx playwright install' manually"
fi

# Create necessary directories
print_status "Creating configuration directories..."
mkdir -p ~/.claude-config
chmod 700 ~/.claude-config

# Setup API key if not already configured
if [ ! -f ~/.claude-config/api-key.encrypted ] && [ -z "$ANTHROPIC_API_KEY" ]; then
    print_status "Setting up Anthropic API key..."
    echo "Please run 'claude-auto --setup' to configure your API key after setup completes."
fi

# Test installation
print_status "Testing installation..."
if command_exists claude-auto; then
    print_success "claude-auto command is available"
else
    print_error "claude-auto command not found in PATH"
    print_status "Try running: source ~/.bashrc or source ~/.zshrc"
    print_status "Or add $(npm config get prefix)/bin to your PATH"
fi

# Create test directories
print_status "Creating project structure..."
mkdir -p tests/unit tests/integration tests/e2e docs

# Setup git hooks (if in git repository)
if [ -d .git ]; then
    print_status "Setting up git hooks..."
    # Add pre-commit hook for linting
    if [ ! -f .git/hooks/pre-commit ]; then
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
# Pre-commit hook for claude-auto-global

# Run linting
npm run lint --silent
if [ $? -ne 0 ]; then
    echo "Linting failed. Please fix errors before committing."
    exit 1
fi

# Run tests
npm test --silent
if [ $? -ne 0 ]; then
    echo "Tests failed. Please fix failing tests before committing."
    exit 1
fi
EOF
        chmod +x .git/hooks/pre-commit
        print_success "Git pre-commit hook installed"
    fi
fi

# Final summary
echo ""
print_success "🎉 Setup completed successfully!"
echo ""
print_status "Next steps:"
echo "  1. Configure your Anthropic API key: claude-auto --setup"
echo "  2. Test the installation: claude-auto --help"
echo "  3. Try a simple command: claude-auto \"hello world\""
echo "  4. Use an agent: claude-auto --agent=senior-fullstack \"create a simple API\""
echo ""
print_status "Available agents:"
echo "  🎤 master-orchestrator    - Project coordination"
echo "  💻 senior-fullstack       - Full-stack development"  
echo "  🧪 qa-testing             - Quality assurance"
echo "  🔒 security               - Security specialist"
echo "  🏢 solutions-architect    - System design"
echo "  🚀 devops                 - Infrastructure & deployment"
echo "  🎭 playwright             - Browser testing"
echo "  🧠 context-manager        - Documentation & context"
echo ""
print_status "Documentation:"
echo "  📚 README.md               - Complete documentation"
echo "  📁 agents/                 - Agent configurations"
echo "  🔧 scripts/                - Setup and utility scripts"
echo ""

if [ ! command_exists claude ]; then
    print_warning "⚠️  Don't forget to install Claude CLI: https://claude.ai/cli"
fi

print_success "Happy coding with Claude Auto Global! 🚀"