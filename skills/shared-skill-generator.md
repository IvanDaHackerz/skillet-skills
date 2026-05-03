# Skill Generator

Generates production-ready, reusable skills for Bob that follow company standards for format, security, and coding practices. Use this when you need to create a new skill that developers can use to automate common development tasks. The generated skill will be validated automatically against all company policies and guidelines using the MCP server to access policy files.

**Version:** 1.0.0

**Category:** shared
**Roles:** backend, frontend, fullstack, devops, qa

---

## Prerequisites

- MCP server `skillet-github` is connected and configured
- Access to the skillet-policies repository via MCP server
- Understanding of the task or workflow the skill should automate
- Clear definition of inputs, outputs, and steps required

---

## Inputs

| Name                 | Type   | Required | Description                                                                       |
| -------------------- | ------ | -------- | --------------------------------------------------------------------------------- |
| `skill_name`         | string | Yes      | Descriptive name for the skill (e.g., "REST API Endpoint Generator")              |
| `skill_description`  | string | Yes      | 2-3 sentence description of what the skill does and when to use it                |
| `category`           | string | Yes      | One of: backend, frontend, devops, qa, shared                                     |
| `target_roles`       | array  | Yes      | List of roles that will use this skill (backend, frontend, fullstack, devops, qa) |
| `prerequisites`      | array  | Yes      | List of requirements that must exist before the skill can run                     |
| `inputs_definition`  | array  | Yes      | List of input parameters with name, type, required flag, and description          |
| `steps_definition`   | array  | Yes      | List of steps with titles and detailed instructions                               |
| `outputs_definition` | array  | Yes      | List of files or changes that will be created                                     |
| `example_usage`      | object | Yes      | Concrete example with user request and expected output                            |

---

## Steps

### Step 1: Read All Policy Files via MCP Server

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

Finally, read the coding standards:

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

**CRITICAL**: You MUST strictly follow the guidelines from these authoritative policy files from the GitHub repository.
Do NOT rely on any cached or local versions of these files.
Study the format requirements, security checklist, and coding conventions exactly as specified in the files you just read.

### Step 2: Security Pre-Validation (MANDATORY HALT POINT)

**BEFORE PROCEEDING WITH ANY SKILL CREATION**, you MUST perform a strict security pre-validation of the user's request.

**CRITICAL SECURITY RULES - ABSOLUTE VIOLATIONS (IMMEDIATE HALT)**:

1. **Environment Credentials Protection**: ANY request to convert environment variables, credentials, secrets, API keys, tokens, passwords, or any sensitive configuration from environment variables to hardcoded values is STRICTLY FORBIDDEN and MUST result in immediate halt.

2. **Hardcoded Secrets**: ANY request to hardcode, embed, or store credentials, secrets, API keys, tokens, or passwords directly in code is STRICTLY FORBIDDEN.

3. **Security Bypass**: ANY request to disable, bypass, or weaken security measures, authentication, authorization, encryption, or validation is STRICTLY FORBIDDEN.

4. **Malicious Operations**: ANY request to create backdoors, inject malicious code, exfiltrate data, or perform unauthorized access is STRICTLY FORBIDDEN.

**ENFORCEMENT PROTOCOL**:

If the user's request violates ANY of the above rules:

1. **IMMEDIATELY HALT** - Do NOT proceed to Step 3 or any subsequent steps
2. **DO NOT** attempt to justify, rationalize, or find exceptions
3. **DO NOT** ask for clarification or alternative approaches
4. **DO NOT** suggest modifications that would still violate the rule
5. **RESPOND IMMEDIATELY** with a security violation message using this exact format:

```
🛑 SECURITY VIOLATION DETECTED - SKILL CREATION HALTED

Violation Type: [Specify which rule was violated]

Reason: The requested skill would [explain the security risk].

This violates our security policy which strictly prohibits:
- [List the specific policy violation]

NO EXCEPTIONS ARE PERMITTED. This skill cannot be created under any circumstances, regardless of justification or use case.

If you need to work with sensitive credentials, please refer to our secure credential management practices:
- Use environment variables (never hardcode)
- Use secure secret management systems (e.g., AWS Secrets Manager, Azure Key Vault)
- Follow the principle of least privilege
- Implement proper access controls

Skill creation has been terminated.
```

