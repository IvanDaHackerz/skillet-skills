# Skillet GitHub MCP Server

MCP server for accessing Skillet GitHub repositories with read-only access to policies and read-write access to skills.

## Features

- **Read-only access** to `skillet-policies` repository
- **Read-write access** to `skillet-skills` repository
- Automatic file content retrieval and updates
- Directory listing capabilities
- Skill metadata management
- Custom commit messages for all write operations

## Available Tools

### Read-Only Tools (skillet-policies)

1. **`read_policy_file`** - Read a file from the skillet-policies repository
   - Parameters:
     - `path` (required): File path within the repository

2. **`list_policy_files`** - List files in a directory
   - Parameters:
     - `path` (optional): Directory path (default: root)

### Read-Write Tools (skillet-skills)

3. **`read_skill_file`** - Read a file from the skillet-skills repository
   - Parameters:
     - `path` (required): File path within the repository

4. **`write_skill_file`** - Create or update a file
   - Parameters:
     - `path` (required): File path within the repository
     - `content` (required): Content to write
     - `message` (required): Commit message
     - `branch` (optional): Branch name (default: main)

5. **`list_skill_files`** - List files in a directory
   - Parameters:
     - `path` (optional): Directory path (default: root)

6. **`update_skill_metadata`** - Update skill-index.json
   - Parameters:
     - `content` (required): Updated JSON content
     - `message` (required): Commit message

## Setup Instructions

⚠️ **IMPORTANT**: All environment variables are **REQUIRED**. The server will fail to start if any variable is missing.

### 1. Get a GitHub Personal Access Token (PAT)

1. Go to GitHub Settings: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Skillet MCP Server")
4. Select the following scopes:
   - ✅ **repo** (Full control of private repositories)
     - This includes: repo:status, repo_deployment, public_repo, repo:invite, security_events
5. Click "Generate token"
6. **Copy the token immediately** (you won't be able to see it again!)

### 2. Create .env File

```bash
cd mcp-server
cp .env.example .env
```

Edit `.env` and fill in **ALL** required values:

```env
# GitHub Authentication (REQUIRED)
GITHUB_TOKEN=ghp_your_actual_token_here

# GitHub Configuration (ALL REQUIRED)
GITHUB_OWNER=your_github_username
POLICIES_REPO=skillet-policies
SKILLS_REPO=skillet-skills
DEFAULT_BRANCH=main

# File Paths (ALL REQUIRED)
METADATA_PATH=metadata/skill-index.json
MCP_SERVER_BUILD_PATH=/absolute/path/to/skillet-skills/mcp-server/build/index.js
```

**Note**: See `.env.example` for detailed documentation of each variable.

### 3. Build the Server

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Create the `build/` directory
- Make `build/index.js` executable

### 4. Test the Server (Optional)

You can test the server manually:

```bash
node build/index.js
```

The server will start and wait for MCP protocol messages on stdin.

## Usage in Skills

Skills can specify which MCP tools to use in their instructions:

```markdown
## Steps

1. Read the coding standards from policies
   - Tool: read_policy_file
   - Path: rules/coding-standards.md

2. List all existing skills
   - Tool: list_skill_files
   - Path: skills

3. Create a new skill file
   - Tool: write_skill_file
   - Path: skills/backend-new-feature.md
   - Content: [generated content]
   - Message: "feat: add backend-new-feature skill"

4. Update the skill index
   - Tool: update_skill_metadata
   - Content: [updated JSON]
   - Message: "chore: update skill index"
```

## Architecture

```
┌─────────────┐
│  Bob IDE    │
└──────┬──────┘
       │ MCP Protocol
       │
┌──────▼──────────────────────┐
│  GitHub MCP Server          │
│  (stdio transport)          │
└──────┬──────────────────────┘
       │ GitHub API
       │
       ├─────────────────┐
       │                 │
┌──────▼──────┐   ┌──────▼──────┐
│  policies   │   │   skills    │
│  (read-only)│   │ (read-write)│
└─────────────┘   └─────────────┘
```

## Error Handling

The server includes comprehensive error handling:

- **404 errors**: File or directory not found
- **Authentication errors**: Invalid or expired GitHub token
- **Rate limiting**: GitHub API rate limit exceeded
- **Validation errors**: Invalid parameters or JSON content
- **Network errors**: Connection issues with GitHub API

All errors are returned with descriptive messages to help diagnose issues.

## Security

- ✅ GitHub token is stored in `.env` file (excluded from git)
- ✅ Read-only access enforced for policies repository
- ✅ All write operations require explicit commit messages
- ✅ Input validation using Zod schemas
- ✅ **No hardcoded credentials or paths in source code**
- ✅ **All configuration via environment variables**
- ✅ Strict validation ensures no missing configuration

## Development

### Project Structure

```
mcp-server/
├── src/
│   └── index.ts          # Main server implementation
├── build/                # Compiled JavaScript (generated)
├── .env                  # Environment variables (not in git)
├── .env.example          # Example environment file
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Scripts

- `npm run build` - Compile TypeScript and make executable
- `npm run watch` - Watch mode for development
- `npm run prepare` - Runs automatically before npm install

## Troubleshooting

### "Missing required environment variables"

**Problem**: Server fails to start with a list of missing variables.

**Solution**:
1. Ensure you've created a `.env` file from `.env.example`
2. Fill in **ALL** required variables (no variable is optional)
3. Check for typos in variable names
4. Verify no extra spaces or quotes around values

Example error:
```
❌ Missing required environment variables:
  - GITHUB_TOKEN
  - METADATA_PATH
```

### "GITHUB_TOKEN environment variable is required"

**Problem**: The GitHub token is missing or empty.

**Solution**:
- Create a `.env` file if it doesn't exist
- Add your GitHub token: `GITHUB_TOKEN=ghp_your_token_here`
- Ensure the token is valid and not expired

### "File not found" errors

**Problem**: The server can't find files in the repository.

**Solution**:
- Verify the file path is correct (case-sensitive)
- Check you're using the correct repository (policies vs skills)
- Ensure `GITHUB_OWNER`, `POLICIES_REPO`, and `SKILLS_REPO` are set correctly
- Verify the file exists in the GitHub repository

### "Authentication failed"

**Problem**: GitHub rejects the authentication token.

**Solution**:
- Verify the token is correct (starts with `ghp_`)
- Check the token hasn't expired
- Ensure the token has the `repo` scope
- Generate a new token if needed

### Rate limiting

**Problem**: "API rate limit exceeded" errors.

**Solution**:
- GitHub allows 5,000 requests per hour for authenticated requests
- Wait for the rate limit to reset (check response headers)
- Consider caching frequently accessed files

### Path configuration issues

**Problem**: Server can't find the build file or metadata.

**Solution**:
- Verify `MCP_SERVER_BUILD_PATH` points to the correct absolute path
- Ensure `METADATA_PATH` is correct relative to the repository root
- Use forward slashes (`/`) even on Windows
- Check that the build directory exists (run `npm run build`)

## License

ISC