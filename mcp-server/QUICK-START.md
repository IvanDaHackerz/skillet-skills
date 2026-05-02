# Quick Start Guide - Skillet GitHub MCP Server

## ✅ Build Status: SUCCESS

The MCP server has been successfully built and compiled!

```
> skillet-github-mcp-server@1.0.0 build
> tsc && node -e "require('fs').chmodSync('build/index.js', '755')"
✅ Build completed successfully
```

## 🎯 What You Have Now

A fully functional MCP server with:
- ✅ 6 GitHub tools (read policies, read/write skills)
- ✅ TypeScript compiled to JavaScript
- ✅ Executable server at `build/index.js`
- ✅ Complete documentation
- ✅ Configuration examples

## 🚀 3-Step Setup

⚠️ **IMPORTANT**: All environment variables are **REQUIRED**. No defaults are provided.

### Step 1: Get GitHub Token (2 minutes)

1. Visit: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Skillet MCP Server"
4. Scope: ✅ **repo** (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (starts with `ghp_`)

### Step 2: Configure Environment (2 minutes)

Copy `.env.example` to `.env` in `mcp-server/` directory and fill in **ALL** values:

```env
# GitHub Authentication (REQUIRED)
GITHUB_TOKEN=ghp_your_token_here

# GitHub Configuration (ALL REQUIRED)
GITHUB_OWNER=your_github_username
POLICIES_REPO=skillet-policies
SKILLS_REPO=skillet-skills
DEFAULT_BRANCH=main

# File Paths (ALL REQUIRED)
METADATA_PATH=metadata/skill-index.json
MCP_SERVER_BUILD_PATH=C:/Users/YourUsername/path/to/skillet-skills/mcp-server/build/index.js
```

**Critical**: Replace ALL placeholder values with your actual configuration!

### Step 3: Register with Bob (2 minutes)

Edit: `C:\Users\YourUsername\.bob\settings\mcp_settings.json`

Add this configuration (use the **same values** from your `.env` file):

```json
{
  "mcpServers": {
    "skillet-github": {
      "command": "node",
      "args": [
        "C:/Users/YourUsername/path/to/skillet-skills/mcp-server/build/index.js"
      ],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here",
        "GITHUB_OWNER": "your_github_username",
        "POLICIES_REPO": "skillet-policies",
        "SKILLS_REPO": "skillet-skills",
        "DEFAULT_BRANCH": "main",
        "METADATA_PATH": "metadata/skill-index.json"
      },
      "disabled": false
    }
  }
}
```

**Important**:
- Replace **ALL** placeholder values with your actual configuration
- Use the **same values** as in your `.env` file
- Use forward slashes (`/`) in paths, even on Windows
- If other servers exist, add this as a new entry
- **All environment variables must be included**

### Step 4: Restart Bob IDE

1. Close Bob IDE completely
2. Reopen Bob IDE
3. The MCP server will start automatically

## ✨ Test It!

Try these commands in Bob:

```
Hey Bob, use the list_policy_files tool to show me what's in the rules directory
```

```
Hey Bob, use the list_skill_files tool to show me all skills
```

```
Hey Bob, use the read_policy_file tool to read rules/skill-format.md
```

## 📚 Available Tools

| Tool | Purpose | Access |
|------|---------|--------|
| `read_policy_file` | Read files from skillet-policies | Read-only |
| `list_policy_files` | List directories in skillet-policies | Read-only |
| `read_skill_file` | Read files from skillet-skills | Read-only |
| `write_skill_file` | Create/update files in skillet-skills | Read-write |
| `list_skill_files` | List directories in skillet-skills | Read-only |
| `update_skill_metadata` | Update skill-index.json | Read-write |

## 📖 Documentation

- **SETUP.md** - Detailed installation guide
- **README.md** - Server features and overview
- **SKILL-USAGE-GUIDE.md** - How to use tools in skills
- **mcp-settings-example.json** - Configuration template
- **docs/MCP-SERVER-OVERVIEW.md** - Complete technical docs

## 🔧 Troubleshooting

### Missing environment variables?
- **Error**: "Missing required environment variables: ..."
- **Fix**: Ensure ALL variables in `.env` are filled in
- Copy from `.env.example` if you haven't already
- No variable is optional - all must be set

### Server won't start?
- Check the path in `mcp_settings.json` is correct
- Verify `build/index.js` exists (run `npm run build`)
- Ensure `.env` file exists with all required variables
- Look at Bob's error logs for specific errors

### Authentication errors?
- Verify token is correct (starts with `ghp_`)
- Check token has `repo` scope
- Ensure token hasn't expired
- Confirm `GITHUB_TOKEN` is set in both `.env` and `mcp_settings.json`

### File not found?
- Verify file path is correct (case-sensitive)
- Check you're using the right repository
- Ensure file exists in GitHub
- Verify `GITHUB_OWNER`, `POLICIES_REPO`, `SKILLS_REPO` are correct
- Check `METADATA_PATH` points to the right file

## 🎓 Next Steps

1. **Complete the 3-step setup above**
2. **Test the tools** with Bob
3. **Create skills** that use the MCP tools
4. **Read SKILL-USAGE-GUIDE.md** for examples

## 💡 Example Skill Using MCP Tools

```markdown
# Backend API Endpoint Generator

## Steps

1. Read coding standards
   - Tool: read_policy_file
   - Parameters:
     - path: "rules/coding-standards.md"

2. Read security guidelines
   - Tool: read_policy_file
   - Parameters:
     - path: "rules/security-guidelines.md"

3. Generate endpoint code
   - Follow standards from step 1
   - Apply security from step 2

4. Save the skill
   - Tool: write_skill_file
   - Parameters:
     - path: "skills/backend-api-users.md"
     - content: "[Generated content]"
     - message: "feat: add backend-api-users skill"

5. Update metadata
   - Tool: update_skill_metadata
   - Parameters:
     - content: "[Updated JSON]"
     - message: "chore: register backend-api-users skill"
```

## 🎉 You're Ready!

The MCP server is built and ready to use. Just:
1. Add your GitHub token
2. Configure Bob IDE
3. Restart Bob
4. Start using the tools!

---

**Need Help?** Check the detailed documentation in the files listed above.