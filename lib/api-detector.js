/**
 * API Detector - Determines when tasks need high-context Claude API
 *
 * This module analyzes task descriptions to determine if they require
 * the full Claude API with high context limits versus local Claude.
 */

// Keywords that indicate high context requirements
const HIGH_CONTEXT_KEYWORDS = [
  // Scope indicators
  'entire codebase',
  'complete codebase',
  'whole codebase',
  'full codebase',
  'entire project',
  'complete project',
  'whole project',
  'full project',
  'entire repository',
  'complete repository',
  'whole repository',
  'full repository',

  // Analysis depth indicators
  'complete analysis',
  'comprehensive analysis',
  'full analysis',
  'thorough analysis',
  'detailed analysis',
  'in-depth analysis',
  'comprehensive review',
  'complete review',
  'full review',
  'thorough review',

  // Agent/tool keywords
  'all agents',
  'multiple agents',
  'various agents',
  'different agents',

  // Context size indicators
  'maximum context',
  'max context',
  'full context',
  'large context',
  'high context',
  '1m tokens',
  '1 million tokens',
  'maximum tokens',
  'max tokens',

  // Multi-file operations
  'across all files',
  'all files',
  'every file',
  'multiple files',
  'many files',
  'various files',
  'different files',

  // Architecture/system level
  'system architecture',
  'overall architecture',
  'complete architecture',
  'system design',
  'overall design',
  'system overview',
  'project overview',
  'complete overview',

  // Migration/refactoring
  'migrate entire',
  'migrate complete',
  'migrate all',
  'refactor entire',
  'refactor complete',
  'refactor all',
  'restructure entire',
  'restructure complete',

  // Documentation
  'complete documentation',
  'full documentation',
  'comprehensive documentation',
  'document entire',
  'document complete',
  'document all'
];

// Keywords that typically indicate simpler, local tasks
const LOW_CONTEXT_KEYWORDS = [
  'fix this',
  'fix bug',
  'debug this',
  'help with this',
  'explain this',
  'what does this',
  'how does this',
  'single function',
  'one function',
  'this method',
  'this class',
  'small change',
  'quick fix',
  'simple',
  'just',
  'only'
];

// File patterns that might indicate scope
const FILE_SCOPE_PATTERNS = [
  /\*\*\/\*/,  // glob patterns like **/*
  /\*\.\w+/,   // patterns like *.js, *.py
  /all\s+\w+\s+files/i,
  /every\s+\w+\s+file/i
];

/**
 * Analyzes a task string to determine if it needs API access
 * @param {string} task - The task description to analyze
 * @returns {boolean} - True if task needs API, false for local Claude
 */
function needsAPI(task) {
  if (!task || typeof task !== 'string') {
    return false;
  }

  const taskLower = task.toLowerCase();

  // Check for explicit high context keywords
  const hasHighContextKeywords = HIGH_CONTEXT_KEYWORDS.some(keyword =>
    taskLower.includes(keyword.toLowerCase())
  );

  if (hasHighContextKeywords) {
    return true;
  }

  // Check for file scope patterns
  const hasFileScopePattern = FILE_SCOPE_PATTERNS.some(pattern =>
    pattern.test(task)
  );

  if (hasFileScopePattern) {
    return true;
  }

  // Check for explicit low context indicators
  const hasLowContextKeywords = LOW_CONTEXT_KEYWORDS.some(keyword =>
    taskLower.includes(keyword.toLowerCase())
  );

  if (hasLowContextKeywords) {
    return false;
  }

  // Heuristic checks for task complexity
  const wordCount = task.split(/\s+/).length;

  // Very short tasks are usually simple
  if (wordCount <= 5) {
    return false;
  }

  // Look for multiple file references
  const fileExtensionMatches = task.match(/\.\w{2,4}\b/g);
  if (fileExtensionMatches && fileExtensionMatches.length > 3) {
    return true;
  }

  // Look for directory references
  const directoryIndicators = [
    'src/',
    'lib/',
    'components/',
    'pages/',
    'utils/',
    'services/',
    'models/',
    'controllers/',
    'views/'
  ];

  const directoryCount = directoryIndicators.filter(dir =>
    taskLower.includes(dir)
  ).length;

  if (directoryCount > 2) {
    return true;
  }

  // Check for complexity indicators
  const complexityIndicators = [
    'architecture',
    'structure',
    'organization',
    'relationships',
    'dependencies',
    'integration',
    'workflow',
    'pipeline',
    'framework',
    'system'
  ];

  const complexityScore = complexityIndicators.filter(indicator =>
    taskLower.includes(indicator)
  ).length;

  if (complexityScore >= 2) {
    return true;
  }

  // Default to local Claude for most tasks
  return false;
}

/**
 * Get explanation for why API was or wasn't chosen
 * @param {string} task - The task description
 * @returns {string} - Human readable explanation
 */
function getDetectionReason(task) {
  if (!task) {return 'No task provided';}

  const needsApiResult = needsAPI(task);
  const taskLower = task.toLowerCase();

  if (needsApiResult) {
    // Find which high context keywords matched
    const matchedKeywords = HIGH_CONTEXT_KEYWORDS.filter(keyword =>
      taskLower.includes(keyword.toLowerCase())
    );

    if (matchedKeywords.length > 0) {
      return `Detected high-context keywords: ${matchedKeywords.slice(0, 3).join(', ')}`;
    }

    const fileExtensionMatches = task.match(/\.\w{2,4}\b/g);
    if (fileExtensionMatches && fileExtensionMatches.length > 3) {
      return `Multiple file references detected (${fileExtensionMatches.length})`;
    }

    return 'Task complexity indicates need for high context';
  } else {
    const matchedLowKeywords = LOW_CONTEXT_KEYWORDS.filter(keyword =>
      taskLower.includes(keyword.toLowerCase())
    );

    if (matchedLowKeywords.length > 0) {
      return `Simple task keywords: ${matchedLowKeywords.slice(0, 2).join(', ')}`;
    }

    return 'Task appears to be simple/focused';
  }
}

module.exports = {
  needsAPI,
  getDetectionReason,
  HIGH_CONTEXT_KEYWORDS,
  LOW_CONTEXT_KEYWORDS
};
