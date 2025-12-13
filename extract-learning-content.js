#!/usr/bin/env node

/**
 * ORA Platform Content Extraction Script
 * Extracts learning content from React components for AI training
 * Excludes business strategy and revenue-focused content
 */

const fs = require('fs');
const path = require('path');

// Components to extract learning content from
const LEARNING_COMPONENTS = [
  'LessonContent.tsx',
  'About.tsx',
  'FAQ.tsx',
  'HeroSection.tsx',
  'Library.tsx',
  'VideoLibrary.tsx',
  'PDFLibrary.tsx'
];

// Components to exclude (business strategy)
const EXCLUDED_COMPONENTS = [
  'SocialMediaStrategy.tsx',
  'ProfitProjections.tsx',
  'B2BWhiteLabelDashboard.tsx',
  'VeteransIAPRevenue.tsx',
  'RevenueModelComparison.tsx',
  'IncomeProjection6Month.tsx',
  'IncomeProjection90Day.tsx',
  'IncomeProjection90to180Day.tsx'
];

function extractTextFromJSX(content, componentName) {
  let extractedContent = [];

  console.log(`Processing ${componentName}...`);

  // Simple text extraction - look for string literals that seem educational
  const textMatches = content.match(/["']([^"']*[A-Za-z]{10,}[^"']*)["']/g);
  if (textMatches) {
    extractedContent.push(`## Content from ${componentName}`);
    textMatches.forEach(match => {
      const text = match.replace(/["']/g, '');
      // Filter for meaningful educational content
      if (text.length > 15 &&
          (text.toLowerCase().includes('learn') ||
           text.toLowerCase().includes('ai') ||
           text.toLowerCase().includes('education') ||
           text.toLowerCase().includes('training') ||
           text.toLowerCase().includes('course') ||
           text.toLowerCase().includes('module'))) {
        extractedContent.push(`- ${text}`);
      }
    });
  }

  console.log(`Found ${extractedContent.length} content items in ${componentName}`);
  return extractedContent.length > 1 ? extractedContent : null;
}

function extractComponentContent(componentPath) {
  try {
    const content = fs.readFileSync(componentPath, 'utf8');
    const componentName = path.basename(componentPath, '.tsx');

    console.log(`Extracting content from ${componentName}...`);

    const extracted = extractTextFromJSX(content, componentName);
    return extracted.length > 0 ? extracted : null;
  } catch (error) {
    console.error(`Error reading ${componentPath}:`, error.message);
    return null;
  }
}

function main() {
  console.log('🚀 Starting ORA Platform content extraction...');

  const componentsDir = path.join(__dirname, 'src', 'components');
  let allContent = [];

  console.log('Components directory:', componentsDir);
  console.log('Files to process:', LEARNING_COMPONENTS);

  // Add header
  allContent.push('# ORA Platform Learning Content');
  allContent.push('Extracted educational content for AI training');
  allContent.push('');
  allContent.push('## Overview');
  allContent.push('This document contains structured learning content from the ORA Platform,');
  allContent.push('focused on AI education, workforce development, and organizational learning.');
  allContent.push('Business strategy and revenue-focused content has been excluded.');
  allContent.push('');

  LEARNING_COMPONENTS.forEach(componentName => {
    const componentPath = path.join(componentsDir, componentName);

    console.log(`Checking: ${componentPath}`);
    console.log(`Exists: ${fs.existsSync(componentPath)}`);

    if (fs.existsSync(componentPath)) {
      const content = extractComponentContent(componentPath);
      console.log(`Extracted content length: ${content ? content.length : 0}`);
      if (content) {
        allContent = allContent.concat(content);
        allContent.push(''); // Add spacing between components
      }
    } else {
      console.log(`Component not found: ${componentName}`);
    }
  });

  // Add footer
  allContent.push('## End of Extracted Content');
  allContent.push('This content has been automatically extracted and may require further refinement.');
  allContent.push('For more information, visit the ORA Platform.');

  // Write to output file
  const outputPath = path.join(__dirname, 'extracted_content.md');
  fs.writeFileSync(outputPath, allContent.join('\n'), 'utf8');
  console.log(`Content extraction complete. See ${outputPath}`);
}

// Run the script
main();
