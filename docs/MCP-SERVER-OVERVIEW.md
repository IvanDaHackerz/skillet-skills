# Skillet GitHub MCP Server - Complete Overview

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Available Tools](#available-tools)
7. [Usage in Skills](#usage-in-skills)
8. [Security](#security)
9. [Troubleshooting](#troubleshooting)
10. [Development](#development)

---

## Introduction

The Skillet GitHub MCP Server is a Model Context Protocol (MCP) server that enables Bob IDE to interact with your GitHub repositories. It provides controlled access to the Skillet system's two-repository architecture:

- **skillet-policies** (read-only): Immutable company policies and standards
- **skillet-skills** (read-write): Reusable development skills library

### Why MCP?

The Model Context Protocol allows AI assistants like Bob to:
- Access external data sources securely
- Perform actions on behalf of users
- Maintain context across interactions
- Follow structured workflows

### Key Benefits

✅ **Automated Skill Management**: Bob can read policies and create/update skills automatically  
✅ **Policy Enforcement**: Ensures all skills follow company standards  
✅ **Version Control**: All changes are committed to GitHub with proper messages  
✅ **Secure Access**: Token-based authentication with granular permissions  
✅ **Audit Trail**: Complete history of all skill changes in Git  

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Bob IDE                              │
│  (AI Assistant with MCP Protocol Support)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ MCP Protocol (stdio)
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Skillet GitHub MCP Server                       │
│  - Tool handlers (6 tools)                                   │
│  - GitHub API client (Octokit)                               │
│  - Input validation (Zod)                                    │
│  - Error handling                                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ GitHub REST API
                         │
         ┌───────────────┴───────────────┐
         │                               │
┌────────▼────────┐            ┌────────▼────────┐
│ skillet-policies│            │ skillet-skills  │
│   (read-only)   │            │  (read-write)   │
│                 │            │                 │
│ - rules/        │            │ - skills/       │
│ - .bob/skills/  │            │ - metadata/     │
│ - metadata/     │            │ - bob_sessions/ │
└─────────────────┘            └─────────────────┘
```

### Component Breakdown

1. **Bob IDE**: The AI assistant that uses the MCP server
2. **MCP Server**: Translates Bob's requests into GitHub API calls
3. **GitHub API**: Provides access to repository contents
4. **Repositories**: Store policies (immutable) and skills (mutable)

### Communication Flow

```
User Request → Bob IDE → MCP Protocol → MCP Server → GitHub API → Repository
                  ↓                                                    ↓
User Response ← Bob IDE ← MCP Protocol ← MCP Server ← GitHub API ← Repository
```

---

## Features

### Read-Only Access (skillet-policies)

- ✅ Read policy files (coding standards, security guidelines, skill format)
- ✅ List directory contents
- ✅ Access meta-skills and role definitions
- ❌ Cannot modify or delete files (enforced at tool level)

### Read-Write Access (skillet-skills)

- ✅ Read skill files and metadata
- ✅ Create new skills
- ✅ Update existing skills
- ✅ List directory contents
- ✅ Update skill metadata (skill-index.json)
- ✅ Custom commit messages for all changes

### Built-in Capabilities

- **Input Validation**: Zod schemas ensure correct parameters
- **Error Handling**: Comprehensive error messages for debugging
- **Rate Limiting**: Respects GitHub API limits
- **Authentication**: Secure token-based access
- **Logging**: Server logs for troubleshooting

---

## Installation

### Quick Start

```bash
# 1. Navigate to the MCP server directory
cd mcp-server

# 2. Install dependencies (already done)
npm install

# 3. Create .env file
cp .env.example .env

# 4. Add your GitHub token to .env
# Edit .env and add: GITHUB_TOKEN=ghp_your_token_here

# 5. Build the server
npm run build

# 6. Configure Bob IDE
# Add server configuration to:
# C:\Users\Elieson\.bob\settings\mcp_settings.json
```

### Detailed Setup

See [SETUP.md](../mcp-server/SETUP.md) for complete installation instructions.

---

## Configuration

### Environment Variables

Create a `.env` file in the `mcp-server/` directory:

```env
# Required
GITHUB_TOKEN=ghp_your_personal_access_token

# Optional (defaults provided)
GITHUB_OWNER=IvanDaHackerz
POLICIES_REPO=skillet-policies
SKILLS_REPO=skillet-skills
DEFAULT_BRANCH=main
```

### Bob IDE Configuration

Add to `C:\Users\Elieson\.bob\settings\mcp_settings.json`:

```json
{
  "mcpServers": {
    "skillet-github": {
      "command": "node",
      "args": [
        "C:/Users/Elieson/OneDrive/Documents/Programming/Skillet/skillet-skills/mcp-server/build/index.js"
      ],
      "env": {
        "GITHUB_TOKEN": "your_token_here",
        "GITHUB_OWNER": "IvanDaHackerz",
        "POLICIES_REPO": "skillet-policies",
        "SKILLS_REPO": "skillet-skills",
        "DEFAULT_BRANCH": "main"
      },
      "disabled": false,
      "alwaysAllow": [],
      "disabledTools": []
    }
  }
}
```

---

## Available Tools

### 1. read_policy_file

**Purpose**: Read files from the skillet-policies repository  
**Access**: Read-only  
**Parameters**:
- `path` (string, required): File path within repository

**Example**:
```json
{
  "path": "rules/coding-standards.md"
}
```

### 2. list_policy_files

**Purpose**: List directory contents in skillet-policies  
**Access**: Read-only  
**Parameters**:
- `path` (string, optional): Directory path (default: root)

**Example**:
```json
{
  "path": "rules"
}
```

### 3. read_skill_file

**Purpose**: Read files from the skillet-skills repository  
**Access**: Read-only  
**Parameters**:
- `path` (string, required): File path within repository

**Example**:
```json
{
  "path": "skills/backend-rest-api-endpoint-generator.md"
}
```

### 4. write_skill_file

**Purpose**: Create or update files in skillet-skills  
**Access**: Read-write  
**Parameters**:
- `path` (string, required): File path within repository
- `content` (string, required): File content
- `message` (string, required): Commit message
- `branch` (string, optional): Branch name (default: main)

**Example**:
```json
{
  "path": "skills/backend-new-feature.md",
  "content": "# Backend New Feature\n\n...",
  "message": "feat: add backend-new-feature skill",
  "branch": "main"
}
```

### 5. list_skill_files

**Purpose**: List directory contents in skillet-skills  
**Access**: Read-only  
**Parameters**:
- `path` (string, optional): Directory path (default: root)

**Example**:
```json
{
  "path": "skills"
}
```

### 6. update_skill_metadata

**Purpose**: Update the skill-index.json metadata file  
**Access**: Read-write  
**Parameters**:
- `content` (string, required): Updated JSON content
- `message` (string, required): Commit message

**Example**:
```json
{
  "content": "{\"skills\": [...], \"lastUpdated\": \"...\"}",
  "message": "chore: update skill index"
}
```

---

## Usage in Skills

### Basic Pattern

Skills can specify MCP tool usage in their instructions:

```markdown
## Steps

1. Read the coding standards
   - Tool: read_policy_file
   - Parameters:
     - path: "rules/coding-standards.md"

2. Create a new skill file
   - Tool: write_skill_file
   - Parameters:
     - path: "skills/backend-new-feature.md"
     - content: "[generated content]"
     - message: "feat: add backend-new-feature skill"
```

### Complete Example

See [SKILL-USAGE-GUIDE.md](../mcp-server/SKILL-USAGE-GUIDE.md) for comprehensive examples and best practices.

---

## Security

### Authentication

- Uses GitHub Personal Access Token (PAT)
- Token stored in `.env` file (excluded from git)
- Requires `repo` scope for full access

### Access Control

- **Policies Repository**: Read-only access enforced at tool level
- **Skills Repository**: Read-write access with commit tracking
- All changes require explicit commit messages

### Best Practices

✅ **DO**:
- Use token expiration dates
- Store tokens securely in `.env`
- Use descriptive commit messages
- Review token permissions regularly
- Regenerate tokens if compromised

❌ **DON'T**:
- Commit tokens to git
- Share tokens with others
- Use tokens without expiration
- Grant unnecessary permissions

### Token Permissions

Required GitHub token scopes:
- ✅ `repo` - Full control of private repositories
  - Includes: repo:status, repo_deployment, public_repo, repo:invite, security_events

---

## Troubleshooting

### Common Issues

#### "GITHUB_TOKEN environment variable is required"

**Cause**: Token not found in environment  
**Solution**: 
1. Verify `.env` file exists in `mcp-server/`
2. Check token is set: `GITHUB_TOKEN=ghp_...`
3. Ensure Bob's MCP settings include the token

#### "Authentication failed"

**Cause**: Invalid or expired token  
**Solution**:
1. Verify token is correct (starts with `ghp_`)
2. Check token hasn't expired
3. Ensure token has `repo` scope
4. Generate new token if needed

#### "File not found"

**Cause**: Incorrect file path or file doesn't exist  
**Solution**:
1. Verify path is correct (case-sensitive)
2. Check file exists in repository
3. Ensure using correct repository (policies vs skills)

#### "API rate limit exceeded"

**Cause**: Too many GitHub API requests  
**Solution**:
1. Wait for rate limit reset (5,000 requests/hour)
2. Optimize tool usage to reduce API calls
3. Consider caching frequently accessed files

### Debug Mode

To see detailed logs:

```bash
# Run server manually
cd mcp-server
node build/index.js
```

Server logs will appear in stderr.

---

## Development

### Project Structure

```
mcp-server/
├── src/
│   └── index.ts              # Main server implementation
├── build/                    # Compiled JavaScript (generated)
│   └── index.js
├── node_modules/             # Dependencies
├── .env                      # Environment variables (not in git)
├── .env.example              # Example environment file
├── package.json              # Project configuration
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Server documentation
├── SETUP.md                  # Installation guide
├── SKILL-USAGE-GUIDE.md      # How to use tools in skills
└── mcp-settings-example.json # Bob IDE configuration example
```

### Scripts

```bash
# Build the server
npm run build

# Watch mode for development
npm run watch

# Prepare (runs automatically before install)
npm run prepare
```

### Adding New Tools

To add a new tool:

1. Define Zod schema for parameters
2. Add tool definition to `tools` array
3. Implement handler in `CallToolRequestSchema` handler
4. Update documentation

Example:

```typescript
// 1. Define schema
const NewToolSchema = z.object({
  param: z.string().describe("Parameter description"),
});

// 2. Add to tools array
const tools: Tool[] = [
  // ... existing tools
  {
    name: "new_tool",
    description: "Tool description",
    inputSchema: {
      type: "object",
      properties: {
        param: {
          type: "string",
          description: "Parameter description",
        },
      },
      required: ["param"],
    },
  },
];

// 3. Implement handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    // ... existing cases
    case "new_tool": {
      const { param } = NewToolSchema.parse(args);
      // Implementation
      return {
        content: [{ type: "text", text: "Result" }],
      };
    }
  }
});
```

### Testing

Manual testing:

```bash
# Start server
node build/index.js

# In another terminal, send MCP protocol messages
# (Use Bob IDE or MCP testing tools)
```

---

## Additional Resources

- **GitHub REST API**: https://docs.github.com/en/rest
- **MCP Protocol**: https://modelcontextprotocol.io/
- **Octokit Documentation**: https://octokit.github.io/rest.js/
- **Zod Documentation**: https://zod.dev/

---

## Support

For issues or questions:

1. Check [SETUP.md](../mcp-server/SETUP.md) troubleshooting section
2. Review [SKILL-USAGE-GUIDE.md](../mcp-server/SKILL-USAGE-GUIDE.md)
3. Verify GitHub token and permissions
4. Check Bob IDE error logs
5. Review server logs (stderr output)

---

## License

ISC

---

## Changelog

### Version 1.0.0 (2026-05-02)

- Initial release
- 6 MCP tools implemented
- Read-only access to skillet-policies
- Read-write access to skillet-skills
- Comprehensive documentation
- Error handling and validation
- GitHub API integration via Octokit