# Skill Modification Manager

Manages modifications to existing skills in the skillet-skills repository with automatic validation, policy compliance checking, and pull request creation. Use this when a developer needs to modify an existing skill file with proper validation and approval workflow. The skill ensures all modifications comply with company policies before creating a pull request for senior dev review.

**Version:** 1.0.0

**Category:** shared
**Roles:** backend, frontend, fullstack, devops, qa

---

## Prerequisites

- MCP server `skillet-github` is connected and configured with PR creation capability
- Access to both skillet-policies and skillet-skills repositories via MCP server
- Target skill file exists in the skills/ directory
- Clear understanding of the modification requirements
- GitHub token with permissions to create branches and pull requests

---

## Inputs

| Name                       | Type   | Required | Description                                                                                      |
| -------------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| `skill_file_path`          | string | Yes      | Path to skill file in skills/ directory (e.g., "skills/frontend-css-to-tailwind-transformer.md") |
| `modification_description` | string | Yes      | Clear description of what needs to be modified and why                                           |
| `target_section`           | string | No       | Specific section to modify (e.g., "Step 5", "Prerequisites", "Security Guidelines")              |
| `modification_content`     | string | Yes      | The actual content changes to apply                                                              |
| `branch_name`              | string | No       | Custom branch name (default: auto-generated as "modify-skill/[skill-name]-[timestamp]")          |

---

## Steps

### Step 1: Read Policy Files and Target Skill

First, use the `use_mcp_tool` tool to read all three policy files from the skillet-policies repository:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>read_policy_file</tool_name>
<arguments>
{
  "path": "rules/skill-format.md"
}
</arguments>
</use_mcp_tool>
```

Then read the security guidelines:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>read_policy_file</tool_name>
<arguments>
{
  "path": "rules/security-guidelines.md"
}
</arguments>
</use_mcp_tool>
```

Next, read the coding standards:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>read_policy_file</tool_name>
<arguments>
{
  "path": "rules/coding-standards.md"
}
</arguments>
</use_mcp_tool>
```

Finally, read the validation instructions:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>read_policy_file</tool_name>
<arguments>
{
  "path": ".bob/skills/validate-skill.md"
}
</arguments>
</use_mcp_tool>
```

Then, use the `use_mcp_tool` tool to read the target skill file:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>read_skill_file</tool_name>
<arguments>
{
  "path": "skills/frontend-css-to-tailwind-transformer.md"
}
</arguments>
</use_mcp_tool>
```

Store the original content for later comparison and validation.

### Step 2: Parse and Identify Modification Target

Next, analyze the skill file structure to identify the target section specified by the user.
Parse the markdown to locate section headers (e.g., "## Prerequisites", "### Step 5").
Verify that the target section exists in the skill file.
If the target section is not specified, ask the user using the `ask_followup_question` tool to clarify which section needs modification.
Extract the current content of the target section for reference.
Also extract the current version number from the skill file (look for `**Version:**` line).

### Step 3: Apply User's Requested Modifications and Update Version

Then, use the `apply_diff` tool to apply the modifications to the skill file.
Create a SEARCH block with the exact current content of the target section.
Create a REPLACE block with the modified content incorporating the user's changes.
Ensure the modification maintains proper markdown formatting and structure.
Preserve all other sections of the skill file unchanged.
Verify that the modification follows the imperative instruction style required by skill-format.md.

**CRITICAL**: After applying the modification, increment the version number following semantic versioning:

- MAJOR version (X.0.0) for breaking changes or complete rewrites
- MINOR version (x.Y.0) for new features or significant additions
- PATCH version (x.y.Z) for bug fixes or minor improvements

Update the version line in the skill file and add a "Changes made" section immediately after the version line.
The "Changes made" section must list all specific modifications made in this update as a bulleted list.
If the skill doesn't have a version yet, add `**Version:** 1.0.1` and the "Changes made" section.

### Step 4: Validate Original Skill Against Policies

After that, follow the validation process EXACTLY as specified in the validate-skill.md file you read in Step 1.

**Run Check #1: Guideline Compliance (0-100 score)**

- Evaluate structure & format (25 points)
- Evaluate content quality (35 points)
- Evaluate standards compliance (25 points)
- Evaluate example & documentation (15 points)
- Calculate total score and determine level (Excellent/Good/Fair/Poor)

**Run Check #2: Duplicate Detection (0-100% similarity)**

- Use `use_mcp_tool` with `list_skill_files` to get all existing skills
- Compare purpose, steps, inputs/outputs, and category
- Calculate similarity percentage
- Determine recommendation (Unique/Review/Reject)

**Run Check #3: Security Review (Pass/Fail)**

- Check for hardcoded credentials
- Check for SQL injection risks
- Check for XSS vulnerabilities
- Check for insecure file operations
- Check for exposed secrets
- Check for input validation
- Determine Pass or Fail status

**Run Check #4: Completeness Check (Pass/Fail)**

- Verify all required sections are present
- Check for placeholder text or empty sections
- Verify content quality in each section
- Determine Pass or Fail status

Generate a complete validation report for the original skill following the exact format from validate-skill.md.
Store this report as "Original Validation Report".

### Step 5: Validate Modified Skill Against Policies

Next, run the same four validation checks on the modified skill content.
Use the exact same criteria and scoring system from validate-skill.md.
Generate a complete validation report for the modified skill.
Store this report as "Modified Validation Report".

### Step 6: Compare Validation Results

Then, create a side-by-side comparison of the validation results:

**Comparison Format:**

```
📊 Validation Comparison: Original vs Modified
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Guideline Compliance
   Original:  [Score]/100 [Status]
   Modified:  [Score]/100 [Status]
   Change:    [+/-X points] [↑/↓/→]

