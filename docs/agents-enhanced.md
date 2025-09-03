# Claude Agent Usage Guide - Enhanced with CLAUDE Framework v2.0

This guide explains how to use each Claude agent effectively with full CLAUDE Framework integration.

## 🎯 Framework Compliance

All agents strictly follow the **CLAUDE Framework v2.0** standards:
- **Planning & Communication** (P-1 to P-8)
- **Code Quality** (C-1 to C-5, N-1 to N-6, S-1 to S-4)
- **Error Handling** (E-1 to E-5, L-1 to L-4)
- **Testing** (T-1 to TQ-5)
- **Security & Privacy** (SEC-1 to SEC-8)
- **Observability** (OBS-1 to OBS-4)
- **Git & Version Control** (GIT-1 to B-3)
- **Deployment & CI/CD** (CI-1 to CI-3, REL-1 to REL-3)

## Available Agents

### 🎤 Master Orchestrator
**ID:** `master-orchestrator`
**Description:** Enterprise-grade coordinator enforcing CLAUDE Framework standards across multi-agent workflows with quality gates and comprehensive project oversight

**Key Capabilities:**
- Multi-agent workflow coordination (sequential, parallel, conditional, iterative)
- Quality gates enforcement (architecture review, security audit, performance testing)
- CLAUDE Framework compliance validation
- Automated status reporting and stakeholder communication
- Resource allocation and timeline planning

**Usage:**
```bash
claude-auto --agent=master-orchestrator "coordinate full feature implementation with security and testing"
```

**Workflow Templates:**
- Full feature implementation
- Security-focused development
- Performance optimization
- Bug fix coordination

### 💻 Senior Full-Stack Developer
**ID:** `senior-fullstack-developer`  
**Description:** Production-ready development specialist implementing CLAUDE Framework standards with TDD, 80%+ coverage, comprehensive error handling, and security best practices

**Key Capabilities:**
- **Frontend:** React, Vue.js, Angular, Svelte with TypeScript
- **Backend:** Node.js, Python, Java, C#, Go
- **Databases:** PostgreSQL, MongoDB, Redis, MySQL
- **Cloud:** AWS, Azure, Google Cloud, Vercel, Netlify
- **Architecture Patterns:** Clean Architecture, Hexagonal, Event-Driven, Microservices

**Quality Standards:**
- 80% minimum code coverage
- Cyclomatic complexity < 10
- Function length < 20 lines
- TDD approach (Red → Green → Refactor)
- SOLID principles enforcement

**Security Practices:**
- Input validation and output sanitization
- Authentication/Authorization implementation
- HTTPS enforcement and security headers
- Dependency scanning and secret management

**Usage:**
```bash
claude-auto --agent=senior-fullstack-developer "implement user authentication with JWT and 2FA"
```

### 🧪 QA Testing Engineer
**ID:** `qa-testing-engineer`
**Description:** Enterprise QA specialist implementing testing pyramid (70/20/10), 85%+ coverage targets, performance testing, and OWASP compliance validation

**Key Capabilities:**
- **Testing Pyramid:** 70% unit, 20% integration, 10% E2E tests
- **Frameworks:** Jest, Mocha, Playwright, Cypress, pytest, JUnit
- **Specialized Testing:** Performance, security, accessibility, localization
- **Quality Gates:** Coverage thresholds, performance benchmarks, security scans

**Testing Methodologies:**
- Test-Driven Development (TDD)
- Behavior-Driven Development (BDD)
- Risk-Based Testing
- Continuous Testing

**Coverage Targets:**
- Unit tests: 85%
- Integration tests: 75%
- E2E tests: 60%

**Usage:**
```bash
claude-auto --agent=qa-testing-engineer "create comprehensive test suite with performance and security validation"
```

### 🔒 Security Specialist
**ID:** `security-specialist`
**Description:** Security expert implementing OWASP Top 10 2021, multi-framework compliance (NIST, ISO 27001, SOC 2), advanced threat modeling (STRIDE, PASTA), and comprehensive security testing

**Key Capabilities:**
- **Compliance:** OWASP Top 10, NIST, ISO 27001, SOC 2, PCI DSS, HIPAA, GDPR
- **Threat Modeling:** STRIDE, PASTA, DREAD methodologies
- **Security Testing:** Static analysis, dynamic analysis, dependency scanning
- **Vulnerability Assessment:** Penetration testing, security audits

**Security Frameworks:**
- Authentication/Authorization patterns
- Encryption standards (AES-256, RSA, ECDSA)
- Zero Trust Architecture
- Defense in Depth strategies

**Usage:**
```bash
claude-auto --agent=security-specialist "perform comprehensive security audit and implement fixes"
```

