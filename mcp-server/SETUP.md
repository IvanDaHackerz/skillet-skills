# Skillet GitHub MCP Server - Setup Guide

This guide will walk you through setting up the GitHub MCP server for the Skillet system.

## Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account with access to the repositories
- Bob IDE installed

## Step 1: Get a GitHub Personal Access Token (PAT)

The MCP server needs a GitHub Personal Access Token to access your repositories.

### Creating the Token

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/tokens
   - Or navigate: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a descriptive name: `Skillet MCP Server`
   - Set expiration: Choose based on your security requirements (recommended: 90 days)

3. **Select Scopes**
   - ✅ **repo** (Full control of private repositories)
     - This automatically includes:
       - repo:status
       - repo_deployment
       - public_repo
       - repo:invite
       - security_events
   
   **Note**: The `repo` scope is required for both reading and writing to repositories.

4. **Generate and Copy Token**
   - Click "Generate token" at the bottom
   - **IMPORTANT**: Copy the token immediately! You won't be able to see it again.
   - The token will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Token Security

⚠️ **Keep your token secure:**
- Never commit it to git
- Don't share it with others
- Store it only in the `.env` file
- Regenerate it if compromised

## Step 2: Configure the MCP Server

⚠️ **IMPORTANT**: All environment variables are **REQUIRED**. The server will not start if any are missing.

1. **Navigate to the MCP server directory**
   ```bash
   cd mcp-server
   ```

2. **Create the .env file**
   ```bash
   cp .env.example .env
   ```

3. **Edit the .env file**
   
   Open `.env` in your text editor and fill in **ALL** required values:
   
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
   MCP_SERVER_BUILD_PATH=C:/Users/YourUsername/path/to/skillet-skills/mcp-server/build/index.js
   ```
   
   **Important Notes**:
   - Replace `your_github_username` with your actual GitHub username
   - Replace `MCP_SERVER_BUILD_PATH` with the absolute path to your build/index.js file
   - Use forward slashes (`/`) even on Windows
   - No variable is optional - all must be set

4. **Verify the .env file is in .gitignore**
   
   The `.env` file should already be excluded from git. Verify:
   ```bash
   git check-ignore .env
   ```
   
   If it returns `.env`, you're good! If not, add it to `.gitignore`.

## Step 3: Build the Server

Build the TypeScript code:

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Create the `build/` directory
- Make `build/index.js` executable

Expected output:
```
> skillet-github-mcp-server@1.0.0 build
> tsc && node -e "require('fs').chmodSync('build/index.js', '755')"
```

## Step 4: Test the Server (Optional)

You can test that the server starts correctly:

```bash
node build/index.js
```

Expected output:
```
Skillet GitHub MCP server running on stdio
```

The server will wait for MCP protocol messages. Press `Ctrl+C` to stop it.

## Step 5: Register with Bob IDE

Now we need to tell Bob IDE about the MCP server.

### Locate Bob's MCP Settings File

The file is located at:
```
C:\Users\[YourUsername]\.bob\settings\mcp_settings.json
```

For your system:
```
C:\Users\Elieson\.bob\settings\mcp_settings.json
```

### Add the Server Configuration

1. **Open the MCP settings file** in a text editor

2. **Add the server configuration** to the `mcpServers` object:

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
      "disabled": false,
      "alwaysAllow": [],
      "disabledTools": []
    }
  }
}
```

**Important Notes:**
- Replace **ALL** placeholder values with your actual configuration
- Use the **same values** as in your `.env` file
- Use forward slashes (`/`) in paths, even on Windows
- Use the absolute path to the `build/index.js` file (from `MCP_SERVER_BUILD_PATH` in `.env`)
- If other MCP servers exist, add this as a new entry in the `mcpServers` object
- **All environment variables must be included** - the server requires them all

### Alternative: Reference System Environment Variables

For better security, you can set environment variables at the system level:

```json
{
  "mcpServers": {
    "skillet-github": {
      "command": "node",
      "args": [
        "C:/Users/YourUsername/path/to/skillet-skills/mcp-server/build/index.js"
      ],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      },
      "disabled": false
    }
  }
}
```

Then set the `GITHUB_TOKEN` environment variable in your system.

## Step 6: Restart Bob IDE

After updating the MCP settings:

1. **Close Bob IDE completely**
2. **Reopen Bob IDE**
3. **Verify the server is connected**

You should see the MCP server listed in Bob's connected servers.

## Step 7: Verify Installation

Test that Bob can use the MCP tools:

1. **Ask Bob to list policy files:**
   ```
   Hey Bob, use the list_policy_files tool to show me what's in the rules directory
   ```

2. **Ask Bob to read a policy file:**
   ```
   Hey Bob, use the read_policy_file tool to read rules/skill-format.md
   ```

3. **Ask Bob to list skills:**
   ```
   Hey Bob, use the list_skill_files tool to show me all skills
   ```

If these work, your MCP server is successfully installed! 🎉

## Troubleshooting

### "Missing required environment variables"

**Problem**: Server fails to start with a list of missing variables.

**Error Example**:
```
❌ Missing required environment variables:
  - GITHUB_TOKEN
  - METADATA_PATH
```

**Solutions**:
1. Ensure you've created a `.env` file from `.env.example`
2. Fill in **ALL** required variables (no variable is optional)
3. Check for typos in variable names
4. Verify no extra spaces or quotes around values
5. Ensure the `.env` file is in the `mcp-server/` directory
6. Restart Bob IDE after fixing the `.env` file

### "GITHUB_TOKEN environment variable is required"

**Problem**: The server can't find your GitHub token.

**Solutions**:
- Verify the token is in the `.env` file
- Check that the `env` section in `mcp_settings.json` includes `GITHUB_TOKEN`
- Make sure there are no extra spaces or quotes around the token
- Ensure the token value starts with `ghp_`

### "Authentication failed" or "Bad credentials"

**Problem**: The GitHub token is invalid or expired.

**Solutions**:
- Verify you copied the entire token (starts with `ghp_`)
- Check the token hasn't expired
- Ensure the token has the `repo` scope
- Generate a new token if needed
- Test the token by using it in a GitHub API request

### "File not found" errors

**Problem**: The server can't find files in the repository.

**Solutions**:
- Verify the file path is correct (case-sensitive)
- Check you're using the right repository (policies vs skills)
- Ensure `GITHUB_OWNER`, `POLICIES_REPO`, and `SKILLS_REPO` are correct in `.env`
- Verify the file exists in the GitHub repository
- Check that `METADATA_PATH` points to the correct file

### Server doesn't start

**Problem**: Bob can't connect to the MCP server.

**Solutions**:
- Verify the path in `mcp_settings.json` is correct
- Check that `build/index.js` exists (run `npm run build` if not)
- Look at Bob's logs for error messages
- Try running `node build/index.js` manually to see errors

### Rate limiting

**Problem**: "API rate limit exceeded" errors.

**Solutions**:
- GitHub allows 5,000 requests per hour for authenticated requests
- Wait for the rate limit to reset (check response headers)
- Consider caching frequently accessed files

## Next Steps

Now that your MCP server is set up:

1. **Create skills** that use the MCP tools
2. **Read the main README.md** for usage examples
3. **Explore the available tools** in the documentation

## Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review the main README.md
3. Check Bob's error logs
4. Verify your GitHub token permissions

## Security Reminders

- ✅ Keep your `.env` file secure and never commit it
- ✅ Use token expiration dates
- ✅ Regenerate tokens if compromised
- ✅ Only grant necessary permissions
- ✅ Review token usage regularly in GitHub settings