# Skill Impact Analysis

Analyzes the impact of updating or removing an existing skill by scanning for dependencies across tiers, workflows, and related skills. Use this before modifying or deprecating a skill to understand which components will be affected. Generates a formatted impact report that surfaces all dependencies, usage patterns, and potential breaking changes for voters and approvers to review before any change is committed.

**Version:** 1.0.0

**Category:** shared
**Roles:** backend, frontend, fullstack, devops, qa

---

## Prerequisites

- Access to the skillet-skills repository with all skill files
- Access to the skillet-policies repository for workflow definitions
- Read permissions for all tier configuration files
- Understanding of the skill naming convention and structure
- Git installed for repository scanning

---

## Inputs

| Name               | Type    | Required | Description                                                                              |
| ------------------ | ------- | -------- | ---------------------------------------------------------------------------------------- |
| `skill_name`       | string  | Yes      | Name of the skill to analyze (e.g., "frontend-css-to-tailwind-refactor")                 |
| `analysis_type`    | string  | Yes      | Type of analysis: "update" or "remove"                                                   |
| `include_indirect` | boolean | No       | Include indirect dependencies (skills that depend on dependent skills), defaults to true |
| `output_format`    | string  | No       | Output format: "markdown" or "json", defaults to "markdown"                              |

---

## Steps

### Step 1: Validate Skill Exists

First, use the `read_file` tool to check if the skill file exists at `skillet-skills/skills/{skill_name}.md`.
Verify the file is valid and contains the required metadata (Category, Roles).
If the skill doesn't exist, stop and inform the user that the skill cannot be found.

### Step 2: Read Skill Metadata

Next, use the `read_file` tool to extract the skill's metadata from the markdown file.
Parse the Category, Roles, and Related Skills sections to understand the skill's context.
Note any dependencies or prerequisites mentioned in the skill documentation.

### Step 3: Scan All Skills for Direct References

Then, use the `search_files` tool to search for references to the target skill across all skill files.
Search in the `skillet-skills/skills/` directory using the regex pattern containing the skill name.
Look for references in the "Related Skills" section and in step descriptions.
Record each file that references the target skill as a direct dependency.

### Step 4: Scan Workflow Definitions

After that, use the `search_files` tool to search for the skill name in workflow definitions.
Search in the `skillet-policies/` directory for any workflow or tier configuration files.
Look for skill references in automation rules, approval workflows, or tier assignments.
Document which workflows and tiers currently use this skill.

### Step 5: Analyze Skill Index

Next, use the `read_file` tool to read the `skillet-skills/metadata/skill-index.json` file.
Check if the skill is registered in the index and note its category statistics.
Identify how the skill contributes to the overall skill ecosystem metrics.

### Step 6: Identify Indirect Dependencies

Then, if `include_indirect` is true, analyze skills that depend on the direct dependents.
For each skill found in Step 3, use the `search_files` tool to find skills that reference them.
Build a dependency tree showing the cascade effect of removing or updating the skill.
This reveals the full impact scope beyond immediate dependencies.

### Step 7: Check for Breaking Changes

After that, use the `read_file` tool to compare the skill's current structure with standard format.
Identify any unique patterns, custom inputs, or outputs that dependent skills might rely on.
Flag potential breaking changes if the skill is being updated (changed inputs, removed steps, etc.).
Document compatibility concerns for each dependent skill.

### Step 8: Generate Impact Report

Finally, compile all findings into a formatted impact report using the specified output format.
Include sections for: Executive Summary, Direct Dependencies, Indirect Dependencies, Workflow Impact, Breaking Changes, and Recommendations.
Present the complete formatted Markdown report directly in the chat window for immediate review.
Ensure the report includes clear action items for voters and approvers.

---

## Outputs

- Formatted Markdown report — Comprehensive impact analysis report displayed directly in chat with all dependencies and recommendations
- Executive summary — Quick overview of impact scope (number of affected skills, workflows, and tiers)
- Dependency graph — Visual representation of the relationship tree included in the report