🔄 Duplicate Detection
   Original:  [Similarity]% [Recommendation]
   Modified:  [Similarity]% [Recommendation]
   Change:    [+/-X%] [↑/↓/→]

🔒 Security Review
   Original:  [PASSED/FAILED]
   Modified:  [PASSED/FAILED]
   Change:    [Improved/Degraded/Unchanged]

📝 Completeness
   Original:  [PASSED/FAILED]
   Modified:  [PASSED/FAILED]
   Change:    [Improved/Degraded/Unchanged]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Assessment: [APPROVED/NEEDS REVIEW/REJECTED]

[Detailed explanation of changes and their impact]
[List of improvements or concerns]
[Recommendation for senior dev reviewer]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Analyze the comparison to determine if the modification:

- Improves the skill (higher scores, better compliance)
- Maintains quality (similar scores, no regressions)
- Degrades the skill (lower scores, new violations)

**Critical Check**: If the modified skill has a FAILED security review or critical policy violations, STOP and inform the user that the modification cannot proceed. Use `attempt_completion` to present the issues and required fixes.

### Step 7: Create New Branch in Skills Repository

After validation passes, generate a branch name if not provided by the user.
Use the format: `modify-skill/[skill-name]-[brief-description]` (e.g., `modify-skill/frontend-css-step5-validation`).
Sanitize the branch name to remove special characters and spaces (replace with hyphens).

Then, use the `use_mcp_tool` tool to create the new branch:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>create_branch</tool_name>
<arguments>
{
  "branch": "modify-skill/frontend-css-step5-validation",
  "from_branch": "main",
  "repo": "skillet-skills"
}
</arguments>
</use_mcp_tool>
```

Verify the branch was created successfully before proceeding.

### Step 8: Update Metadata in New Branch

Before committing the modified skill, update the skill-index.json metadata file in the new branch.

First, use the `use_mcp_tool` tool to read the current metadata:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>read_skill_file</tool_name>
<arguments>
{
  "path": "metadata/skill-index.json"
}
</arguments>
</use_mcp_tool>
```

Then, parse the JSON and locate the entry for the skill being modified.
Update the following fields in the skill's metadata entry:

- `version`: Increment to match the new version in the skill file
- `lastModified`: Set to current ISO 8601 timestamp
- `description`: Update if the modification changed the skill's purpose

Use the `use_mcp_tool` tool to update the metadata file in the new branch:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>update_skill_metadata</tool_name>
<arguments>
{
  "content": "[COMPLETE UPDATED skill-index.json CONTENT]",
  "message": "Update metadata for modified skill: [Skill Name] v[New Version]"
}
</arguments>
</use_mcp_tool>
```

Verify the metadata was updated successfully in the new branch.

### Step 9: Commit Modified Skill to New Branch

Next, use the `use_mcp_tool` tool to write the modified skill file to the new branch:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>write_skill_file</tool_name>
<arguments>
{
  "path": "skills/frontend-css-to-tailwind-transformer.md",
  "content": "[COMPLETE MODIFIED SKILL CONTENT]",
  "message": "Modify [Skill Name]: [Brief Description]\n\n[Detailed modification description]\n\nValidation Results:\n- Guideline Compliance: [Score]/100\n- Security Review: PASSED\n- Completeness: PASSED",
  "branch": "modify-skill/frontend-css-step5-validation"
}
</arguments>
</use_mcp_tool>
```

Ensure the commit message is descriptive and includes validation summary.
Verify the file was committed successfully to the new branch.

