# Git Commit and Push Recent Updates

## Description
Automates the process of staging, committing, and pushing recent changes to a Git repository. Analyzes modified files, generates meaningful commit messages based on changes, and safely pushes to the remote repository. Use this when you need to quickly commit and push your work with proper Git practices, including checking for conflicts and ensuring clean commits.

## Category
devops

## Roles
backend, frontend, fullstack, devops

## Prerequisites
- Git installed on the system (`git --version` to verify)
- Git repository initialized in the project (`git init` or cloned from remote)
- Remote repository configured (`git remote -v` to check)
- Git user configured (`git config user.name` and `git config user.email`)
- Proper authentication set up (SSH keys or HTTPS credentials)
- Working directory with changes to commit

## Steps
1. Check Git status to identify modified, added, and deleted files
2. Review unstaged changes to understand what will be committed
3. Stage all changes or selectively stage specific files
4. Generate a meaningful commit message based on the changes
5. Verify no merge conflicts exist
6. Create the commit with the generated or custom message
7. Check current branch name
8. Pull latest changes from remote to avoid conflicts (optional but recommended)
9. Push commits to the remote repository
10. Verify push was successful and display confirmation

## Inputs
- Commit message (string, optional): Custom commit message, if not provided will be auto-generated based on changes
- Files to stage (array of strings, optional): Specific files to commit, defaults to all modified files (git add .)
- Branch name (string, optional): Target branch to push to, defaults to current branch
- Force push (boolean, optional): Whether to force push (use with caution), defaults to false
- Skip pull (boolean, optional): Skip pulling latest changes before push, defaults to false
- Commit type (string, optional): Conventional commit type (feat, fix, docs, style, refactor, test, chore), defaults to auto-detect

## Outputs
- Git status report showing staged files
- Commit hash and message
- Push confirmation with branch and remote information
- Summary of files changed, insertions, and deletions
- Any warnings or errors encountered during the process

## Example Usage

### Basic Commit and Push (Auto-generated Message)
```bash
# Check status
$ git status
On branch main
Changes not staged for commit:
  modified:   src/app.js
  modified:   src/utils.js
  modified:   README.md

# Stage all changes
$ git add .

# Auto-generate commit message based on changes
$ git diff --cached --stat
 src/app.js   | 15 ++++++++++++---
 src/utils.js |  8 ++++++--
 README.md    |  5 ++++-
 3 files changed, 22 insertions(+), 6 deletions(-)

# Commit with generated message
$ git commit -m "feat: update app logic and utility functions

- Enhanced error handling in app.js
- Improved utility functions in utils.js
- Updated README with new features"

[main a1b2c3d] feat: update app logic and utility functions
 3 files changed, 22 insertions(+), 6 deletions(-)

# Pull latest changes
$ git pull origin main
Already up to date.

# Push to remote
$ git push origin main
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Delta compression using up to 8 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 1.23 KiB | 1.23 MiB/s, done.
Total 5 (delta 3), reused 0 (delta 0)
To github.com:username/repo.git
   z9y8x7w..a1b2c3d  main -> main

✅ Successfully pushed to origin/main
```

### Custom Commit Message
```bash
# Stage specific files
$ git add src/components/Button.jsx src/styles/button.css

# Commit with custom message
$ git commit -m "fix: resolve button styling issue in dark mode

- Fixed contrast ratio for accessibility
- Updated hover states
- Closes #123"

[main b2c3d4e] fix: resolve button styling issue in dark mode
 2 files changed, 12 insertions(+), 4 deletions(-)

# Push
$ git push origin main

✅ Successfully pushed to origin/main
```

