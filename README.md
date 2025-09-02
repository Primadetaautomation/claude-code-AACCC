# Claude Auto Global 🤖

Comprehensive Claude development environment with intelligent API management, specialized agents, and automated testing capabilities. Features smart context detection, multiple specialized agents, Playwright testing integration, and seamless switching between local Claude and high-context Claude API.

## ✨ Features

- 🔍 **Smart Detection**: Automatically detects when tasks need high-context API
- 🤖 **Multiple Agents**: 8 specialized Claude agents for different development tasks
- 🔐 **Secure Storage**: Encrypted API key storage with machine-specific encryption
- 💰 **Cost Control**: Complete cost management with limits, warnings, and tracking
- 🚦 **Easy On/Off**: Simple commands to enable/disable API mode instantly
- 💻 **Fallback Support**: Falls back to local Claude for simple tasks
- 🎭 **Playwright Integration**: Complete browser testing automation
- 📊 **Usage Tracking**: Monitor your API usage and estimated costs
- 🛡️ **Safety Features**: Cost limits, confirmation prompts, emergency shutdown
- 🌍 **Environment Support**: Supports `ANTHROPIC_API_KEY` environment variable
- 🚀 **Quick Setup**: One-command installation for Windows and Mac

## 🚀 Quick Installation

### Prerequisites

