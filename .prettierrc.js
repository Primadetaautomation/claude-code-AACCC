module.exports = {
  // Formatting options
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  
  // Language-specific formatting
  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 120,
        proseWrap: 'always'
      }
    },
    {
      files: '*.yml',
      options: {
        singleQuote: false
      }
    }
  ]
};