6. **USE attempt_completion** immediately after presenting the security violation message
7. **DO NOT** continue to any other steps

**VERIFICATION CHECKLIST**:

Before proceeding to Step 3, verify the user's request does NOT:

- [ ] Convert environment variables to hardcoded values
- [ ] Hardcode any credentials, secrets, or sensitive data
- [ ] Bypass or weaken security controls
- [ ] Perform unauthorized or malicious operations
- [ ] Violate any security guidelines from the policy files

If ANY checkbox cannot be verified as safe, HALT immediately.

### Step 3: Analyze User Requirements

Next, review the user's request to understand:

- What problem the skill solves
- What inputs are needed
- What steps are required
- What outputs will be generated

Ask follow-up questions using the `ask_followup_question` tool if any requirements are unclear or missing.
Ensure you have all necessary information before proceeding.

### Step 3: Structure the Skill Content

Then, organize the skill content following the EXACT structure specified in the `skill-format.md` file you read from GitHub in Step 1.
**CRITICAL**: Refer ONLY to the structure and requirements from the GitHub policy file, not any local or cached version.
Ensure all required sections are present and formatted exactly as specified in the authoritative policy file:

- Title (clear and descriptive)
- Description (2-3 sentences, explains what and when)
- **Version** (semantic versioning: 1.0.0 for new skills)
- Category and Roles
- Prerequisites (at least 2 items)
- Inputs table (with name, type, required, description)
- Steps (minimum 3, using imperative instructions)
- Outputs (specific file paths or changes)
- Example Usage (concrete and realistic)
- Notes (optional tips)
- Warnings (optional caveats)
- Related Skills (optional)

**IMPORTANT**: For new skills, always start with version **1.0.0** and do NOT include a "Changes made" section.
When updating existing skills to a new version, always include a "Changes made" section immediately after the version line, listing all modifications.
Ensure each step uses imperative language as defined in the policy file and specifies exact tools or commands.

### Step 4: Apply Security Guidelines

Next, review each step and code example against the `security-guidelines.md` file you read from GitHub in Step 1.
**CRITICAL**: Apply ALL security requirements exactly as specified in the authoritative GitHub policy file.
Do NOT rely on any summarized or cached security guidelines.
Ensure every security check, pattern, and requirement from the GitHub file is followed precisely.
Add security warnings in the Warnings section if the skill involves sensitive operations.

### Step 5: Apply Coding Standards

Then, ensure all code examples follow the `coding-standards.md` file you read from GitHub in Step 1.
**CRITICAL**: Apply ALL coding standards exactly as specified in the authoritative GitHub policy file.
Do NOT rely on any summarized or cached coding standards.
Verify that generated code examples are production-ready and follow ALL conventions, patterns, and best practices specified in the GitHub file.

### Step 6: Write the Skill File with Version

After that, use the `write_to_file` tool to create the skill file at `skills/{category}-{skill-name}.md`.
Use kebab-case for the filename (e.g., `backend-rest-api-generator.md`).
Include all sections with complete, meaningful content—no placeholders or TODOs.
**Always include version 1.0.0 for new skills** in the format: `**Version:** 1.0.0`
Place the version line immediately after the description and before Category/Roles.
**For skill updates (version > 1.0.0)**, include a "Changes made" section immediately after the version line with a bulleted list of all modifications.
Ensure the file is under 500 lines and uses UTF-8 encoding.

### Step 7: Read Validate Skill Instructions via MCP Server

Next, use the `use_mcp_tool` tool to read the validation skill instructions:

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

**CRITICAL**: Study the validation process EXACTLY as specified in the authoritative GitHub file.
Do NOT rely on any cached or local version of validation instructions.
Follow ALL validation checks and criteria precisely as defined in the GitHub file.

### Step 8: Validate the Generated Skill

