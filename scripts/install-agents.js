#!/usr/bin/env node

/**
 * Claude Auto Global - Agent Installation Script
 * Installs and configures all Claude agents
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(level, message) {
    const timestamp = new Date().toISOString().substr(11, 8);
    const color = colors[level] || colors.reset;
    console.log(`${color}[${level.toUpperCase()}]${colors.reset} ${timestamp} ${message}`);
}

function logInfo(message) { log('blue', message); }
function logSuccess(message) { log('green', message); }
function logError(message) { log('red', message); }
function logWarning(message) { log('yellow', message); }

// Agent definitions
const agents = [
    {
        id: 'master-orchestrator',
        name: 'Master Orchestrator',
        emoji: '🎤',
        description: 'Primary coordinator agent'
    },
    {
        id: 'senior-fullstack-developer',
        name: 'Senior Full-Stack Developer',
        emoji: '💻',
        description: 'Complete application development'
    },
    {
        id: 'qa-testing-engineer',
        name: 'QA Testing Engineer',
        emoji: '🧪',
        description: 'Quality assurance and testing'
    },
    {
        id: 'security-specialist',
        name: 'Security Specialist',
        emoji: '🔒',
        description: 'Security analysis and hardening'
    },
    {
        id: 'solutions-architect',
        name: 'Solutions Architect',
        emoji: '🏢',
        description: 'System design and architecture'
    },
    {
        id: 'devops-deployment-engineer',
        name: 'DevOps Deployment Engineer',
        emoji: '🚀',
        description: 'Infrastructure and deployment'
    },
    {
        id: 'playwright-test-agent',
        name: 'Playwright Test Agent',
        emoji: '🎭',
        description: 'Browser automation and testing'
    },
    {
        id: 'context-manager',
        name: 'Context Manager',
        emoji: '🧠',
        description: 'Context and documentation management'
    }
];

function checkAgentFiles() {
    logInfo('Checking agent configuration files...');
    
    const agentsDir = path.join(__dirname, '..', 'agents');
    let allValid = true;
    
    if (!fs.existsSync(agentsDir)) {
        logError(`Agents directory not found: ${agentsDir}`);
        return false;
    }
    
    agents.forEach(agent => {
        const configFile = path.join(agentsDir, `${agent.id}.json`);
        
        if (!fs.existsSync(configFile)) {
            logError(`Configuration file missing: ${agent.id}.json`);
            allValid = false;
            return;
        }
        
        try {
            const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
            
            // Validate required fields
            const requiredFields = ['name', 'emoji', 'description', 'version', 'capabilities'];
            const missing = requiredFields.filter(field => !config[field]);
            
            if (missing.length > 0) {
                logError(`Invalid config for ${agent.id}: missing fields: ${missing.join(', ')}`);
                allValid = false;
                return;
            }
            
            logSuccess(`${agent.emoji} ${agent.name} - Configuration valid`);
            
        } catch (error) {
            logError(`Invalid JSON in ${agent.id}.json: ${error.message}`);
            allValid = false;
        }
    });
    
    return allValid;
}

function createAgentRegistry() {
    logInfo('Creating agent registry...');
    
    const registry = {
        version: '1.0.0',
        updated: new Date().toISOString(),
        agents: {}
    };
    
    agents.forEach(agent => {
        const configFile = path.join(__dirname, '..', 'agents', `${agent.id}.json`);
        
        try {
            const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
            registry.agents[agent.id] = {
                id: agent.id,
                name: config.name,
                emoji: config.emoji,
                description: config.description,
                version: config.version,
                capabilities: config.capabilities,
                configFile: `agents/${agent.id}.json`,
                installed: true,
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            logError(`Failed to process ${agent.id}: ${error.message}`);
            registry.agents[agent.id] = {
                id: agent.id,
                name: agent.name,
                emoji: agent.emoji,
                description: agent.description,
                installed: false,
                error: error.message
            };
        }
    });
    
    // Write registry file
    const registryFile = path.join(__dirname, '..', 'agents', 'registry.json');
    
    try {
        fs.writeFileSync(registryFile, JSON.stringify(registry, null, 2));
        logSuccess(`Agent registry created: ${registryFile}`);
        return true;
    } catch (error) {
        logError(`Failed to create registry: ${error.message}`);
        return false;
    }
}

function validateAgentDependencies() {
    logInfo('Validating agent dependencies...');
    
    // Check for required packages
    const packageFile = path.join(__dirname, '..', 'package.json');
    
    if (!fs.existsSync(packageFile)) {
        logError('package.json not found');
        return false;
    }
    
    try {
        const packageData = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
        const dependencies = { ...packageData.dependencies, ...packageData.devDependencies };
        
        // Required dependencies for agents
        const requiredDeps = [
            'node-fetch' // For API calls
        ];
        
        const missing = requiredDeps.filter(dep => !dependencies[dep]);
        
        if (missing.length > 0) {
            logWarning(`Missing dependencies: ${missing.join(', ')}`);
            logInfo('Run "npm install" to install missing dependencies');
        } else {
            logSuccess('All agent dependencies available');
        }
        
        return true;
        
    } catch (error) {
        logError(`Failed to validate dependencies: ${error.message}`);
        return false;
    }
}

function createAgentUsageGuide() {
    logInfo('Creating agent usage guide...');
    
    const guide = `# Claude Agent Usage Guide

This guide explains how to use each Claude agent effectively.

## Available Agents

${agents.map(agent => `### ${agent.emoji} ${agent.name}
**ID:** \`${agent.id}\`
**Description:** ${agent.description}

**Usage:**
\`\`\`bash
claude-auto --agent=${agent.id} "your task description"
\`\`\`
`).join('\n')}

## Multi-Agent Workflows

### Full Development Cycle
\`\`\`bash
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
\`\`\`

### Security-Focused Development
\`\`\`bash
# Security audit first
claude-auto --agent=security "audit existing codebase for vulnerabilities"

# Implement security recommendations
claude-auto --agent=senior-fullstack "implement security recommendations"

# Validate with security testing
claude-auto --agent=qa-testing "create security-focused test suite"
\`\`\`

## Agent Configuration

Each agent can be configured by editing its JSON file in the \`agents/\` directory:

\`\`\`
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
\`\`\`

## Troubleshooting

### Agent Not Found
\`\`\`bash
# Check agent status
claude-auto --agent-status

# Reinstall agents
npm run install-agents
\`\`\`

### Configuration Errors
\`\`\`bash
# Validate agent configurations
node scripts/install-agents.js --validate

# View agent registry
cat agents/registry.json
\`\`\`

For more information, see the main README.md file.
`;
    
    const guideFile = path.join(__dirname, '..', 'docs', 'agents.md');
    
    try {
        // Ensure docs directory exists
        const docsDir = path.dirname(guideFile);
        if (!fs.existsSync(docsDir)) {
            fs.mkdirSync(docsDir, { recursive: true });
        }
        
        fs.writeFileSync(guideFile, guide);
        logSuccess(`Agent usage guide created: ${guideFile}`);
        return true;
    } catch (error) {
        logError(`Failed to create usage guide: ${error.message}`);
        return false;
    }
}

function displayAgentSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('🤖 CLAUDE AGENTS INSTALLATION SUMMARY');
    console.log('='.repeat(60));
    
    agents.forEach(agent => {
        const configFile = path.join(__dirname, '..', 'agents', `${agent.id}.json`);
        const status = fs.existsSync(configFile) ? '✅ Installed' : '❌ Missing';
        console.log(`${agent.emoji} ${agent.name.padEnd(30)} ${status}`);
    });
    
    console.log('='.repeat(60));
}

// Main installation process
async function main() {
    console.log('🤖 Claude Auto Global - Agent Installation');
    console.log('='.repeat(50));
    
    try {
        // Check if this is a validation run
        if (process.argv.includes('--validate')) {
            logInfo('Running validation only...');
            const valid = checkAgentFiles();
            process.exit(valid ? 0 : 1);
        }
        
        // Step 1: Check agent configuration files
        if (!checkAgentFiles()) {
            logError('Agent configuration validation failed');
            process.exit(1);
        }
        
        // Step 2: Validate dependencies
        if (!validateAgentDependencies()) {
            logError('Dependency validation failed');
            process.exit(1);
        }
        
        // Step 3: Create agent registry
        if (!createAgentRegistry()) {
            logError('Failed to create agent registry');
            process.exit(1);
        }
        
        // Step 4: Create usage guide
        if (!createAgentUsageGuide()) {
            logWarning('Failed to create usage guide (non-critical)');
        }
        
        // Step 5: Display summary
        displayAgentSummary();
        
        logSuccess('🎉 All agents installed successfully!');
        
        console.log('\nNext steps:');
        console.log('  1. Test agents: claude-auto --agent-status');
        console.log('  2. Try an agent: claude-auto --agent=senior-fullstack "hello world"');
        console.log('  3. Read the guide: docs/agents.md');
        
    } catch (error) {
        logError(`Installation failed: ${error.message}`);
        process.exit(1);
    }
}

// Run the installation
if (require.main === module) {
    main();
}

module.exports = {
    agents,
    checkAgentFiles,
    createAgentRegistry,
    validateAgentDependencies
};