# Local Environment Reset

Fixes environment desynchronization issues in frontend projects by performing a complete cleanup and reinstallation of dependencies. Use this when experiencing build errors, module resolution issues, or inconsistent behavior after pulling changes. This skill removes cached files, clears the npm cache, and reinstalls all dependencies from scratch.

**Version:** 1.0.0

**Category:** frontend
**Roles:** frontend, fullstack

---

## Prerequisites

- Node.js is installed on the system
- User is in the project root directory
- Project has a `package.json` file
- User has write permissions in the project directory

---

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `project_path` | string | No | Path to the project root (defaults to current directory) |
| `confirm_deletion` | boolean | No | Whether to ask for confirmation before deleting folders (default: true) |

---

## Steps

### Step 1: Verify Project Structure

First, use the `list_files` tool to check the current directory structure.
Look for the presence of `package.json`, `.next` folder, and `node_modules` folder.
Verify that the user is in a valid Node.js project before proceeding.

### Step 2: Confirm Deletion with User

Next, use the `ask_followup_question` tool to confirm the deletion operation.
Explain that this will delete `.next` and `node_modules` folders and clear the npm cache.
Wait for user confirmation before proceeding with destructive operations.

### Step 3: Delete .next Folder

Then, use the `execute_command` tool to remove the `.next` folder if it exists.
Run the command based on the operating system:
- Windows: `if exist .next rmdir /s /q .next`
- Unix/Mac: `rm -rf .next`

This removes Next.js build cache and compiled files.

### Step 4: Delete node_modules Folder

After that, use the `execute_command` tool to remove the `node_modules` folder.
Run the command based on the operating system:
- Windows: `if exist node_modules rmdir /s /q node_modules`
- Unix/Mac: `rm -rf node_modules`

This removes all installed dependencies to ensure a clean slate.

### Step 5: Clear npm Cache

Next, use the `execute_command` tool to clear the npm cache.
Run `npm cache clean --force` to remove all cached packages.
This ensures that corrupted cached packages won't be reused during reinstallation.

### Step 6: Reinstall Dependencies

Then, use the `execute_command` tool to reinstall all dependencies.
Run `npm install` to download and install all packages from `package.json`.
Wait for the installation to complete and verify there are no errors.

### Step 7: Verify Installation

Finally, use the `execute_command` tool to verify the installation was successful.
Run `npm list --depth=0` to display the installed packages.
Check that all expected dependencies are present and there are no missing peer dependencies.

---

## Outputs

- Deleted `.next/` folder — Removes Next.js build cache
- Deleted `node_modules/` folder — Removes all installed dependencies
- Cleared npm cache — Removes cached packages
- Fresh `node_modules/` folder — Newly installed dependencies from package.json
- Updated `package-lock.json` — Regenerated lock file with current dependency tree

---

## Example Usage

**User request:**
> My Next.js app is throwing weird module errors after pulling the latest changes. Can you reset my local environment?

**Expected output:**
- `.next/` folder deleted
- `node_modules/` folder deleted
- npm cache cleared
- Dependencies reinstalled successfully
- Confirmation message: "Environment reset complete. All dependencies reinstalled."

---

## Notes

- This process may take several minutes depending on the number of dependencies
- Ensure you have a stable internet connection for downloading packages
- The `package-lock.json` file will be regenerated during `npm install`
- If using Yarn or pnpm, adjust commands accordingly (`yarn install` or `pnpm install`)
- Consider running `npm audit` after installation to check for vulnerabilities

---

## Warnings

> ⚠️ This operation will delete the `.next` and `node_modules` folders. Ensure you have committed any important changes before proceeding.

> ⚠️ If you have local modifications to files in `node_modules` (not recommended), they will be lost.

> ⚠️ This process requires an internet connection to download packages. Ensure you're connected before starting.

> ⚠️ On Windows, ensure no processes are using files in `node_modules` or `.next` folders, or deletion may fail.

---

## Related Skills

- Docker Initialize Project
- Git Commit and Push
- Frontend CSS to Tailwind Refactor