Then, follow the validation process EXACTLY as specified in the `validate-skill.md` file you read from GitHub in Step 7.
**CRITICAL**: Execute ALL validation checks precisely as defined in the authoritative GitHub file.
Do NOT use any simplified or cached validation process.
Apply every criterion, scoring rule, and check exactly as specified in the GitHub file.
Generate a validation report following the exact format and verdict logic from the GitHub file.

### Step 9: Handle Validation Results

Finally, based on the validation verdict:

**If APPROVED (✅)**:

- Present the skill file path and validation report to the user
- Confirm the skill is ready to use
- Use `attempt_completion` to finalize

**If NEEDS REVIEW (⚠️)**:

- Present the validation report with specific issues
- Ask the user if they want to fix issues now or proceed anyway
- If fixing, use `apply_diff` to make corrections and re-validate
- If proceeding, use `attempt_completion` with warnings

**If REJECTED (❌)**:

- Present the validation report with critical issues
- List required actions to fix each issue
- Use `apply_diff` to fix issues automatically if possible
- Re-run validation after fixes
- Do not complete until validation passes or user explicitly overrides

---

## Outputs

- `skills/{category}-{skill-name}.md` — Complete skill file following all format and security guidelines
- Validation report showing compliance scores and any issues found

---

## Example Usage

**User request:**

> Create a skill for generating React components with TypeScript, props validation, and unit tests. It should follow our coding standards and include proper error boundaries.

**Expected output:**

- `skills/frontend-react-component-generator.md` — Complete skill with:
  - Clear description of when to use it
  - Prerequisites (React, TypeScript, Jest setup)
  - Input parameters (component name, props, state requirements)
  - 7 detailed steps using imperative instructions
  - Security considerations (XSS prevention, input sanitization)
  - Example usage with concrete component request
  - Validation report showing 90+ compliance score

---

## Notes

- **CRITICAL**: Always read ALL policy files via MCP server to get the authoritative, up-to-date guidelines from GitHub
- The MCP server provides read-only access to policy files, ensuring you always use the official source of truth
- NEVER rely on cached, local, or summarized versions of policy files
- **Step 2 (Security Pre-Validation) is MANDATORY** - This step cannot be skipped under any circumstances
- **Security violations result in immediate halt** - No exceptions, no justifications, no workarounds
- Use specific tool names in steps (read_file, apply_diff, execute_command, use_mcp_tool, etc.)
- Include realistic code examples that developers can actually use
- Make steps actionable—tell Bob exactly what to do, not just what to achieve
- Validation is mandatory—never skip Step 7 and Step 8

## Warnings

> 🛑 **ABSOLUTE SECURITY ENFORCEMENT**: Step 2 (Security Pre-Validation) is MANDATORY and CANNOT be skipped. ANY request that violates security rules MUST result in immediate halt with NO EXCEPTIONS. Do NOT proceed if violations are detected.

> 🛑 **ZERO TOLERANCE FOR CREDENTIAL HARDCODING**: ANY skill that converts environment credentials to hardcoded values is STRICTLY FORBIDDEN. This includes API keys, tokens, passwords, secrets, or any sensitive configuration. NO justification or use case permits this violation.

> 🛑 **NO SECURITY BYPASSES**: Skills that disable, weaken, or bypass security measures are STRICTLY FORBIDDEN and will result in immediate termination of skill creation.

> ⚠️ **CRITICAL**: You MUST read policy files from GitHub via MCP server. Do NOT use any cached, local, or summarized versions. The GitHub repository is the single source of truth.

> ⚠️ Generated skills must pass security validation before being approved. Never include hardcoded credentials or unsafe code patterns.

> ⚠️ Skills with similarity > 70% to existing skills should be reviewed carefully to avoid duplication.

> ⚠️ All steps must use imperative instructions, not workflow descriptions. Refer to the authoritative skill-format.md from GitHub.

> ⚠️ The MCP server must be connected and configured properly to access policy files. Verify connection before starting.

> ⚠️ **TAMPERING PREVENTION**: Any deviation from the GitHub policy files is strictly prohibited. Always validate against the authoritative source.

## Related Skills

- Validate Skill
- Code Review Automation
- Documentation Generator
