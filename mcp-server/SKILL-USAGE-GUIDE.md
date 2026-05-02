# Using GitHub MCP Tools in Skillet Skills

This guide explains how to use the GitHub MCP server tools in your Skillet skill instructions.

## Overview

The GitHub MCP server provides 8 tools that allow skills to interact with the Skillet repositories:

### Read-Only Tools (skillet-policies)

- `read_policy_file` - Read files from policies repository
- `list_policy_files` - List directory contents in policies repository

### Read-Write Tools (skillet-skills)

- `read_skill_file` - Read files from skills repository
- `write_skill_file` - Create or update files in skills repository
- `list_skill_files` - List directory contents in skills repository
- `update_skill_metadata` - Update the skill-index.json file

### Git Operations (skillet-skills)

- `create_branch` - Create a new branch in the repository
- `create_pull_request` - Create a pull request for code review

## Tool Reference

### 1. read_policy_file

Read a file from the skillet-policies repository (read-only).

**Parameters:**

- `path` (required): File path within the repository

**Example:**

```markdown
## Steps

1. Read the coding standards
   - Tool: read_policy_file
   - Parameters:
     - path: "rules/coding-standards.md"
```

**Use Cases:**

- Reading company policies before generating code
- Checking security guidelines
- Validating against skill format requirements
- Referencing coding standards

---

### 2. list_policy_files

List files in a directory within the skillet-policies repository.

**Parameters:**

- `path` (optional): Directory path (default: root)

**Example:**

```markdown
## Steps

1. List all policy rules
   - Tool: list_policy_files
   - Parameters:
     - path: "rules"
```

**Use Cases:**

- Discovering available policies
- Finding specific rule files
- Exploring policy structure

---

### 3. read_skill_file

Read a file from the skillet-skills repository.

**Parameters:**

- `path` (required): File path within the repository

**Example:**

```markdown
## Steps

1. Read an existing skill for reference
   - Tool: read_skill_file
   - Parameters:
     - path: "skills/backend-rest-api-endpoint-generator.md"
```

**Use Cases:**

- Reading existing skills for reference
- Checking skill metadata
- Analyzing skill patterns
- Validating skill content

---

### 4. write_skill_file

Create or update a file in the skillet-skills repository.

**Parameters:**

- `path` (required): File path within the repository
- `content` (required): Content to write
- `message` (required): Commit message
- `branch` (optional): Branch name (default: main)

**Example:**

```markdown
## Steps

1. Create a new skill file
   - Tool: write_skill_file
   - Parameters:
     - path: "skills/backend-new-feature.md"
     - content: "[Generated skill content]"
     - message: "feat: add backend-new-feature skill"
     - branch: "main"
```

**Use Cases:**

- Creating new skills
- Updating existing skills
- Saving generated content
- Committing changes with descriptive messages

**Commit Message Guidelines:**

- Use conventional commits format: `type: description`
- Types: `feat`, `fix`, `docs`, `chore`, `refactor`
- Be descriptive and specific
- Examples:
  - `feat: add backend-api-endpoint skill`
  - `fix: correct validation logic in frontend-form skill`
  - `docs: update skill usage examples`
  - `chore: update skill metadata`

---

### 5. list_skill_files

List files in a directory within the skillet-skills repository.

**Parameters:**

- `path` (optional): Directory path (default: root)

**Example:**

```markdown
## Steps

1. List all existing skills
   - Tool: list_skill_files
   - Parameters:
     - path: "skills"

2. List backend skills only
   - Tool: list_skill_files
   - Parameters:
     - path: "skills"
   - Filter results for files starting with "backend-"
```

**Use Cases:**

- Discovering existing skills
- Checking for duplicates
- Finding skills by category
- Exploring repository structure

---

### 6. update_skill_metadata

Update the skill-index.json metadata file.

**Parameters:**

- `content` (required): Updated JSON content
- `message` (required): Commit message

**Example:**

````markdown
## Steps

1. Update skill metadata
   - Tool: update_skill_metadata

---

### 7. create_branch

Create a new branch in a GitHub repository.

**Parameters:**

- `branch` (required): New branch name
- `from_branch` (optional): Source branch to create from (default: main)
- `repo` (optional): Repository name (default: SKILLS_REPO)