1. **Node.js 16+** - [Download from nodejs.org](https://nodejs.org/)
2. **Claude CLI** - [Install from claude.ai/cli](https://claude.ai/cli)
3. **Anthropic API Key** - [Get from console.anthropic.com](https://console.anthropic.com/)

### One-Command Setup

**macOS/Linux:**
```bash
git clone https://github.com/your-username/claude-auto-global.git
cd claude-auto-global
./scripts/setup-mac.sh
```

**Windows:**
```powershell
git clone https://github.com/your-username/claude-auto-global.git
cd claude-auto-global
.\scripts\setup-windows.bat
```

### Manual Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/claude-auto-global.git
cd claude-auto-global

# 2. Install dependencies
npm install

# 3. Install globally
npm install -g .

# 4. Install agents
npm run install-agents

# 5. Setup Playwright
npm run setup-playwright

# 6. Configure API key
claude-auto --setup
```

## 🤖 Claude Agents

This system includes 8 specialized Claude agents for different development tasks:

### 1. Master Orchestrator (🎤)
**Primary coordinator agent**
- Manages task distribution across other agents
- Provides high-level project oversight
- Coordinates complex multi-agent workflows
- Makes architectural decisions

```bash
claude-auto --agent=master-orchestrator "coordinate full-stack feature implementation"
```

### 2. Senior Full-Stack Developer (💻)
**Complete application development**
- Frontend and backend implementation
- API design and implementation
- Database schema design
- Full-stack architecture

```bash
claude-auto --agent=senior-fullstack "build user authentication system"
```

### 3. QA Testing Engineer (🧪)
**Quality assurance and testing**
- Test plan creation
- Unit, integration, and e2e testing
- Test automation setup
- Bug identification and reporting

```bash
claude-auto --agent=qa-testing "create comprehensive test suite for user module"
```

### 4. Security Specialist (🔒)
**Security analysis and hardening**
- Security vulnerability assessment
- Authentication and authorization
- Data protection and privacy
- Security best practices implementation

```bash
claude-auto --agent=security "audit API endpoints for security vulnerabilities"
```

### 5. Solutions Architect (🏢)
**System design and architecture**
- High-level system design
- Technology stack recommendations
- Scalability planning
- Integration architecture

```bash
claude-auto --agent=solutions-architect "design microservices architecture for e-commerce platform"
```

### 6. DevOps Deployment Engineer (🚀)
**Infrastructure and deployment**
- CI/CD pipeline setup
- Container orchestration
- Infrastructure as code
- Monitoring and logging

```bash
claude-auto --agent=devops "setup Docker containerization for Node.js application"
```

### 7. Playwright Test Agent (🎭)
**Browser automation and testing**
- E2E test automation
- Cross-browser testing
- Performance testing
- Visual regression testing

```bash
claude-auto --agent=playwright "create e2e tests for checkout flow"
```

### 8. Context Manager (🧠)
**Context and documentation management**
- Context window optimization
- Documentation generation
- Knowledge base management
- Code analysis and summarization

```bash
claude-auto --agent=context-manager "analyze codebase and generate project documentation"
```

## 🎭 Playwright Integration

### Installation

Playwright is automatically configured during setup:

```bash
# Automatic setup (included in setup scripts)
npm run setup-playwright

# Manual installation
npx playwright install
npx playwright install-deps
```

### Browser Support

- **Chromium** (Chrome, Edge)
- **Firefox** 
- **WebKit** (Safari)
- **Mobile browsers** (Android, iOS simulation)

### Usage Examples

```bash
# Create E2E tests
claude-auto --agent=playwright "create login flow tests"

# Run existing tests
npm run test:e2e

# Run tests in headed mode
npm run test:e2e:headed

# Generate test reports
npm run test:report
```

### Configuration

Playwright configuration is managed in `playwright.config.js`:

```javascript
// playwright.config.js
const { devices } = require('@playwright/test');

module.exports = {
  testDir: './tests/e2e',
  timeout: 30000,
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
};
```

## 🔧 Configuration

### API Key Setup

Configure your Anthropic API key (required for high-context tasks):

```bash
claude-auto --setup
```

This will:
- Prompt for your Anthropic API key
- Test the connection
- Encrypt and store the key securely
- Show usage instructions

### Alternative: Environment Variable

```bash
# macOS/Linux
export ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Windows
set ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Agent Configuration

Each agent can be configured in `/agents/[agent-name].json`:

```bash
# View agent configurations
ls -la agents/

# Edit specific agent
nano agents/senior-fullstack-developer.json
```

## 💰 Cost Control & Management

### Quick Commands

```bash
# DISABLE API MODE (no costs)
claude-auto --disable

# ENABLE API MODE
claude-auto --enable

# CHECK STATUS & COSTS
claude-auto --status

# FULL COST CONTROL CENTER
claude-auto --cost-control
```

### Cost Control Features

The Cost Control Center provides:
- 💵 **Cost Limits**: Set daily/monthly spending limits
- ⚠️ **Warnings**: Get alerts before reaching limits
- 📊 **Usage Tracking**: Monitor API calls and costs
- ✋ **Confirmation Mode**: Require approval for each API call
- 🚨 **Emergency Shutdown**: Instantly disable all API calls
- 📈 **Usage Reports**: Daily/weekly/monthly cost breakdowns

### Safety Features

1. **Automatic Shutoff**: API calls stop when limit reached
2. **Fallback to Local**: Always falls back to free local Claude
3. **Cost Projections**: See estimated daily/monthly costs
4. **Per-Call Estimates**: ~$0.015 per API call shown

## 📖 Usage

### Basic Usage

```bash
# Automatically detects context needs
claude-auto "your task here"

# Use specific agent
claude-auto --agent=senior-fullstack "build REST API"

# Show help
claude-auto --help

# Reconfigure API key
claude-auto --setup

# Manage costs
claude-auto --cost-control
```

### Smart Detection Examples

**High-Context Tasks** (Uses Claude API):
```bash
claude-auto "analyze entire codebase for security issues"
claude-auto "complete architecture review of all components"
claude-auto "comprehensive analysis with all agents"
claude-auto "maximum context review of the project"
claude-auto "refactor entire application structure"
```

**Simple Tasks** (Uses Local Claude):
```bash
claude-auto "fix this function"
claude-auto "explain this code snippet"
claude-auto "debug this error"
claude-auto "help with this method"
```

### Multi-Agent Workflows

```bash
# Full development cycle
claude-auto --agent=master-orchestrator "implement user registration with tests and security audit"

# Architecture + Implementation + Testing
claude-auto --agent=solutions-architect "design user management system" && \
claude-auto --agent=senior-fullstack "implement the designed system" && \
claude-auto --agent=qa-testing "create comprehensive tests"

# Security-focused development
claude-auto --agent=security "audit existing authentication" && \
claude-auto --agent=senior-fullstack "implement security recommendations"
```

## 🧠 Detection Logic

The tool automatically detects high-context needs based on:

### High-Context Keywords
- **Scope**: `entire codebase`, `complete project`, `whole repository`
- **Analysis**: `comprehensive analysis`, `complete review`, `thorough analysis`
- **Context**: `maximum context`, `1m tokens`, `high context`
- **Multi-file**: `all files`, `across all files`, `multiple files`
- **Architecture**: `system architecture`, `overall design`, `project overview`

### Simple Task Keywords  
- **Focused**: `fix this`, `debug this`, `explain this`
- **Scope**: `single function`, `this method`, `small change`
- **Quick**: `simple`, `just`, `quick fix`

### Heuristics
- Multiple file extensions detected
- Directory structure references
- Complexity indicators
- Word count and task length

## 📊 Mode Indicators

When running tasks, you'll see:

```bash
🤖 Using Claude API (High Context Mode)    # API mode
💻 Using Local Claude                       # Local mode
🔄 Falling back to local claude...         # API failed, using fallback
🎤 Master Orchestrator Agent Active        # Multi-agent coordination
💻 Senior Full-Stack Developer Active      # Full-stack development
🧪 QA Testing Engineer Active             # Testing and QA
🔒 Security Specialist Active              # Security analysis
🏢 Solutions Architect Active             # System design
🚀 DevOps Deployment Engineer Active      # Infrastructure
🎭 Playwright Test Agent Active            # Browser testing
🧠 Context Manager Active                  # Context optimization
```

## 🔒 Security

- **Encrypted Storage**: API keys encrypted with AES-256-CBC
- **Machine-Specific**: Encryption key derived from hostname + username
- **Secure Permissions**: Config files stored with restricted permissions (600)
- **No Hardcoding**: Keys never stored in plaintext or committed to repos
- **Agent Isolation**: Each agent runs in isolated context
- **Secure Communications**: All API calls use HTTPS with certificate validation

## 📁 File Structure

```
claude-auto-global/
├── README.md                    # This file
├── package.json                 # NPM package configuration
├── .gitignore                  # Git ignore rules
├── bin/
│   └── claude-auto.js          # Main CLI executable
├── lib/
│   └── api-detector.js         # Context detection logic
├── agents/                     # Agent configuration files
│   ├── master-orchestrator.json
│   ├── senior-fullstack-developer.json
│   ├── qa-testing-engineer.json
│   ├── security-specialist.json
│   ├── solutions-architect.json
│   ├── devops-deployment-engineer.json
│   ├── playwright-test-agent.json
│   └── context-manager.json
├── scripts/                    # Setup scripts
│   ├── setup-mac.sh           # macOS/Linux setup
│   ├── setup-windows.bat      # Windows setup
│   └── install-agents.js      # Agent installation
├── tests/                      # Test files
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── e2e/                   # End-to-end tests
└── docs/                       # Documentation
    ├── agents.md              # Agent documentation
    ├── api.md                 # API documentation
    └── troubleshooting.md     # Troubleshooting guide

~/.claude-config/               # User configuration
└── api-key.encrypted          # Your encrypted API key
```

## 🛠️ Configuration Files

### Check Current Status
```bash
claude-auto --setup
```

Shows:
- Environment variable status
- Stored key status  
- Configuration directory
- Installed agents status

### Manual Configuration
```bash
# Set environment variable
export ANTHROPIC_API_KEY="sk-ant-your-key"

# Or reconfigure stored key
claude-auto --setup

# Install specific agent
npm run install-agent -- security-specialist

# Update all agents
npm run update-agents
```

## 💡 Examples

### Development Workflow
```bash
# Architecture analysis (API mode)
claude-auto "analyze entire React app architecture"

# Quick debugging (Local mode)  
claude-auto "why is this useState not working?"

# Comprehensive review (API mode)
claude-auto "complete security audit of all API endpoints"

# Simple fix (Local mode)
claude-auto "fix the TypeScript error in LoginForm"
```

### Code Review
```bash
# Full codebase review (API mode)
claude-auto "comprehensive code quality review of entire project"

# Single file review (Local mode)
claude-auto "review this component for best practices"
```

### Testing Workflows
```bash
# Create comprehensive test suite
claude-auto --agent=qa-testing "create unit tests for user authentication module"

# E2E testing with Playwright
claude-auto --agent=playwright "create e2e tests for shopping cart functionality"

# Run all tests
npm run test:all
```

### Security Workflows
```bash
# Security audit
claude-auto --agent=security "perform security audit of API endpoints"

# Security implementation
claude-auto --agent=senior-fullstack "implement OWASP security recommendations"
```

## 📦 Context Window Addon

### Installation

The context window addon automatically optimizes token usage:

```bash
# Install context addon
npm install @claude-auto/context-addon

# Configure context limits
claude-auto --configure-context
```

### Context Optimization Features

- **Smart Chunking**: Automatically splits large contexts
- **Relevance Filtering**: Focuses on relevant code sections
- **Context Caching**: Caches frequently used contexts
- **Token Counting**: Real-time token usage tracking

### Usage

```bash
# Use maximum context
claude-auto --context=max "analyze entire codebase"

# Use optimized context
claude-auto --context=auto "implement feature with smart context"

# Check context usage
claude-auto --context-status
```

## 🔧 Troubleshooting

### Installation Issues

**macOS/Linux Setup Issues:**
```bash
# Fix permissions
chmod +x ./scripts/setup-mac.sh

# Install dependencies manually
npm install
npm install -g .

# Check Claude CLI
claude --version
```

**Windows Setup Issues:**
```powershell
# Run as administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Manual installation
npm install
npm install -g .

# Check Claude CLI
claude --version
```

### API Key Issues
```bash
# Test your setup
claude-auto --setup

# Check environment
echo $ANTHROPIC_API_KEY

# Verify local Claude works
claude --version
```

### Common Issues

**"Claude CLI not found"**
- Install Claude CLI first: https://claude.ai/cli
- Restart terminal after installation
- Check PATH configuration

**"API key test failed"**  
- Verify key starts with `sk-ant-`
- Check your Anthropic Console for valid keys
- Ensure account has API access
- Check network connectivity

**"Permission denied"**
- Check file permissions: `ls -la ~/.claude-config/`
- Recreate config: `rm -rf ~/.claude-config && claude-auto --setup`
- Run with appropriate permissions

**"Encryption failed"**
- Clear config and re-setup: `claude-auto --setup`
- Check disk space and permissions
- Verify Node.js crypto module

**"Agent not found"**
- Install agents: `npm run install-agents`
- Check agent directory: `ls -la agents/`
- Verify agent configuration files

**"Playwright installation failed"**
```bash
# Manual Playwright setup
npx playwright install
npx playwright install-deps

# Check installation
npx playwright --version
```

### Debug Mode

```bash
# Enable debug logging
DEBUG=claude-auto* claude-auto "your task"

# Verbose output
claude-auto --verbose "your task"

# Check agent status
claude-auto --agent-status
```

## 🔄 Fallback Behavior

If API calls fail:
1. Shows error message
2. Automatically falls back to local Claude
3. Continues with your task
4. No interruption to workflow
5. Logs failure for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with all agents
5. Update documentation
6. Submit a pull request

### Development Setup

```bash
# Clone for development
git clone https://github.com/your-username/claude-auto-global.git
cd claude-auto-global

# Install development dependencies
npm install --include=dev

# Run tests
npm test

# Run linting
npm run lint

# Test all agents
npm run test:agents
```

## 📝 License

MIT License - see LICENSE file for details.

## 🔗 Related

- [Anthropic Console](https://console.anthropic.com/) - Get your API key
- [Claude CLI](https://claude.ai/cli) - Official Claude CLI tool
- [Claude API Docs](https://docs.anthropic.com/claude/reference) - API documentation
- [Playwright Documentation](https://playwright.dev/) - Browser automation docs

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/claude-auto-global/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/claude-auto-global/discussions)
- 📧 **Email**: support@claude-auto-global.com
- 📚 **Documentation**: [Full Documentation](https://docs.claude-auto-global.com)

## 🗺️ Roadmap

- [ ] **v2.0**: GraphQL agent integration
- [ ] **v2.1**: Docker containerization support
- [ ] **v2.2**: Multi-language agent support
- [ ] **v2.3**: Advanced context optimization
- [ ] **v2.4**: Team collaboration features
- [ ] **v2.5**: Visual testing integration

---

**Made with ❤️ for the Claude community**