---

## Example Usage

**User request:**

> I need to update the "frontend-css-to-tailwind-refactor" skill to add a new input parameter. Can you analyze the impact?

**Expected output:**

- Formatted Markdown report displayed in chat showing:
  - 3 skills directly reference this skill in "Related Skills"
  - 2 workflows use this skill for frontend automation
  - 1 tier (frontend) has this skill in its recommended list
  - Breaking change warning: Adding required input will break existing workflows
  - Recommendation: Make new parameter optional or update dependent workflows first

---

## Impact Report Template

The generated report follows this structure:

```markdown
# Impact Analysis Report: {skill_name}

**Analysis Type:** {update|remove}
**Generated:** {timestamp}
**Analyzed By:** Bob

---

## Executive Summary

- **Direct Dependencies:** {count} skills
- **Indirect Dependencies:** {count} skills
- **Affected Workflows:** {count} workflows
- **Affected Tiers:** {list of tiers}
- **Risk Level:** {Low|Medium|High|Critical}

---

## Direct Dependencies

### Skills Referencing This Skill

1. **{skill-name-1}**
   - Reference Type: Related Skills section
   - Impact: {description}
   - Action Required: {action}

2. **{skill-name-2}**
   - Reference Type: Step 3 instruction
   - Impact: {description}
   - Action Required: {action}

---

## Indirect Dependencies

### Second-Level Dependencies

- **{skill-name-3}** depends on **{skill-name-1}** which depends on **{target-skill}**
  - Cascade Impact: {description}

---

## Workflow Impact

### Affected Workflows

1. **Frontend Automation Workflow**
   - Location: `skillet-policies/workflows/frontend-automation.md`
   - Usage: Triggered on CSS file changes
   - Impact: {description}
   - Mitigation: {recommendation}

---

## Breaking Changes Analysis

### Potential Breaking Changes

- ⚠️ **Input Parameter Change:** Adding required `new_param` will break existing calls
- ⚠️ **Output Format Change:** Modified output structure may break downstream consumers
- ✅ **Backward Compatible:** Step reordering does not affect external dependencies

---

## Recommendations

### For Skill Update

1. Make new parameters optional with sensible defaults
2. Update all dependent skills' documentation
3. Notify workflow owners of upcoming changes
4. Create migration guide for affected users
5. Version the skill if breaking changes are unavoidable

### For Skill Removal

1. Deprecate skill with 30-day notice period
2. Update all dependent skills to remove references
3. Provide alternative skill recommendations
4. Archive skill documentation for historical reference
5. Update skill index and category statistics

---

## Approval Checklist

- [ ] All direct dependencies identified and documented
- [ ] Workflow owners notified of changes
- [ ] Breaking changes clearly communicated
- [ ] Migration path defined for affected users
- [ ] Documentation updates planned
- [ ] Rollback plan prepared
- [ ] Testing strategy defined for dependent skills

---

## Next Steps

1. Review this report with stakeholders
2. Get approval from affected tier owners
3. Schedule change implementation
4. Update dependent skills and workflows
5. Communicate changes to all users
6. Monitor for issues post-deployment
```

---

## Notes

- Always run impact analysis before modifying or removing any skill
- The analysis is read-only and does not modify any files
- Reports are displayed directly in chat for immediate review and decision-making
- Consider running analysis periodically to maintain dependency awareness
- The formatted report can be copied and saved by users as needed
- The dependency tree can reveal unexpected relationships in complex skill ecosystems

---

## Warnings

> ⚠️ Removing a skill without impact analysis can break dependent workflows and cause system failures.

> ⚠️ High-impact skills (those with many dependencies) require extended review periods and stakeholder approval.

> ⚠️ Indirect dependencies may not be immediately obvious; always include them in the analysis.

> ⚠️ Skills referenced in automation workflows require coordination with DevOps before changes.

---

## Related Skills

- Skill Version Management
- Skill Deprecation Workflow
- Dependency Graph Visualization
- Skill Documentation Generator