### Step 10: Update Local Workspace Metadata

After committing to the new branch, update the metadata in the local workspace as well.

Use the `read_file` tool to read the local metadata file:

```xml
<read_file>
<args>
  <file>
    <path>metadata/skill-index.json</path>
  </file>
</args>
</read_file>
```

Parse the JSON and update the same fields as in Step 8:

- `version`: Increment to match the new version
- `lastModified`: Set to current ISO 8601 timestamp
- `description`: Update if changed

Use the `write_to_file` tool to update the local metadata:

```xml
<write_to_file>
<path>metadata/skill-index.json</path>
<content>
[COMPLETE UPDATED skill-index.json CONTENT]
</content>
<line_count>[total number of lines]</line_count>
</write_to_file>
```

Verify the local metadata was updated successfully.

### Step 11: Create Pull Request with Validation Comparison

Finally, use the `use_mcp_tool` tool to create a pull request:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>create_pull_request</tool_name>
<arguments>
{
  "title": "Modify [Skill Name]: [Brief Description]",
  "body": "[COMPLETE VALIDATION COMPARISON FROM STEP 6]\n\n## Modification Summary\n[User's modification description]\n\n## Changes Made\n- Modified: [Section name]\n- Reason: [Why this change was needed]\n\n## Review Checklist for Senior Dev\n- [ ] Modification improves or maintains skill quality\n- [ ] No policy violations introduced\n- [ ] Security guidelines followed\n- [ ] Changes are clear and well-documented\n\n## Validation Status\n✅ All validation checks passed\n✅ Ready for senior dev review",
  "head": "modify-skill/frontend-css-step5-validation",
  "base": "main",
  "repo": "skillet-skills"
}
</arguments>
</use_mcp_tool>
```

The PR body must include:

1. Complete validation comparison from Step 6
2. Modification summary explaining what and why
3. List of specific changes made
4. Review checklist for senior dev
5. Validation status and recommendation

Store the PR URL returned by the tool.
Use `attempt_completion` to present the PR URL and validation summary to the user.

---

## Outputs

- Modified skill file committed to new branch in skillet-skills repository
- Updated metadata (skill-index.json) in both new branch and local workspace
- Validation comparison report (original vs modified)
- GitHub Pull Request with validation results as description
- PR URL for senior dev review

---

## Example Usage

**User request:**

> "Bob, I want to modify the frontend-css-to-tailwind-transformer.md skill, specifically Step 5, to add validation for CSS custom properties before transformation. The step should check if custom properties exist and warn the user that they need manual handling."

**Expected workflow:**

1. Read policy files and target skill
2. Identify Step 5 in the skill file
3. Apply modification to add custom property validation
4. Validate original skill: 85/100 compliance, Security PASSED
5. Validate modified skill: 90/100 compliance, Security PASSED
6. Generate comparison showing +5 point improvement
7. Create branch: `modify-skill/frontend-css-custom-props`
8. Update metadata in new branch (version, lastModified)
9. Commit modified skill with validation summary
10. Update local workspace metadata
11. Create PR with title: "Modify Frontend CSS Transformer: Add Custom Property Validation"
12. PR includes full validation comparison and review checklist

**Expected output:**

- Branch: `modify-skill/frontend-css-custom-props`
- Metadata: Updated in both new branch and local workspace
- PR URL: `https://github.com/IvanDaHackerz/skillet-skills/pull/123`
- Validation: Original 85/100 → Modified 90/100 (Improved)
- Status: ✅ APPROVED - Ready for senior dev review

---

## Notes

- **CRITICAL**: Always read ALL policy files via MCP server to get authoritative guidelines
- Validation is mandatory - never skip validation checks
- All modifications must maintain or improve validation scores
- Security violations will automatically reject the modification
- Branch names are auto-generated but can be customized
- PR creation requires the new MCP tools (create_branch, create_pull_request)
- The validation comparison is the primary decision-making tool for senior devs

## Warnings

> ⚠️ **CRITICAL**: All skill modifications require senior dev approval before merging to main branch

> ⚠️ Modifications that decrease validation scores will be flagged in the PR for careful review

> ⚠️ Security violations (FAILED security review) will prevent PR creation - fix issues first

> ⚠️ Never skip validation steps - they ensure quality and policy compliance

> ⚠️ The MCP server must have create_branch and create_pull_request tools configured

> ⚠️ **TAMPERING PREVENTION**: Any modification that violates policy files is strictly prohibited

> ⚠️ Direct commits to main branch are not allowed - always use the PR workflow

## Related Skills

- Skill Generator
- Validate Skill
- Code Review Automation