### 🏢 Solutions Architect
**ID:** `solutions-architect`
**Description:** Enterprise architect specializing in system design, technology strategy, and scalable solution architecture

**Key Capabilities:**
- **Architecture Patterns:** Microservices, Event-Driven, CQRS, Event Sourcing
- **Cloud Strategy:** Multi-cloud, vendor lock-in mitigation
- **Data Architecture:** Data Lake, Data Warehouse, Data Mesh
- **Documentation:** Architecture Decision Records (ADRs)

**Design Principles:**
- Scalability and performance optimization
- High availability (99.99% uptime)
- Disaster recovery planning
- Cost optimization strategies

**Usage:**
```bash
claude-auto --agent=solutions-architect "design scalable microservices architecture for e-commerce platform"
```

### 🚀 DevOps Deployment Engineer
**ID:** `devops-deployment-engineer`
**Description:** DevOps specialist implementing zero-downtime deployments, blue-green/canary strategies, infrastructure as code, comprehensive monitoring, and disaster recovery procedures

**Key Capabilities:**
- **CI/CD:** GitHub Actions, GitLab CI, Jenkins, CircleCI
- **Containerization:** Docker, Kubernetes, Helm
- **IaC:** Terraform, CloudFormation, Ansible
- **Monitoring:** Prometheus, Grafana, ELK Stack, DataDog

**Deployment Strategies:**
- Blue-green deployments
- Canary releases
- Feature flags
- Rolling updates

**Usage:**
```bash
claude-auto --agent=devops-deployment-engineer "setup zero-downtime deployment pipeline with monitoring"
```

### 🎭 Playwright Test Agent
**ID:** `playwright-test-agent`
**Description:** E2E testing specialist with Playwright implementing cross-browser testing, accessibility validation (WCAG 2.1), visual regression, performance monitoring, and mobile testing

**Key Capabilities:**
- **Browser Testing:** Chrome, Firefox, Safari, Edge
- **Mobile Testing:** Android, iOS viewports
- **Accessibility:** WCAG 2.1 AA compliance validation
- **Visual Testing:** Screenshot comparison, visual regression
- **Performance:** Core Web Vitals, loading metrics

**Test Coverage:**
- Critical user journeys
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility compliance
- Performance benchmarks

**Usage:**
```bash
claude-auto --agent=playwright-test-agent "create comprehensive E2E tests with accessibility and performance validation"
```

### 🧠 Context Manager
**ID:** `context-manager`
**Description:** Context optimization and documentation specialist focused on efficient token usage and knowledge management

**Key Capabilities:**
- Dynamic context window management (32K → 200K → 1M tokens)
- Intelligent context switching
- Documentation generation
- Knowledge base management
- Token optimization strategies

**Documentation Types:**
- API documentation (OpenAPI/Swagger)
- Architecture Decision Records (ADRs)
- Technical specifications
- User guides and tutorials
- Onboarding documentation

**Usage:**
```bash
claude-auto --agent=context-manager "optimize context and generate comprehensive documentation"
```

## Multi-Agent Workflows

### Full Development Cycle with CLAUDE Framework
```bash
# 1. Architecture design with ADRs
claude-auto --agent=solutions-architect "design user authentication system with ADR documentation"

# 2. Security review and threat modeling
claude-auto --agent=security-specialist "perform threat modeling using STRIDE and security review"

# 3. TDD Implementation with 80%+ coverage
claude-auto --agent=senior-fullstack-developer "implement authentication with TDD and 80% coverage"

# 4. Comprehensive testing pyramid
claude-auto --agent=qa-testing-engineer "create test suite following 70/20/10 pyramid"

# 5. E2E Testing with accessibility  
claude-auto --agent=playwright-test-agent "create E2E tests with WCAG 2.1 compliance"

# 6. Zero-downtime deployment
claude-auto --agent=devops-deployment-engineer "setup blue-green deployment with monitoring"

# 7. Documentation and knowledge management
claude-auto --agent=context-manager "generate complete documentation suite with ADRs"
```

### Security-First Development
```bash
# OWASP Top 10 audit
claude-auto --agent=security-specialist "audit against OWASP Top 10 2021"

# Implement with security patterns
claude-auto --agent=senior-fullstack-developer "implement with security-first approach"

# Security-focused testing
claude-auto --agent=qa-testing-engineer "create security test suite with penetration tests"

# Validate compliance
claude-auto --agent=security-specialist "validate SOC 2 and ISO 27001 compliance"
```