**Example:**

```markdown
## Steps

1. Create a feature branch for modifications
   - Tool: create_branch
   - Parameters:
     - branch: "modify-skill/frontend-css-step5"
     - from_branch: "main"
     - repo: "skillet-skills"
```
````

**Use Cases:**

- Creating feature branches for skill modifications
- Setting up isolated development branches
- Preparing branches for pull requests
- Creating branches for experimental changes

**Branch Naming Conventions:**

- Use descriptive names: `feature/`, `modify-skill/`, `fix/`
- Include context: `modify-skill/frontend-css-step5-validation`
- Use kebab-case: `my-feature-branch`
- Avoid special characters and spaces

---

### 8. create_pull_request

Create a pull request in a GitHub repository.

**Parameters:**

- `title` (required): Pull request title
- `body` (required): Pull request description/body
- `head` (required): Source branch name
- `base` (optional): Target branch name (default: main)
- `repo` (optional): Repository name (default: SKILLS_REPO)

**Example:**

```markdown
## Steps

1. Create pull request for review
   - Tool: create_pull_request
   - Parameters:
     - title: "Modify Frontend CSS Transformer: Add Custom Property Validation"
     - body: |

       ## Validation Comparison

       Original: 85/100
       Modified: 90/100

       ## Changes
       - Added custom property validation in Step 5
       - Improved error handling

       ## Review Checklist
       - [ ] Validation scores improved
       - [ ] No policy violations
       - [ ] Security guidelines followed

     - head: "modify-skill/frontend-css-step5"
     - base: "main"
     - repo: "skillet-skills"
```

**Use Cases:**

- Creating PRs for skill modifications
- Submitting new skills for review
- Requesting code review from senior devs
- Documenting changes with validation results

**PR Best Practices:**

- Use clear, descriptive titles
- Include validation comparison in body
- Add review checklist
- Reference related issues or skills
- Provide context for reviewers
  - Parameters:
    - content: |
      {
      "skills": [...],
      "lastUpdated": "2026-05-02T17:30:00.000Z",
      "version": "1.0.0",
      "stats": {
      "totalSkills": 5,
      "byCategory": {
      "backend": 2,
      "frontend": 2,
      "devops": 1,
      "qa": 0,
      "shared": 0
      }
      }
      }
    - message: "chore: update skill index with new backend skill"

````

**Use Cases:**

- Registering new skills
- Updating skill statistics
- Maintaining skill catalog
- Tracking skill metadata

---

## Complete Skill Example

Here's a complete example of a skill that uses multiple MCP tools:

```markdown
# Backend REST API Endpoint Generator

## Category

backend

## Description

Generates a new REST API endpoint with proper structure, validation, and error handling.

## Prerequisites

- Express.js project
- Existing API structure
- Database models defined

## Steps

1. Read the coding standards from policies
   - Tool: read_policy_file
   - Parameters:
     - path: "rules/coding-standards.md"
   - Store the standards for reference

2. Read the security guidelines

### Pattern 5: Modify Existing Skill with PR

```markdown
1. Read policies and target skill file
2. Apply modifications to specific section
3. Validate original skill (4 checks)
4. Validate modified skill (4 checks)
5. Compare validation results
6. Create feature branch
7. Commit modified skill to branch
8. Create pull request with validation comparison
```
   - Tool: read_policy_file
   - Parameters:
     - path: "rules/security-guidelines.md"
   - Ensure generated code follows security best practices

3. Check for similar existing endpoints
   - Tool: list_skill_files
   - Parameters:
     - path: "skills"
   - Look for existing API endpoint skills to avoid duplication

4. Generate the endpoint code
   - Create route handler
   - Add input validation
   - Implement error handling
   - Follow coding standards from step 1
   - Apply security guidelines from step 2

5. Save the generated endpoint
   - Tool: write_skill_file
   - Parameters:
     - path: "skills/backend-api-[endpoint-name].md"
     - content: "[Generated skill documentation]"
     - message: "feat: add backend-api-[endpoint-name] skill"

6. Update the skill metadata
   - Tool: update_skill_metadata
   - Parameters:
     - content: "[Updated skill-index.json with new skill]"
     - message: "chore: register new backend API endpoint skill"

## Expected Output

- New API endpoint file created
- Skill documentation generated
- Skill metadata updated
- All changes committed to repository

## Validation

- Code follows coding standards
- Security guidelines applied
- No duplicate skills created
- Metadata correctly updated
````

---

## Best Practices

### 1. Always Read Policies First

Before generating any code or content, read the relevant policies:

```markdown
1. Read coding standards
   - Tool: read_policy_file
   - Parameters:
     - path: "rules/coding-standards.md"