### Commit Multiple File Types
```bash
# Check what changed
$ git status
On branch feature/new-dashboard
Changes not staged for commit:
  modified:   dashboard/src/App.jsx
  modified:   dashboard/src/components/Chart.jsx
  new file:   dashboard/src/components/DataTable.jsx
  modified:   backend/src/routes/analytics.js
  modified:   backend/package.json

# Stage all changes
$ git add .

# Commit with descriptive message
$ git commit -m "feat: add analytics dashboard with data visualization

Frontend:
- Created new Chart component with responsive design
- Added DataTable component for tabular data
- Updated App.jsx to integrate new components

Backend:
- Added analytics API endpoints
- Updated dependencies for data processing"

[feature/new-dashboard c3d4e5f] feat: add analytics dashboard
 5 files changed, 234 insertions(+), 12 deletions(-)
 create mode 100644 dashboard/src/components/DataTable.jsx

# Push to feature branch
$ git push origin feature/new-dashboard

✅ Successfully pushed to origin/feature/new-dashboard
```

## Detailed Workflow Examples

### Example 1: First-time Push to New Repository
```bash
# Initialize repository
$ git init
Initialized empty Git repository in /path/to/project/.git/

# Add remote
$ git remote add origin https://github.com/username/repo.git

# Stage all files
$ git add .

# Initial commit
$ git commit -m "chore: initial project setup

- Added project structure
- Configured build tools
- Set up dependencies"

[main (root-commit) d4e5f6g] chore: initial project setup
 25 files changed, 1523 insertions(+)

# Push to remote (set upstream)
$ git push -u origin main

✅ Successfully pushed to origin/main (upstream set)
```

### Example 2: Handling Merge Conflicts
```bash
# Try to push
$ git push origin main
To github.com:username/repo.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com:username/repo.git'

# Pull with rebase
$ git pull --rebase origin main
Auto-merging src/config.js
CONFLICT (content): Merge conflict in src/config.js

# Resolve conflicts manually, then:
$ git add src/config.js
$ git rebase --continue

# Push after resolving
$ git push origin main

✅ Successfully pushed to origin/main
```

### Example 3: Conventional Commits
```bash
# Feature addition
$ git commit -m "feat(auth): add OAuth2 authentication

- Implemented Google OAuth provider
- Added user session management
- Created auth middleware"

# Bug fix
$ git commit -m "fix(api): resolve rate limiting issue

- Fixed token bucket algorithm
- Updated rate limit headers
- Fixes #456"

# Documentation
$ git commit -m "docs: update API documentation

- Added authentication examples
- Updated endpoint descriptions
- Added troubleshooting section"

# Refactoring
$ git commit -m "refactor(database): optimize query performance

- Replaced N+1 queries with joins
- Added database indexes
- Improved connection pooling"
```

## Commit Message Templates

### Feature Addition
```
feat(scope): brief description

- Detailed change 1
- Detailed change 2
- Detailed change 3

Closes #issue-number
```

### Bug Fix
```
fix(scope): brief description of the fix

- Root cause explanation
- Solution implemented
- Testing performed

Fixes #issue-number
```

### Documentation Update
```
docs: update documentation section

- What was updated
- Why it was updated
- Additional context
```

### Refactoring
```
refactor(scope): improve code structure

- What was refactored
- Benefits of the change
- No functional changes
```

### Performance Improvement
```
perf(scope): optimize performance

- What was optimized
- Performance metrics
- Benchmark results
```

## Git Commands Reference

### Status and Inspection
- `git status` - Show working tree status
- `git diff` - Show unstaged changes
- `git diff --cached` - Show staged changes
- `git log --oneline -5` - Show recent commits

### Staging
- `git add .` - Stage all changes
- `git add <file>` - Stage specific file
- `git add -p` - Stage changes interactively
- `git reset <file>` - Unstage file

### Committing
- `git commit -m "message"` - Commit with message
- `git commit -am "message"` - Stage and commit tracked files
- `git commit --amend` - Modify last commit
- `git commit --no-verify` - Skip pre-commit hooks

### Pushing
- `git push origin <branch>` - Push to remote branch
- `git push -u origin <branch>` - Push and set upstream
- `git push --force-with-lease` - Safer force push
- `git push --tags` - Push tags to remote

### Pulling
- `git pull origin <branch>` - Fetch and merge
- `git pull --rebase origin <branch>` - Fetch and rebase
- `git fetch origin` - Fetch without merging

## Notes

