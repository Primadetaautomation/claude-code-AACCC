/**
 * Unit tests for agent configuration and management
 */

const path = require('path');
const fs = require('fs');

describe('Agent Configuration', () => {
  const agentsDir = path.join(__dirname, '..', '..', 'agents');
  
  const expectedAgents = [
    'master-orchestrator',
    'senior-fullstack-developer', 
    'qa-testing-engineer',
    'security-specialist',
    'solutions-architect',
    'devops-deployment-engineer',
    'playwright-test-agent',
    'context-manager'
  ];
  
  beforeAll(() => {
    // Ensure agents directory exists
    expect(fs.existsSync(agentsDir)).toBe(true);
  });
  
  describe('Agent Configuration Files', () => {
    expectedAgents.forEach(agentId => {
      test(`${agentId} should have valid configuration file`, () => {
        const configFile = path.join(agentsDir, `${agentId}.json`);
        
        // Check file exists
        expect(fs.existsSync(configFile)).toBe(true);
        
        // Check file is valid JSON
        const configData = fs.readFileSync(configFile, 'utf8');
        expect(() => JSON.parse(configData)).not.toThrow();
        
        // Parse and validate structure
        const config = JSON.parse(configData);
        
        // Required fields
        expect(config).toHaveProperty('name');
        expect(config).toHaveProperty('emoji');
        expect(config).toHaveProperty('description');
        expect(config).toHaveProperty('version');
        expect(config).toHaveProperty('capabilities');
        expect(config).toHaveProperty('specializations');
        expect(config).toHaveProperty('context');
        
        // Type checks
        expect(typeof config.name).toBe('string');
        expect(typeof config.emoji).toBe('string');
        expect(typeof config.description).toBe('string');
        expect(typeof config.version).toBe('string');
        expect(Array.isArray(config.capabilities)).toBe(true);
        expect(typeof config.specializations).toBe('object');
        expect(typeof config.context).toBe('object');
        
        // Validate capabilities array
        expect(config.capabilities.length).toBeGreaterThan(0);
        config.capabilities.forEach(capability => {
          expect(typeof capability).toBe('string');
        });
        
        // Validate context object
        expect(config.context).toHaveProperty('preferred_model');
        expect(config.context).toHaveProperty('max_tokens');
        expect(config.context).toHaveProperty('temperature');
        expect(config.context).toHaveProperty('system_prompt');
        
        // Validate version format (semantic versioning)
        expect(config.version).toMatch(/^\d+\.\d+\.\d+$/);
        
        // Validate emoji (should be a single emoji character)
        expect(config.emoji.length).toBeGreaterThan(0);
        expect(config.emoji.length).toBeLessThan(5);
      });
    });
  });
  
  describe('Agent Registry', () => {
    test('should create valid agent registry', () => {
      const { createAgentRegistry } = require('../../scripts/install-agents.js');
      
      expect(typeof createAgentRegistry).toBe('function');
      
      // Test registry creation (this will actually create the file)
      const result = createAgentRegistry();
      expect(result).toBe(true);
      
      // Check registry file was created
      const registryFile = path.join(agentsDir, 'registry.json');
      expect(fs.existsSync(registryFile)).toBe(true);
      
      // Validate registry content
      const registryData = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
      
      expect(registryData).toHaveProperty('version');
      expect(registryData).toHaveProperty('updated');
      expect(registryData).toHaveProperty('agents');
      
      // Check all expected agents are in registry
      expectedAgents.forEach(agentId => {
        expect(registryData.agents).toHaveProperty(agentId);
        expect(registryData.agents[agentId]).toHaveProperty('id');
        expect(registryData.agents[agentId]).toHaveProperty('name');
        expect(registryData.agents[agentId]).toHaveProperty('emoji');
        expect(registryData.agents[agentId]).toHaveProperty('installed');
      });
    });
  });
  
  describe('Agent Validation', () => {
    test('should validate all agent configurations', () => {
      const { checkAgentFiles } = require('../../scripts/install-agents.js');
      
      expect(typeof checkAgentFiles).toBe('function');
      
      const result = checkAgentFiles();
      expect(result).toBe(true);
    });
    
    test('should validate agent dependencies', () => {
      const { validateAgentDependencies } = require('../../scripts/install-agents.js');
      
      expect(typeof validateAgentDependencies).toBe('function');
      
      const result = validateAgentDependencies();
      expect(result).toBe(true);
    });
  });
  
  describe('Agent Specializations', () => {
    test('each agent should have unique specializations', () => {
      const allSpecializations = new Set();
      const duplicateSpecializations = new Set();
      
      expectedAgents.forEach(agentId => {
        const configFile = path.join(agentsDir, `${agentId}.json`);
        const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        
        if (config.specializations && config.specializations.primary) {
          const primary = config.specializations.primary;
          
          if (allSpecializations.has(primary)) {
            duplicateSpecializations.add(primary);
          } else {
            allSpecializations.add(primary);
          }
        }
      });
      
      // Each agent should have a unique primary specialization
      expect(duplicateSpecializations.size).toBe(0);
    });
  });
  
  describe('Agent Capabilities', () => {
    test('should have comprehensive capability coverage', () => {
      const allCapabilities = new Set();
      
      expectedAgents.forEach(agentId => {
        const configFile = path.join(agentsDir, `${agentId}.json`);
        const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        
        config.capabilities.forEach(capability => {
          allCapabilities.add(capability);
        });
      });
      
      // Should have a good variety of capabilities
      expect(allCapabilities.size).toBeGreaterThan(20);
      
      // Should include essential development capabilities
      const essentialCapabilities = [
        'testing',
        'security',
        'development',
        'deployment',
        'documentation'
      ];
      
      essentialCapabilities.forEach(essential => {
        const hasEssential = Array.from(allCapabilities).some(capability => 
          capability.toLowerCase().includes(essential)
        );
        expect(hasEssential).toBe(true);
      });
    });
  });
});