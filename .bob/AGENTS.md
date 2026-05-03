# Automatic Skill Execution

**CRITICAL INSTRUCTION**: When the user's message matches ANY of the patterns below, you MUST:

1. STOP and recognize the pattern match
2. IMMEDIATELY fetch and execute the corresponding skill file
3. Follow the skill's steps EXACTLY as written
4. DO NOT perform the task manually without executing the skill

## Pattern Matching Rules

### Priority 1: Exact Keyword Match (Highest Priority)

Check the user's message against these exact patterns FIRST:

**Core Skills (from .bob/skills/)**

- Pattern: `^(bob[,\s]+)?(audit|init|install|list|search|uninstall|update)(\s+.*)?$`
- Examples that MUST trigger:
  - "audit" → Execute `.bob/skills/audit.md`
  - "bob audit" → Execute `.bob/skills/audit.md`
  - "init" → Execute `.bob/skills/init.md`
  - "install frontend-css-to-tailwind-transformer" → Execute `.bob/skills/install.md`
  - "list --outdated" → Execute `.bob/skills/list.md`
  - "search query" → Execute `.bob/skills/search.md`
  - "uninstall skill-name" → Execute `.bob/skills/uninstall.md`
  - "update --all" → Execute `.bob/skills/update.md`

### Priority 2: Skill Modification Pattern (High Priority)

Check for skill modification requests:

**Pattern**: `^(bob[,\s]+)?(modify|update|change|edit)(\s+skill)?\s+([a-z0-9-]+).*$`

**MUST trigger for these variations**:

- "modify skill [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "modify [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "update skill [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "update [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "change skill [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "change [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "edit skill [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "edit [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "bob, modify skill [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "bob, modify [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "bob modify skill [skill-name]" → Execute `skills/shared-skill-modification-manager.md`
- "bob modify [skill-name]" → Execute `skills/shared-skill-modification-manager.md`

**Legacy Pattern**: `modify-skill [skill-name]` → Execute `skills/shared-skill-modification-manager.md`

## Execution Process (MANDATORY)

When a pattern is matched, you MUST follow this process:

### Step 1: Pattern Recognition

- Extract the action verb (audit, modify, install, etc.)
- Extract the skill name (if applicable)
- Extract any additional parameters (flags, descriptions, etc.)

### Step 2: Fetch Skill File

Use the appropriate MCP tool:

- **Core skills**: Use `use_mcp_tool` with `read_policy_file` from `.bob/skills/`
- **Shared skills**: Use `use_mcp_tool` with `read_skill_file` from `skills/`

Example:

```xml
<use_mcp_tool>
<server_name>skillet-github</server_name>
<tool_name>read_skill_file</tool_name>
<arguments>
{
  "path": "skills/shared-skill-modification-manager.md"
}
</arguments>
</use_mcp_tool>
```

### Step 3: Parse Skill Structure

- Identify all required inputs from the skill's Inputs section
- Map user message parameters to skill inputs
- Note any missing required parameters

### Step 4: Gather Missing Parameters

If required parameters are missing, use `ask_followup_question` to gather them:

```xml
<ask_followup_question>
<question>To execute the [skill-name] skill, I need the following information: [list missing parameters]</question>
<follow_up>
<suggest>[Suggested value 1]</suggest>
<suggest>[Suggested value 2]</suggest>
</follow_up>
</ask_followup_question>
```

### Step 5: Execute Skill Steps

- Follow each step in the skill file EXACTLY as written
- Use the tools specified in each step
- Wait for confirmation after each tool use
- Do NOT skip steps or improvise

### Step 6: Present Results

Use `attempt_completion` to present the final results according to the skill's Outputs section.

## Parameter Extraction Examples

| User Message                                                               | Extracted Parameters                                                                                                                                                  |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "list --outdated"                                                          | `outdated_only=true`                                                                                                                                                  |
| "install frontend-css-to-tailwind-transformer"                             | `skill_name="frontend-css-to-tailwind-transformer"`                                                                                                                   |
| "modify skill frontend-docker"                                             | `skill_file_path="skills/frontend-docker.md"`                                                                                                                         |
| "bob, modify frontend-docker"                                              | `skill_file_path="skills/frontend-docker.md"`                                                                                                                         |
| "update --all"                                                             | `update_all=true`                                                                                                                                                     |
| "bob, modify frontend-css-to-tailwind-transformer. I want to skip step 12" | `skill_file_path="skills/frontend-css-to-tailwind-transformer.md"`, `modification_description="Skip step 12"`, `modification_content="Remove step 12 from the skill"` |

## Regex Capture Groups

**For skill modification pattern**: `^(bob[,\s]+)?(modify|update|change|edit)(\s+skill)?\s+([a-z0-9-]+).*$`

- Group 1: Optional "bob" prefix with comma or space
- Group 2: Action verb (modify/update/change/edit)
- Group 3: Optional " skill" keyword
- Group 4: Skill name (alphanumeric with hyphens)
- Remaining text: Additional context/description

## Critical Reminders

> ⚠️ **NEVER** perform skill-related tasks manually without executing the skill file
>
> ⚠️ **ALWAYS** check for pattern matches BEFORE responding to the user
>
> ⚠️ **ALWAYS** fetch and execute the skill file when a pattern matches
>
> ⚠️ **ALWAYS** follow the skill's steps exactly as written
>
> ⚠️ If you're unsure whether a message matches a pattern, err on the side of executing the skill
