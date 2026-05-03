# CSS to Tailwind Transformer

Transforms traditional CSS styling into Tailwind CSS utility classes while preserving design intent, responsiveness, custom properties, and animations. Use this when migrating existing CSS to Tailwind or converting design specifications into Tailwind-based implementations. The transformation maintains all visual effects including media queries, CSS variables, keyframe animations, and complex selectors.

**Version:** 1.0.0

**Category:** frontend
**Roles:** frontend, fullstack

---

## Prerequisites

- Tailwind CSS installed and configured in the project (`npm install -D tailwindcss`)
- `tailwind.config.js` file exists in the project root
- Understanding of the CSS file structure and selectors being transformed
- Access to the HTML/JSX files that use the CSS classes

---

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `css_file_path` | string | Yes | Path to the CSS file to transform (e.g., `src/styles/components.css`) |
| `target_framework` | string | No | Target framework: `react`, `vue`, `html`, or `svelte` (default: `react`) |
| `preserve_custom_properties` | boolean | No | Whether to keep CSS variables in a separate file (default: `true`) |
| `output_format` | string | No | Output format: `inline` (utility classes) or `component` (Tailwind @apply) (default: `inline`) |
| `include_responsive` | boolean | No | Whether to transform media queries to responsive utilities (default: `true`) |

---

## Steps

### Step 1: Read and Analyze the CSS File

First, use the `read_file` tool to read the CSS file at the path provided by the user.
Analyze the CSS structure to identify: class selectors, media queries, CSS custom properties (variables), keyframe animations, pseudo-classes, and complex selectors.
Note any naming patterns and organization structure used in the original CSS.

### Step 2: Read Tailwind Configuration

Next, use the `read_file` tool to read the `tailwind.config.js` file.
Examine the theme configuration to understand custom colors, spacing, breakpoints, and extended utilities.
Check if custom plugins are configured that might affect the transformation.
This ensures the transformation uses project-specific Tailwind settings.

### Step 3: Extract and Map CSS Custom Properties

Then, identify all CSS custom properties (variables) in the format `--variable-name`.
For each custom property, determine if it maps to a Tailwind theme value or needs to be preserved.
If `preserve_custom_properties` is true, create a mapping of variables to Tailwind theme extensions.
Use the `write_to_file` tool to create `src/styles/custom-properties.css` with preserved variables if needed.

### Step 4: Transform Basic Styles to Tailwind Utilities

After that, convert standard CSS properties to their Tailwind utility class equivalents.
Map common properties: `display`, `position`, `margin`, `padding`, `width`, `height`, `color`, `background`, `border`, `font-size`, `font-weight`, `text-align`, `flex`, `grid`.
For example, transform `margin: 1rem` to `m-4`, `display: flex` to `flex`, `color: #3b82f6` to `text-blue-500`.
Handle shorthand properties by breaking them into individual Tailwind utilities.

### Step 5: Convert Responsive Breakpoints

Next, transform media queries to Tailwind's responsive prefixes.
Map `@media (min-width: 640px)` to `sm:`, `@media (min-width: 768px)` to `md:`, `@media (min-width: 1024px)` to `lg:`, `@media (min-width: 1280px)` to `xl:`, `@media (min-width: 1536px)` to `2xl:`.
Apply responsive prefixes to the transformed utility classes within each media query.
Ensure mobile-first approach is maintained as per Tailwind conventions.

### Step 6: Handle Animations and Transitions

Then, identify `@keyframes` definitions and transform them to Tailwind animation utilities.
For standard animations (fade, slide, spin, bounce), use built-in Tailwind animations.
For custom animations, use the `apply_diff` tool to extend the Tailwind config with custom keyframes.
Transform `transition` properties to Tailwind transition utilities like `transition-all`, `duration-300`, `ease-in-out`.

### Step 7: Process Pseudo-Classes and States

