## Automatic Skill Execution

When the user's message matches these patterns, automatically fetch and execute the corresponding skill:

### Core Skills (from `.bob/skills/`)

**Exact Keyword Patterns:**

- `^(bob\s+)?(audit|init|install|list|search|uninstall|update)(\s+.*)?$`

**Skill Mapping:**

- "audit" or "bob audit" → Execute `.bob/skills/audit.md`
- "init" or "bob init" → Execute `.bob/skills/init.md`
- "install [skill-name]" → Execute `.bob/skills/install.md`
- "list [--outdated] [--category X]" → Execute `.bob/skills/list.md`
- "search [query]" → Execute `.bob/skills/search.md`
- "uninstall [skill-name]" → Execute `.bob/skills/uninstall.md`
- "update [--all]" → Execute `.bob/skills/update.md`

### Shared Skills (from `skillet-skills/skills/`)

**Natural Language Patterns:**

- "modify skill [skill-name]" → Execute `shared-skill-modification-manager.md`
- "update skill [skill-name]" → Execute `shared-skill-modification-manager.md`
- "change skill [skill-name]" → Execute `shared-skill-modification-manager.md`
- "edit skill [skill-name]" → Execute `shared-skill-modification-manager.md`

**Exact Patterns:**

- "modify-skill [skill-name]" → Execute `shared-skill-modification-manager.md`

### Execution Process:

1. **Detect keyword** in user message
2. **Fetch skill** using appropriate MCP tool:
   - Core skills: `read_policy_file` from `.bob/skills/`
   - Shared skills: `read_skill_file` from `skillet-skills/skills/`
3. **Parse skill structure** (inputs, steps, outputs)
4. **Extract parameters** from user message
5. **Execute each step** sequentially using appropriate Bob tools
6. **Present results** to user

### Parameter Extraction Examples:

- "list --outdated" → `outdated_only=true`
- "install frontend-css-to-tailwind-transformer" → `skill_name="frontend-css-to-tailwind-transformer"`
- "modify skill frontend-docker" → `skill_file_path="skills/frontend-docker.md"`
- "update --all" → `update_all=true`
