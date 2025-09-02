@echo off
REM Claude Auto Global - Windows Setup Script
REM This script installs all dependencies and configures the environment

echo 🤖 Claude Auto Global Setup - Windows
echo ===============================================

REM Function to print colored output (limited in batch)
REM Using simple echo for compatibility

echo [INFO] Starting Claude Auto Global setup...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [SUCCESS] Node.js is installed: 
node --version

REM Check Node.js version (simplified check)
for /f "tokens=1 delims=." %%i in ('node --version') do set NODE_MAJOR=%%i
set NODE_MAJOR=%NODE_MAJOR:v=%
if %NODE_MAJOR% LSS 16 (
    echo [ERROR] Node.js version 16+ is required. Current version:
    node --version
    pause
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm.
    pause
    exit /b 1
)

echo [SUCCESS] npm is installed:
npm --version

REM Check Claude CLI
claude --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Claude CLI is not installed. Please install it from https://claude.ai/cli
    echo Press Enter to continue or Ctrl+C to exit and install Claude CLI first...
    pause
) else (
    echo [SUCCESS] Claude CLI is installed
)

REM Install dependencies
echo [INFO] Installing project dependencies...
call npm install

if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [SUCCESS] Dependencies installed successfully

REM Install globally
echo [INFO] Installing claude-auto globally...
call npm install -g .

if errorlevel 1 (
    echo [ERROR] Failed to install claude-auto globally
    echo [INFO] You may need to run as Administrator
    pause
    exit /b 1
)

echo [SUCCESS] claude-auto installed globally

REM Install agents
echo [INFO] Installing Claude agents...
call npm run install-agents

if errorlevel 1 (
    echo [ERROR] Failed to install Claude agents
    pause
    exit /b 1
)

echo [SUCCESS] Claude agents installed

REM Setup Playwright
echo [INFO] Setting up Playwright...
call npm run setup-playwright

if errorlevel 1 (
    echo [WARNING] Playwright setup failed - you may need to run 'npx playwright install' manually
) else (
    echo [SUCCESS] Playwright setup completed
)

REM Create necessary directories
echo [INFO] Creating configuration directories...
if not exist "%USERPROFILE%\.claude-config" mkdir "%USERPROFILE%\.claude-config"

REM Setup API key if not already configured
if not exist "%USERPROFILE%\.claude-config\api-key.encrypted" (
    if "%ANTHROPIC_API_KEY%"=="" (
        echo [INFO] Please run 'claude-auto --setup' to configure your API key after setup completes.
    )
)

REM Test installation
echo [INFO] Testing installation...
claude-auto --help >nul 2>&1
if errorlevel 1 (
    echo [ERROR] claude-auto command not found in PATH
    echo [INFO] Try restarting your command prompt or adding npm global bin to PATH
) else (
    echo [SUCCESS] claude-auto command is available
)

REM Create test directories
echo [INFO] Creating project structure...
if not exist "tests" mkdir tests
if not exist "tests\unit" mkdir tests\unit
if not exist "tests\integration" mkdir tests\integration
if not exist "tests\e2e" mkdir tests\e2e
if not exist "docs" mkdir docs

REM Setup git hooks (if in git repository)
if exist ".git" (
    echo [INFO] Setting up git hooks...
    if not exist ".git\hooks\pre-commit" (
        (
        echo #!/bin/sh
        echo # Pre-commit hook for claude-auto-global
        echo.
        echo # Run linting
        echo npm run lint --silent
        echo if [ $? -ne 0 ]; then
        echo     echo "Linting failed. Please fix errors before committing."
        echo     exit 1
        echo fi
        echo.
        echo # Run tests
        echo npm test --silent
        echo if [ $? -ne 0 ]; then
        echo     echo "Tests failed. Please fix failing tests before committing."
        echo     exit 1
        echo fi
        ) > .git\hooks\pre-commit
        echo [SUCCESS] Git pre-commit hook installed
    )
)

REM Final summary
echo.
echo [SUCCESS] 🎉 Setup completed successfully!
echo.
echo [INFO] Next steps:
echo   1. Configure your Anthropic API key: claude-auto --setup
echo   2. Test the installation: claude-auto --help
echo   3. Try a simple command: claude-auto "hello world"
echo   4. Use an agent: claude-auto --agent=senior-fullstack "create a simple API"
echo.
echo [INFO] Available agents:
echo   🎤 master-orchestrator    - Project coordination
echo   💻 senior-fullstack       - Full-stack development
echo   🧪 qa-testing             - Quality assurance
echo   🔒 security               - Security specialist
echo   🏢 solutions-architect    - System design
echo   🚀 devops                 - Infrastructure ^& deployment
echo   🎭 playwright             - Browser testing
echo   🧠 context-manager        - Documentation ^& context
echo.
echo [INFO] Documentation:
echo   📚 README.md               - Complete documentation
echo   📁 agents\                 - Agent configurations
echo   🔧 scripts\                - Setup and utility scripts
echo.

claude --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] ⚠️  Don't forget to install Claude CLI: https://claude.ai/cli
)

echo [SUCCESS] Happy coding with Claude Auto Global! 🚀
echo.
echo Press any key to exit...
pause >nul