2. Read security guidelines
   - Tool: read_policy_file
   - Parameters:
     - path: "rules/security-guidelines.md"
```

### 2. Check for Duplicates

Before creating new skills, check if similar ones exist:

```markdown
1. List existing skills
   - Tool: list_skill_files
   - Parameters:
     - path: "skills"
   - Check for similar skill names or purposes
```

### 3. Use Descriptive Commit Messages

Always provide clear, descriptive commit messages:

```markdown
✅ Good:

- "feat: add backend-user-authentication skill"
- "fix: correct validation logic in frontend-form-handler"
- "docs: update skill usage examples with MCP tools"

❌ Bad:

- "update"
- "fix stuff"
- "new skill"
```

### 4. Validate JSON Content

When updating metadata, ensure JSON is valid:

```markdown
1. Read current metadata
   - Tool: read_skill_file
   - Parameters:
     - path: "metadata/skill-index.json"

2. Parse and validate JSON
   - Ensure proper structure
   - Update relevant fields
   - Maintain data integrity

3. Write updated metadata
   - Tool: update_skill_metadata
   - Parameters:
     - content: "[Valid JSON]"
     - message: "chore: update skill metadata"
```

### 5. Handle Errors Gracefully

Include error handling in your skill instructions:

```markdown
1. Try to read existing file
   - Tool: read_skill_file
   - Parameters:
     - path: "skills/example.md"
   - If file not found, proceed with creation
   - If file exists, ask user for confirmation to overwrite
```

---

## Common Patterns

### Pattern 1: Create New Skill

```markdown
1. Read policies (coding standards, security guidelines)
2. List existing skills to check for duplicates
3. Generate skill content following policies
4. Write skill file with descriptive commit message
5. Update skill metadata
```

### Pattern 2: Update Existing Skill

```markdown
1. Read current skill content
2. Read relevant policies for validation
3. Apply updates following policies
4. Write updated skill with clear commit message
5. Update metadata if needed
```

### Pattern 3: Validate Skill

```markdown
1. Read skill file
2. Read all relevant policies
3. Compare skill against policies
4. Generate validation report
5. If issues found, suggest corrections
```

### Pattern 4: Discover Skills

```markdown
1. List all skills in directory
2. Filter by category or pattern
3. Read selected skills for details
4. Present organized list to user
```

---

## Error Handling

### File Not Found

```markdown
If read_skill_file returns "File not found":

- Verify the path is correct
- Check if file exists in repository
- Consider creating the file if appropriate
```

### Authentication Errors

```markdown
If any tool returns "Authentication failed":

- Verify GitHub token is valid
- Check token has required permissions
- Ensure token hasn't expired
```

### Rate Limiting

```markdown
If "API rate limit exceeded":

- Wait for rate limit reset
- Consider caching frequently accessed files
- Optimize tool usage to reduce API calls
```

---

## Tips for Skill Authors

1. **Be Specific**: Provide exact file paths and clear parameters
2. **Follow Order**: Read policies before generating content
3. **Validate First**: Check for duplicates and conflicts
4. **Commit Wisely**: Use meaningful commit messages
5. **Update Metadata**: Keep skill-index.json current
6. **Handle Errors**: Include error handling in instructions
7. **Test Thoroughly**: Verify tools work as expected
8. **Document Well**: Explain why each tool is used

---

## Additional Resources

- **Main README**: `mcp-server/README.md` - Server overview and features
- **Setup Guide**: `mcp-server/SETUP.md` - Installation instructions
- **API Documentation**: GitHub REST API docs for advanced usage
- **MCP Protocol**: Model Context Protocol specification

---

## Support

For issues or questions:

1. Check the troubleshooting section in SETUP.md
2. Review the main README.md
3. Verify your GitHub token and permissions
4. Check Bob's error logs for details
