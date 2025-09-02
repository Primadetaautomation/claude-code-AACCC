# Claude Agent Usage Guide

This guide explains how to use each Claude agent effectively.

## Available Agents

### 🎤 Master Orchestrator
**ID:** `master-orchestrator`
**Description:** Primary coordinator agent

**Usage:**
```bash
claude-auto --agent=master-orchestrator "your task description"
```

### 💻 Senior Full-Stack Developer
**ID:** `senior-fullstack-developer`
**Description:** Complete application development

**Usage:**
```bash
claude-auto --agent=senior-fullstack-developer "your task description"
```

### 🧪 QA Testing Engineer
**ID:** `qa-testing-engineer`
**Description:** Quality assurance and testing

**Usage:**
```bash
claude-auto --agent=qa-testing-engineer "your task description"
```

### 🔒 Security Specialist
**ID:** `security-specialist`
**Description:** Security analysis and hardening

**Usage:**
```bash
claude-auto --agent=security-specialist "your task description"
```

### 🏢 Solutions Architect
**ID:** `solutions-architect`
**Description:** System design and architecture

**Usage:**
```bash
claude-auto --agent=solutions-architect "your task description"
```

### 🚀 DevOps Deployment Engineer
**ID:** `devops-deployment-engineer`
**Description:** Infrastructure and deployment

**Usage:**
```bash
claude-auto --agent=devops-deployment-engineer "your task description"
```

### 🎭 Playwright Test Agent
**ID:** `playwright-test-agent`
**Description:** Browser automation and testing

**Usage:**
```bash
claude-auto --agent=playwright-test-agent "your task description"
```

### 🧠 Context Manager
**ID:** `context-manager`
**Description:** Context and documentation management

**Usage:**
```bash
claude-auto --agent=context-manager "your task description"
```


## Multi-Agent Workflows

### Full Development Cycle
```bash
# 1. Architecture design
claude-auto --agent=solutions-architect "design user authentication system"

# 2. Security review
claude-auto --agent=security "review authentication architecture for vulnerabilities"

# 3. Implementation
claude-auto --agent=senior-fullstack "implement the designed authentication system"

# 4. Testing
claude-auto --agent=qa-testing "create comprehensive test suite for authentication"

# 5. E2E Testing  
claude-auto --agent=playwright "create browser tests for login flow"

# 6. Deployment
claude-auto --agent=devops "setup deployment pipeline for authentication service"

# 7. Documentation
claude-auto --agent=context-manager "generate documentation for authentication system"
```

### Security-Focused Development
```bash
# Security audit first
claude-auto --agent=security "audit existing codebase for vulnerabilities"

# Implement security recommendations
claude-auto --agent=senior-fullstack "implement security recommendations"

# Validate with security testing
claude-auto --agent=qa-testing "create security-focused test suite"
```

## Agent Configuration

Each agent can be configured by editing its JSON file in the `agents/` directory:

```
agents/
├── master-orchestrator.json
├── senior-fullstack-developer.json
├── qa-testing-engineer.json
├── security-specialist.json
├── solutions-architect.json
├── devops-deployment-engineer.json
├── playwright-test-agent.json
├── context-manager.json
└── registry.json
```

## Troubleshooting

### Agent Not Found
```bash
# Check agent status
claude-auto --agent-status

# Reinstall agents
npm run install-agents
```

### Configuration Errors
```bash
# Validate agent configurations
node scripts/install-agents.js --validate

# View agent registry
cat agents/registry.json
```

For more information, see the main README.md file.
