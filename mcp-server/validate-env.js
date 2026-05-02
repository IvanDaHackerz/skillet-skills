#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * 
 * This script validates that all required environment variables are set
 * before attempting to run the MCP server.
 * 
 * Usage:
 *   node validate-env.js
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file
const envPath = join(__dirname, '.env');
config({ path: envPath });

// Required environment variables
const REQUIRED_VARS = [
  'GITHUB_TOKEN',
  'GITHUB_OWNER',
  'POLICIES_REPO',
  'SKILLS_REPO',
  'DEFAULT_BRANCH',
  'METADATA_PATH',
];

// Optional but recommended
const RECOMMENDED_VARS = [
  'MCP_SERVER_BUILD_PATH',
];

console.log('🔍 Validating MCP Server Environment Configuration...\n');

// Check if .env file exists
if (!existsSync(envPath)) {
  console.error('❌ ERROR: .env file not found!');
  console.error('\n📝 Quick fix:');
  console.error('   1. Copy .env.example to .env');
  console.error('   2. Fill in all required values');
  console.error('   3. Run this script again\n');
  process.exit(1);
}

console.log('✅ .env file found\n');

// Validate required variables
const missing = [];
const empty = [];
const valid = [];

for (const varName of REQUIRED_VARS) {
  const value = process.env[varName];
  
  if (value === undefined) {
    missing.push(varName);
  } else if (value.trim() === '') {
    empty.push(varName);
  } else {
    valid.push(varName);
  }
}

// Check recommended variables
const missingRecommended = [];
for (const varName of RECOMMENDED_VARS) {
  const value = process.env[varName];
  if (!value || value.trim() === '') {
    missingRecommended.push(varName);
  }
}

// Display results
console.log('📊 Validation Results:\n');

if (valid.length > 0) {
  console.log(`✅ Valid (${valid.length}/${REQUIRED_VARS.length}):`);
  valid.forEach(v => console.log(`   ✓ ${v}`));
  console.log();
}

if (empty.length > 0) {
  console.log(`⚠️  Empty values (${empty.length}):`);
  empty.forEach(v => console.log(`   ⚠ ${v} is set but empty`));
  console.log();
}

if (missing.length > 0) {
  console.log(`❌ Missing (${missing.length}):`);
  missing.forEach(v => console.log(`   ✗ ${v}`));
  console.log();
}

if (missingRecommended.length > 0) {
  console.log(`ℹ️  Recommended (optional):`);
  missingRecommended.forEach(v => console.log(`   ℹ ${v} - Used for documentation`));
  console.log();
}

// Specific validations
console.log('🔬 Specific Checks:\n');

// GitHub Token format
const token = process.env.GITHUB_TOKEN;
if (token && !token.startsWith('ghp_')) {
  console.log('⚠️  GITHUB_TOKEN should start with "ghp_"');
} else if (token) {
  console.log('✅ GITHUB_TOKEN format looks correct');
}

// Metadata path
const metadataPath = process.env.METADATA_PATH;
if (metadataPath && !metadataPath.endsWith('.json')) {
  console.log('⚠️  METADATA_PATH should point to a .json file');
} else if (metadataPath) {
  console.log('✅ METADATA_PATH format looks correct');
}

// Build path (if provided)
const buildPath = process.env.MCP_SERVER_BUILD_PATH;
if (buildPath) {
  if (!buildPath.endsWith('index.js')) {
    console.log('⚠️  MCP_SERVER_BUILD_PATH should point to index.js');
  } else if (buildPath.includes('\\')) {
    console.log('⚠️  MCP_SERVER_BUILD_PATH should use forward slashes (/) not backslashes (\\)');
  } else {
    console.log('✅ MCP_SERVER_BUILD_PATH format looks correct');
  }
}

console.log();

// Final verdict
const hasErrors = missing.length > 0 || empty.length > 0;

if (hasErrors) {
  console.log('❌ VALIDATION FAILED\n');
  console.log('📝 To fix:');
  console.log('   1. Open .env file in a text editor');
  console.log('   2. Fill in all missing/empty values');
  console.log('   3. See .env.example for guidance');
  console.log('   4. Run this script again\n');
  process.exit(1);
} else {
  console.log('✅ VALIDATION PASSED\n');
  console.log('🎉 All required environment variables are set!');
  console.log('   You can now run: npm run build\n');
  process.exit(0);
}

// Made with Bob