After that, convert pseudo-classes to Tailwind state variants.
Transform `:hover` to `hover:`, `:focus` to `focus:`, `:active` to `active:`, `:disabled` to `disabled:`, `:first-child` to `first:`, `:last-child` to `last:`.
Combine state variants with responsive variants when needed (e.g., `md:hover:bg-blue-600`).
Ensure proper ordering of variants according to Tailwind conventions.

### Step 8: Generate Output Based on Format

Next, based on the `output_format` parameter, generate the appropriate output.
For `inline` format, create a mapping document showing original CSS classes and their Tailwind utility class replacements.
For `component` format, use the `write_to_file` tool to create component CSS files using `@apply` directives.
Include comments explaining complex transformations and any manual adjustments needed.

### Step 9: Update HTML/JSX Files

Then, use the `search_files` tool to find all files that reference the original CSS classes.
For each file found, use the `apply_diff` tool to replace old class names with the new Tailwind utility classes.
Ensure proper spacing and formatting of the utility class strings.
Verify that dynamic class names are handled correctly (e.g., template literals in React).

### Step 10: Verify and Document Changes

Finally, use the `write_to_file` tool to create a transformation report at `docs/css-to-tailwind-migration.md`.
Document all transformations made, including: original CSS classes mapped to Tailwind utilities, custom properties preserved or transformed, animations converted, any manual adjustments required.
Include before/after examples for complex transformations.
List any CSS features that couldn't be directly transformed and require custom Tailwind extensions.

---

## Outputs

- `src/styles/custom-properties.css` — Preserved CSS custom properties if `preserve_custom_properties` is true
- `docs/css-to-tailwind-migration.md` — Comprehensive transformation report with mappings and examples
- Updated HTML/JSX files with Tailwind utility classes replacing original CSS classes
- Updated `tailwind.config.js` with custom animations and theme extensions if needed

---

## Example Usage

**User request:**
> Transform the CSS file at `src/styles/dashboard.css` to Tailwind utility classes. The file contains responsive layouts, custom color variables, and fade-in animations. Target framework is React.

**Expected output:**
- `src/styles/custom-properties.css` — CSS variables for custom colors preserved
- `docs/css-to-tailwind-migration.md` — Report showing:
  - `.dashboard-container { display: flex; padding: 2rem; }` → `flex p-8`
  - `@media (min-width: 768px) { .dashboard-container { padding: 3rem; } }` → `md:p-12`
  - `.fade-in` animation → `animate-fade-in` with custom keyframe in config
- Updated React components with Tailwind classes: `<div className="flex p-8 md:p-12 animate-fade-in">`
- `tailwind.config.js` extended with custom fade-in animation

---

## Notes

- Tailwind uses a mobile-first approach, so base styles apply to all screen sizes and responsive variants override them
- Some complex CSS selectors (e.g., `:nth-child(3n+1)`) may require custom CSS or Tailwind plugins
- CSS Grid layouts can be transformed to Tailwind grid utilities, but complex grid-template-areas may need custom CSS
- Preserve important visual effects by testing the transformed output in a browser
- Use Tailwind's arbitrary values (e.g., `w-[347px]`) for exact pixel values that don't match the spacing scale
- Consider using Tailwind's `@layer components` for frequently repeated utility combinations

## Warnings

> ⚠️ Complex CSS selectors like `:has()`, `:where()`, or advanced pseudo-elements may not have direct Tailwind equivalents and require custom CSS.

> ⚠️ CSS specificity works differently with utility classes. Test thoroughly to ensure styles are applied correctly, especially with third-party component libraries.

> ⚠️ Animations with multiple keyframe steps may need custom Tailwind configuration. Review the generated config carefully.

> ⚠️ CSS custom properties used in calc() functions may need special handling. Verify mathematical operations work correctly after transformation.

> ⚠️ Always backup the original CSS file before transformation. Keep it for reference during testing and debugging.

## Related Skills

- Frontend Trend Analysis and Implementation
- React Component Generator
- Responsive Design Implementation