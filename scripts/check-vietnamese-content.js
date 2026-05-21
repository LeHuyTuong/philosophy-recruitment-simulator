#!/usr/bin/env node

/**
 * check-vietnamese-content.js
 * 
 * Scans source files for non-Vietnamese characters that shouldn't be there:
 * - CJK Unified Ideographs (Chinese/Japanese Kanji)
 * - CJK Extension A
 * - Hiragana / Katakana
 * - Hangul (Korean)
 * - Cyrillic (Russian)
 * 
 * Run: node scripts/check-vietnamese-content.js
 */

const fs = require('fs');
const path = require('path');

// Regex: matches CJK, Hiragana, Katakana, Hangul, Cyrillic
const FOREIGN_CHAR_REGEX = /[\u3400-\u4DBF\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF\u0400-\u04FF]/g;

// Directories to scan
const SCAN_DIRS = ['src/', 'scripts/'];

// Directories/files to ignore
const IGNORE_PATTERNS = [
  'node_modules',
  '.next',
  'dist',
  'build',
  '.git',
  '.DS_Store',
];

// Allowed English technical terms (used for context checks, not blocking)
const ALLOWED_TECH_TERMS = new Set([
  'GPA', 'HR', 'KPI', 'ROI', 'ROAS', 'CTR', 'CPC', 'CAC', 'LTV',
  'SEO', 'SEM', 'CRM', 'CI/CD', 'JWT', 'OAuth', 'REST', 'B2B', 'B2C',
  'React', 'Java', 'Spring', 'DevOps', 'UI/UX', 'SQL', 'API',
  'Deploy', 'Debug', 'Docker', 'Kubernetes', 'GitHub', 'GitLab',
  'Figma', 'Sketch', 'Adobe', 'Photoshop', 'Illustrator', 'After Effects',
  'Google', 'YouTube', 'Instagram', 'Facebook', 'TikTok', 'LinkedIn',
  'Shopee', 'Lazada', 'Baeldung', 'Confluence', 'Medium', 'Notion',
  'DaVinci', 'Reggio', 'Emilia',
]);

let totalFiles = 0;
let totalIssues = 0;
let hasErrors = false;

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues = [];

  lines.forEach((line, lineNum) => {
    // Skip import statements, comments about allowed terms, and string keys
    if (line.trim().startsWith('//') && line.includes('allowed')) return;
    if (line.trim().startsWith('//') && line.includes('CJK')) return;
    if (line.trim().startsWith('//') && line.includes('TODO')) return;
    if (line.trim().startsWith('//') && line.includes('NOTE')) return;
    
    // Find all foreign characters
    const matches = [];
    let match;
    FOREIGN_CHAR_REGEX.lastIndex = 0;
    while ((match = FOREIGN_CHAR_REGEX.exec(line)) !== null) {
      matches.push({
        char: match[0],
        code: `U+${match[0].codePointAt(0).toString(16).toUpperCase()}`,
        index: match.index,
      });
    }

    if (matches.length > 0) {
      // Build a display of the line with the foreign chars highlighted
      const chars = matches.map(m => `"${m.char}" (${m.code})`);
      issues.push({
        line: lineNum + 1,
        chars: chars.join(', '),
        preview: line.trim().substring(0, 100) + (line.trim().length > 100 ? '...' : ''),
      });
    }
  });

  return issues;
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!shouldIgnore(fullPath)) {
        walkDir(fullPath);
      }
    } else {
      // Only scan text files
      const ext = path.extname(entry.name).toLowerCase();
      const validExts = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.mjs', '.cjs'];
      if (validExts.includes(ext) && !shouldIgnore(fullPath)) {
        totalFiles++;
        const issues = scanFile(fullPath);
        if (issues.length > 0) {
          hasErrors = true;
          issues.forEach(issue => {
            console.log(`\x1b[31m✗\x1b[0m ${fullPath}:${issue.line}`);
            console.log(`  Foreign chars: ${issue.chars}`);
            console.log(`  Preview: ${issue.preview}`);
            totalIssues++;
          });
        }
      }
    }
  }
}

// Main
console.log('🔍 Scanning for foreign characters in Vietnamese content...\n');
console.log(`  Scan dirs: ${SCAN_DIRS.join(', ')}`);
console.log(`  Regex: [CJK \\u3400-\\u9FFF] [Hiragana/Katakana \\u3040-\\u30FF] [Hangul \\uAC00-\\uD7AF] [Cyrillic \\u0400-\\u04FF]`);
console.log('');

SCAN_DIRS.forEach(dir => walkDir(dir));

console.log('');
console.log('─'.repeat(60));
console.log(`Files scanned: ${totalFiles}`);
console.log(`Issues found: ${totalIssues}`);

if (hasErrors) {
  console.log('\n\x1b[31m❌ FAIL: Foreign characters detected. Please review and fix.\x1b[0m');
  process.exit(1);
} else {
  console.log('\n\x1b[32m✅ PASS: No foreign characters found.\x1b[0m');
  process.exit(0);
}