### Best Practices
- Write clear, descriptive commit messages
- Use conventional commit format for consistency
- Commit logical units of work, not random changes
- Pull before pushing to avoid conflicts
- Review changes before committing (`git diff`)
- Use meaningful branch names
- Don't commit sensitive data (API keys, passwords)
- Keep commits atomic and focused

### Commit Message Guidelines
- First line: Brief summary (50 characters or less)
- Blank line after summary
- Detailed description (wrap at 72 characters)
- Use imperative mood ("add feature" not "added feature")
- Reference issue numbers when applicable
- Explain what and why, not how

### Security Considerations
- Never commit secrets or credentials
- Use `.gitignore` to exclude sensitive files
- Review staged changes before committing
- Use signed commits for verification (GPG)
- Rotate credentials if accidentally committed
- Use environment variables for sensitive config

### Performance Tips
- Commit frequently with small, logical changes
- Use `.gitignore` to exclude large binary files
- Clean up branches after merging
- Use shallow clones for large repositories
- Compress repository periodically (`git gc`)

## Common Pitfalls

### Issue: Accidentally committed sensitive data
**Solution**: 
```bash
# Remove from last commit
git reset --soft HEAD~1
git reset HEAD <sensitive-file>
git commit -c ORIG_HEAD

# Remove from history (use with caution)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch <sensitive-file>" \
  --prune-empty --tag-name-filter cat -- --all
```

### Issue: Commit message has typo
**Solution**:
```bash
# Amend last commit message
git commit --amend -m "corrected message"
```

### Issue: Forgot to add files to commit
**Solution**:
```bash
# Add forgotten files and amend
git add <forgotten-file>
git commit --amend --no-edit
```

### Issue: Need to undo last commit
**Solution**:
```bash
# Keep changes, undo commit
git reset --soft HEAD~1

# Discard changes and commit
git reset --hard HEAD~1
```

### Issue: Push rejected due to diverged branches
**Solution**:
```bash
# Pull with rebase
git pull --rebase origin main

# Or merge
git pull origin main

# Then push
git push origin main
```

## Troubleshooting

### Issue: "fatal: not a git repository"
**Solution**: Initialize Git repository with `git init` or clone from remote

### Issue: "fatal: No configured push destination"
**Solution**: Add remote with `git remote add origin <url>`

### Issue: "Permission denied (publickey)"
**Solution**: Set up SSH keys or use HTTPS with credentials

### Issue: "Your branch is behind 'origin/main'"
**Solution**: Pull latest changes with `git pull origin main`

### Issue: "refusing to merge unrelated histories"
**Solution**: Use `git pull origin main --allow-unrelated-histories`

## Related Skills
- `devops-git-branch-management`: Create and manage Git branches
- `devops-git-merge-strategy`: Handle complex merge scenarios
- `devops-github-pr-workflow`: Create and manage pull requests
- `devops-git-rebase-interactive`: Clean up commit history

## Automation Options

### Pre-commit Hooks
```bash
# .git/hooks/pre-commit
#!/bin/sh
# Run linter before commit
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed. Commit aborted."
  exit 1
fi
```

### Commit Message Validation
```bash
# .git/hooks/commit-msg
#!/bin/sh
# Validate commit message format
commit_msg=$(cat "$1")
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+"; then
  echo "Invalid commit message format"
  exit 1
fi
```

### Automated Push Script
```bash
#!/bin/bash
# auto-commit-push.sh

# Check for changes
if [[ -z $(git status -s) ]]; then
  echo "No changes to commit"
  exit 0
fi

# Stage all changes
git add .

# Generate commit message
read -p "Enter commit message: " msg

# Commit
git commit -m "$msg"

# Pull latest
git pull --rebase origin $(git branch --show-current)

# Push
git push origin $(git branch --show-current)

echo "✅ Successfully committed and pushed"
```

## Version Compatibility
- Git 2.0+
- Works with GitHub, GitLab, Bitbucket, and other Git hosting services
- Compatible with Windows, macOS, and Linux
- Supports both SSH and HTTPS authentication

## Accessibility Considerations
- Use clear, descriptive commit messages for team collaboration
- Include context in commit descriptions for future reference
- Reference issue numbers for traceability
- Use conventional commits for automated changelog generation