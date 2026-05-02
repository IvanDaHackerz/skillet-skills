# Mine Session

## Description
Automatically mines a Bob session file and converts it into a reusable skill using local NLP libraries (natural, compromise, sentiment). This meta-skill activates when a developer says "mine this session" and guides them through the Skills Factory workflow to extract, analyze, and generate a skill from a completed Bob session. No API credentials required - everything runs locally!

## Category
shared

## Roles
backend, frontend, fullstack, devops, qa

## Prerequisites
- Bob session file exported to `skillet-skills/bob_sessions/` directory
- Skillet backend API running on http://localhost:3001 (with natural, compromise, sentiment packages installed)
- Skillet dashboard running on http://localhost:5173
- No external API credentials needed - uses local NLP processing

## Steps
1. Verify the session file exists in `skillet-skills/bob_sessions/` directory
2. Open the Skillet Dashboard and navigate to the Skills Factory page
3. Select the target session file from the left panel (Session Browser)
4. Click "Mine Session" to analyze the session with local NLP libraries
5. Review the NLP analysis results in the center panel (keywords, concepts, category, sentiment)
6. Examine the auto-generated skill draft in the right panel
7. Edit the skill markdown in the textarea if needed to improve quality
8. Preview the rendered skill to ensure it follows the skill format guidelines
9. Click "Approve & Save" to save the skill to `skillet-skills/skills/` directory
10. Verify the skill appears in the skill index and is accessible via the dashboard

## Inputs
- Session file path (string, required): Path to the Bob session markdown file in bob_sessions/ directory
- Manual edits (string, optional): Any manual improvements to the generated skill markdown

## Outputs
- skills/{category}-{keyword}.md: Complete skill markdown file following the standard format
- metadata/skill-index.json: Updated skill index with the new skill entry

## Example Usage
User: "Mine this session from bob_sessions/api-endpoint-creation-2026-05-02.md"

Expected Output:
1. Session analyzed with local NLP (TF-IDF, compromise, sentiment analysis)
2. Skill category determined (e.g., "backend")
3. Keywords and concepts extracted
4. Complete skill markdown generated
5. Skill saved to skills/backend-api-endpoint-creation.md
6. Skill index updated with new entry

## Notes
- The Skills Factory uses free, open-source NLP libraries that run locally
- **natural**: TF-IDF algorithm for keyword extraction
- **compromise**: Natural language understanding for concept extraction
- **sentiment**: Sentiment analysis to filter low-quality sessions
- Sessions with negative sentiment or low signal are automatically skipped
- The skill generator extracts code blocks and maps them to appropriate steps
- All generated skills should be reviewed and edited before approval
- The filename is automatically sanitized to only include [a-z0-9-_.]
- Path traversal attempts (..) are rejected for security
- No internet connection required for NLP analysis - everything is local!

## Warnings
- Review generated skills carefully - AI analysis may miss context or nuances
- Do not approve skills with hardcoded credentials or sensitive information
- Generated skills are starting points and may need manual refinement
- Large session files may take longer to analyze
- The local NLP libraries work best with English text

## Related Skills
- devops-git-commit-push.md: For committing the new skill to version control
- Any skill that involves code generation or automation

## Technical Details

### NLP Libraries Used
1. **natural** - TF-IDF (Term Frequency-Inverse Document Frequency) for keyword extraction
2. **compromise** - Lightweight NLP for concept and topic extraction
3. **sentiment** - AFINN-based sentiment analysis

### How It Works
1. **Keyword Extraction**: Uses TF-IDF to identify the most important terms in the session
2. **Concept Extraction**: Uses compromise to find topics, technical terms, and noun phrases
3. **Categorization**: Pattern matching on keywords to determine skill category
4. **Sentiment Analysis**: Filters out negative or low-quality sessions
5. **Skill Generation**: Combines all analysis results into a structured markdown file

### Advantages of Local NLP
- ✅ No API credentials needed
- ✅ No internet connection required
- ✅ No usage limits or costs
- ✅ Fast processing (runs locally)
- ✅ Privacy-friendly (data never leaves your machine)
- ✅ Works offline