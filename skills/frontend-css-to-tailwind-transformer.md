# CSS to Tailwind Transformer

Transforms traditional CSS styling into Tailwind CSS utility classes while preserving design intent and responsiveness. Use this when migrating existing CSS to Tailwind, refactoring inline styles, or converting component stylesheets to utility-first approach. The transformation maintains visual consistency and follows Tailwind best practices.

**Version:** 1.0.1

**Category:** frontend
**Roles:** frontend, fullstack

---

## Prerequisites

- Tailwind CSS installed and configured in the project (`npm install -D tailwindcss`)
- `tailwind.config.js` file exists in the project root
- Understanding of the CSS file structure and component hierarchy
- Access to the HTML/JSX files that use the CSS classes

---

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `css_file_path` | string | Yes | Path to the CSS file to transform (e.g., `src/styles/components.css`) |
| `target_files` | array | No | List of HTML/JSX files that use these styles (for context) |
| `preserve_custom` | boolean | No | Whether to preserve custom CSS that can't be converted (default: `true`) |
| `responsive_breakpoints` | array | No | Breakpoints to consider: `sm`, `md`, `lg`, `xl`, `2xl` (default: all) |
| `output_format` | string | No | Output format: `inline` (utility classes) or `component` (Tailwind @apply) |

---

## Steps

### Step 1: Read and Analyze the CSS File

First, use the `read_file` tool to read the CSS file at the path provided by the user.
Identify CSS selectors, properties, media queries, pseudo-classes, and any custom properties or variables.
Note the structure: are these component styles, utility classes, or layout styles?

### Step 2: Read Related HTML/JSX Files

Next, if `target_files` are provided, use the `read_file` tool to read up to 3 related files together.
Examine how CSS classes are applied, what elements use which styles, and the component structure.
This context helps determine the best Tailwind approach and ensures class names match usage.

### Step 3: Create Tailwind Mapping Document

Then, use the `create_temporary_file` tool with `action` set to `create_editor` to create a mapping document.
List each CSS rule with its equivalent Tailwind classes side by side for user review.
Include comments explaining complex transformations or cases where custom CSS should be preserved.
Set `language` to `markdown` and `suffix` to `.md` for easy reading.

### Step 4: Wait for User Review and Approval

After that, present the mapping document to the user and ask them to review the transformations.
Use the `ask_followup_question` tool to confirm they approve the mapping or want adjustments.
If adjustments are needed, use the `create_temporary_file` tool with `action` set to `get_content` to retrieve the current mapping, then update it with `create_editor` again.

### Step 5: Transform CSS to Tailwind Classes

Next, based on the approved mapping, prepare the Tailwind class replacements.
For `inline` format, create a list of class name replacements for HTML/JSX files.
For `component` format, create new CSS using Tailwind's `@apply` directive for reusable components.

### Step 6: Validate CSS Custom Properties and Update HTML/JSX Files

First, scan the CSS file content from Step 1 for CSS custom properties (variables starting with `--`).
If custom properties are found, use the `ask_followup_question` tool to warn the user:
"CSS custom properties detected: [list property names]. These require manual handling as Tailwind doesn't directly support CSS variables in utility classes. Options: 1) Add to tailwind.config.js theme, 2) Keep in custom CSS, 3) Convert to static values."
Provide suggestions with the detected property names for each option.

Then, if `output_format` is `inline`, use the `read_file` tool to read each target file.
Use the `apply_diff` tool to replace old CSS class names with Tailwind utility classes.
Maintain proper spacing and formatting, and group related utilities logically (layout, spacing, colors, typography).
For any elements using custom properties, add a comment indicating manual review is needed.

### Step 7: Create Component CSS File (Component Format)

If `output_format` is `component`, use the `write_to_file` tool to create a new CSS file.
Use Tailwind's `@apply` directive to compose utility classes into semantic component classes.
Include the `@layer components` directive to ensure proper CSS cascade order.

### Step 8: Handle Custom CSS Preservation

Then, if `preserve_custom` is `true`, use the `write_to_file` tool to create a `custom.css` file.
Include any CSS that cannot be converted to Tailwind (complex animations, unique gradients, etc.).
Add comments explaining why each rule is preserved and reference the original CSS file.

### Step 9: Update Tailwind Configuration

Next, use the `read_file` tool to read `tailwind.config.js`.
Check if custom colors, spacing, or other design tokens need to be added to match the original CSS.
If needed, use the `apply_diff` tool to extend the Tailwind theme with custom values.

### Step 10: Clean Up and Verify

Finally, use the `create_temporary_file` tool with `action` set to `cleanup` to remove the mapping document.
Present a summary of changes: files modified, classes converted, and any custom CSS preserved.
Recommend running the build process to verify Tailwind compilation and visual testing.

---

## Outputs

- Modified HTML/JSX files with Tailwind utility classes (if `inline` format)
- `components.css` with `@apply` directives (if `component` format)
- `custom.css` with preserved custom styles (if `preserve_custom` is `true`)
- Updated `tailwind.config.js` with custom theme extensions (if needed)
- Transformation summary document listing all changes

---

## Example Usage

**User request:**
> Transform the CSS in `src/styles/button.css` to Tailwind classes. The styles are used in `src/components/Button.jsx`. Use inline format and preserve any custom animations.

**Expected output:**
- `src/components/Button.jsx` — Updated with Tailwind utility classes like `bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded`
- `src/styles/custom.css` — Contains preserved custom button animations
- `tailwind.config.js` — Extended with custom blue color shades if needed
- Transformation summary showing 15 CSS rules converted to Tailwind utilities

---

## Notes

- Tailwind uses a mobile-first approach, so start with base styles and add responsive modifiers
- Group utility classes logically: layout → spacing → sizing → colors → typography → effects
- Use Tailwind's arbitrary values `[value]` for one-off custom values that don't need theme extension
- Consider using `@apply` for frequently repeated utility combinations
- Preserve complex CSS like keyframe animations, complex gradients, or browser-specific hacks

## Warnings

> ⚠️ Always test the visual output after transformation to ensure design consistency.

> ⚠️ Some CSS features (like complex selectors or pseudo-elements) may require custom CSS preservation.

> ⚠️ Tailwind's JIT mode must be enabled for arbitrary values to work properly.

> ⚠️ Review responsive breakpoints carefully as Tailwind's defaults may differ from your original CSS.

> ⚠️ CSS custom properties (CSS variables) require special handling and cannot be directly converted to Tailwind utilities.

## Related Skills

- Tailwind Configuration Generator
- Component Library Migration
- CSS Optimization and Cleanup