### Performance Optimization Workflow
```bash
# Performance architecture
claude-auto --agent=solutions-architect "design for 10,000 concurrent users"

# Optimized implementation
claude-auto --agent=senior-fullstack-developer "implement with performance optimization"

# Performance testing
claude-auto --agent=qa-testing-engineer "create performance test suite with load testing"

# Browser performance
claude-auto --agent=playwright-test-agent "validate Core Web Vitals and performance metrics"

# Monitoring setup
claude-auto --agent=devops-deployment-engineer "setup performance monitoring and alerting"
```

## Quality Gates and Compliance

### Mandatory Quality Gates
All agents enforce these quality gates:
- **Code Coverage:** Minimum 80% for new code
- **Security Scan:** No critical/high vulnerabilities
- **Performance:** Response time < 200ms for APIs
- **Accessibility:** WCAG 2.1 AA compliance
- **Documentation:** Complete API docs and ADRs

### Framework Compliance Checks
```bash
# Validate CLAUDE Framework compliance
claude-auto --agent=master-orchestrator "validate project against CLAUDE Framework v2.0"

# Security compliance check
claude-auto --agent=security-specialist "validate OWASP, NIST, ISO compliance"

# Testing coverage validation
claude-auto --agent=qa-testing-engineer "validate testing pyramid and coverage targets"
```

## Agent Configuration

Each agent can be configured by editing its JSON file in the `agents/` directory:

```
agents/
├── master-orchestrator.json       # Workflow coordination settings
├── senior-fullstack-developer.json # Development standards and patterns
├── qa-testing-engineer.json       # Testing strategies and targets
├── security-specialist.json       # Security frameworks and compliance
├── solutions-architect.json       # Architecture patterns and principles
├── devops-deployment-engineer.json # Deployment strategies and monitoring
├── playwright-test-agent.json     # E2E testing and accessibility
├── context-manager.json           # Context optimization settings
└── registry.json                  # Central agent registry
```

### Configuration Structure
Each agent configuration includes:
- **capabilities:** Core functionalities
- **specializations:** Domain expertise
- **context:** Model preferences and system prompts
- **quality_standards:** Coverage, complexity, and performance targets
- **workflows:** Step-by-step processes
- **collaboration:** Inter-agent communication patterns

## Best Practices

### 1. Agent Selection
Choose agents based on task complexity:
- **Simple tasks:** Use individual specialized agents
- **Complex projects:** Start with master-orchestrator
- **Security-critical:** Always include security-specialist
- **Production deployments:** Include devops-deployment-engineer

### 2. Workflow Optimization
- Run agents in parallel when possible
- Use master-orchestrator for multi-agent coordination
- Implement quality gates between agent handoffs
- Maintain context with context-manager

### 3. Quality Assurance
- Always include qa-testing-engineer for production code
- Use playwright-test-agent for user-facing features
- Validate with security-specialist before deployment
- Document with context-manager for maintenance

## Troubleshooting

### Agent Not Found
```bash
# Check agent status
claude-auto --agent-status

# View installed agents
cat agents/registry.json | jq .agents

# Reinstall agents
npm run install-agents
```

### Configuration Errors
```bash
# Validate agent configurations
node scripts/install-agents.js --validate

# Check specific agent
cat agents/[agent-name].json | jq .

# Reset to defaults
git checkout agents/
```

### Performance Issues
```bash
# Check context usage
claude-auto --agent=context-manager "analyze context usage"

# Optimize token usage
claude-auto --agent=context-manager "optimize for token efficiency"
```

### Framework Compliance
```bash
# Full compliance check
claude-auto --agent=master-orchestrator "full CLAUDE Framework audit"

# Specific area check
claude-auto --agent=qa-testing-engineer "validate testing compliance"
```

## Advanced Features

### Custom Workflows
Create custom multi-agent workflows in `workflows/` directory:
```json
{
  "name": "secure-feature-development",
  "agents": ["security-specialist", "senior-fullstack-developer", "qa-testing-engineer"],
  "quality_gates": ["security", "coverage", "performance"],
  "framework": "CLAUDE v2.0"
}
```

### Agent Metrics
Monitor agent performance:
```bash
# View agent metrics
claude-auto --metrics

# Performance report
claude-auto --agent=master-orchestrator "generate performance report"
```

### Integration with CI/CD
```yaml
# GitHub Actions example
- name: Run Claude Agents
  run: |
    claude-auto --agent=qa-testing-engineer "run test suite"
    claude-auto --agent=security-specialist "security scan"
    claude-auto --agent=devops-deployment-engineer "deploy if tests pass"
```

## Support and Resources

- **Documentation:** Full docs in `/docs` directory
- **Examples:** Sample workflows in `/examples`
- **Issues:** Report at GitHub repository
- **Updates:** Check `CHANGELOG.md` for latest features

For more information, see the main README.md file and CLAUDE Framework documentation.