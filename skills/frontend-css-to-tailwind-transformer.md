# CSS to Tailwind Transformer

Transforms traditional CSS styling into Tailwind CSS utility classes while preserving design intent and responsiveness. Use this when migrating existing CSS to Tailwind, refactoring inline styles, or converting component stylesheets to utility-first approach. The transformation maintains visual consistency, follows Tailwind best practices, and provides intelligent handling of complex CSS patterns including animations, gradients, and custom properties.

**Version:** 1.1.2

**Category:** frontend
**Roles:** frontend, fullstack

**Changes made:**

- Removed `TRANSFORMATION_SUMMARY.md` from Outputs section (documentation step already removed in v1.1.1)
- Previous changes (v1.1.0):
  - Added `hybrid` output format option for mixing component classes and inline utilities
  - Added `optimize_classes` parameter for automatic class deduplication
  - Added `generate_variants` parameter for automatic hover/focus/active state generation
  - Enhanced Step 1 with comprehensive CSS analysis and categorization
  - Improved Step 3 mapping document with 5 detailed sections
  - Enhanced Step 6 with better CSS custom properties handling
  - Added Step 11 for optimization and deduplication of classes
  - Expanded Step 10 with detailed Tailwind configuration examples
  - Added Step 8 with proper CSS file structure using @layer directives

---

## Prerequisites

- Tailwind CSS installed and configured in the project (`npm install -D tailwindcss`)
- `tailwind.config.js` file exists in the project root
- Understanding of the CSS file structure and component hierarchy
- Access to the HTML/JSX files that use the CSS classes

---

## Inputs

| Name                     | Type    | Required | Description                                                                                         |
| ------------------------ | ------- | -------- | --------------------------------------------------------------------------------------------------- |
| `css_file_path`          | string  | Yes      | Path to the CSS file to transform (e.g., `src/styles/components.css`)                               |
| `target_files`           | array   | No       | List of HTML/JSX files that use these styles (for context)                                          |
| `preserve_custom`        | boolean | No       | Whether to preserve custom CSS that can't be converted (default: `true`)                            |
| `responsive_breakpoints` | array   | No       | Breakpoints to consider: `sm`, `md`, `lg`, `xl`, `2xl` (default: all)                               |
| `output_format`          | string  | No       | Output format: `inline` (utility classes), `component` (Tailwind @apply), or `hybrid` (mix of both) |
| `optimize_classes`       | boolean | No       | Whether to optimize and deduplicate utility classes (default: `true`)                               |
| `generate_variants`      | boolean | No       | Whether to generate hover, focus, active variants automatically (default: `true`)                   |

---

## Steps

### Step 1: Read and Analyze the CSS File

First, use the `read_file` tool to read the CSS file at the path provided by the user.
Analyze and categorize the CSS content:

- **Selectors**: Class names, IDs, element selectors, and their specificity
- **Properties**: Layout (flexbox, grid), spacing, colors, typography, effects
- **Media queries**: Responsive breakpoints and their rules
- **Pseudo-classes/elements**: `:hover`, `:focus`, `::before`, `::after`, etc.
- **Custom properties**: CSS variables (`--variable-name`)
- **Animations**: `@keyframes`, transitions, transforms
- **Complex patterns**: Gradients, shadows, filters, backdrop effects

Create a mental model of the CSS architecture to determine the best transformation strategy.

### Step 2: Read Related HTML/JSX Files

Next, if `target_files` are provided, use the `read_file` tool to read up to 3 related files together.
Examine how CSS classes are applied, what elements use which styles, and the component structure.
This context helps determine the best Tailwind approach and ensures class names match usage.

### Step 3: Create Comprehensive Tailwind Mapping Document

Then, use the `create_temporary_file` tool with `action` set to `create_editor` to create a detailed mapping document.
Structure the mapping with these sections:

1. **Direct Conversions**: CSS rules that map cleanly to Tailwind utilities
2. **Complex Patterns**: Rules requiring multiple utilities or custom handling
3. **Preserved Custom CSS**: Rules that should remain in custom CSS (animations, complex selectors)
4. **Theme Extensions**: Custom values to add to `tailwind.config.js`
5. **Optimization Opportunities**: Repeated patterns that could become components

For each mapping, include:

- Original CSS selector and properties
- Equivalent Tailwind classes with explanations
- Responsive variants if applicable
- Any caveats or manual review needed

Set `language` to `markdown` and `suffix` to `.md` for easy reading.

### Step 4: Wait for User Review and Approval

After that, present the mapping document to the user and ask them to review the transformations.
Use the `ask_followup_question` tool to confirm they approve the mapping or want adjustments.
If adjustments are needed, use the `create_temporary_file` tool with `action` set to `get_content` to retrieve the current mapping, then update it with `create_editor` again.

### Step 5: Transform CSS to Tailwind Classes

Next, based on the approved mapping, prepare the Tailwind class replacements:

**For `inline` format:**

- Create optimized utility class strings, grouping related utilities logically
- Order classes: layout → display → positioning → spacing → sizing → colors → typography → effects → transitions
- Use responsive prefixes (`sm:`, `md:`, etc.) for media queries
- Apply state variants (`hover:`, `focus:`, `active:`, `disabled:`) for pseudo-classes
- Use arbitrary values `[value]` for one-off custom values

**For `component` format:**

- Create semantic component classes using `@apply` directive
- Wrap in `@layer components` for proper cascade
- Group related utilities within each component
- Add comments documenting the component's purpose

**For `hybrid` format:**

- Use `@apply` for frequently repeated utility combinations
- Use inline utilities for one-off or variant-specific styles
- Balance between reusability and flexibility

### Step 6: Handle CSS Custom Properties and Variables

First, scan the CSS file content from Step 1 for CSS custom properties (variables starting with `--`).
If custom properties are found, analyze their usage patterns:

- **Theme values**: Colors, spacing, fonts that should be in `tailwind.config.js`
- **Component-specific**: Local variables that should remain in custom CSS
- **Dynamic values**: Runtime-changeable values that need CSS variables

Use the `ask_followup_question` tool to present options:
"CSS custom properties detected: [list property names with their values]. Recommended approach:

1. Add theme values to tailwind.config.js (colors, spacing, fonts)
2. Keep component-specific variables in custom CSS
3. Convert static values to Tailwind utilities

Which approach do you prefer?"

Provide specific suggestions showing how each property would be handled.

### Step 7: Update HTML/JSX Files with Tailwind Classes

If `output_format` is `inline` or `hybrid`, use the `read_file` tool to read each target file.
Use the `apply_diff` tool to replace old CSS class names with Tailwind utility classes:

1. **Maintain formatting**: Preserve indentation and line breaks
2. **Optimize class order**: Follow the standard utility order for consistency
3. **Add line breaks**: For long class strings, break into logical groups with line continuation
4. **Preserve functionality**: Ensure dynamic classes and conditional rendering still work
5. **Add comments**: For complex transformations, add inline comments explaining the change

For elements using custom properties, add a comment: `{/* TODO: Review CSS variable usage */}`

### Step 8: Create Component CSS File (Component/Hybrid Format)

If `output_format` is `component` or `hybrid`, use the `write_to_file` tool to create a new CSS file.
Structure the file properly:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg;
    @apply hover:bg-blue-600 focus:ring-2 focus:ring-blue-300;
    @apply transition-colors duration-200;
  }

  /* Add component documentation */
  .card {
    @apply bg-white rounded-xl shadow-lg p-6;
    @apply border border-gray-200;
  }
}

@layer utilities {
  /* Custom utilities that extend Tailwind */
  .text-balance {
    text-wrap: balance;
  }
}
```

Include comments documenting each component's purpose and usage.

### Step 9: Handle Custom CSS Preservation

If `preserve_custom` is `true`, use the `write_to_file` tool to create a `custom.css` file.
Organize preserved CSS into logical sections:

```css
/* ============================================
   Custom CSS - Preserved from [original-file.css]
   ============================================ */

/* Complex Animations */
@keyframes slideIn {
  /* Preserved: Complex keyframe animation not supported by Tailwind */
  from {
    transform: translateX(-100%) rotate(-10deg);
    opacity: 0;
  }
  to {
    transform: translateX(0) rotate(0);
    opacity: 1;
  }
}

/* Complex Gradients */
.gradient-mesh {
  /* Preserved: Multi-stop radial gradient with complex positioning */
  background:
    radial-gradient(
      circle at 20% 50%,
      rgba(120, 119, 198, 0.3),
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 119, 198, 0.3),
      transparent 50%
    );
}

/* Browser-Specific Hacks */
.scrollbar-custom {
  /* Preserved: Webkit-specific scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
}
```

Add detailed comments explaining why each rule is preserved and how it's used.

### Step 10: Update Tailwind Configuration

Use the `read_file` tool to read `tailwind.config.js`.
Analyze what custom theme extensions are needed:

1. **Colors**: Extract color values from CSS and add to theme
2. **Spacing**: Custom spacing values not in Tailwind's default scale
3. **Typography**: Custom font families, sizes, or line heights
4. **Breakpoints**: Custom responsive breakpoints from media queries
5. **Animations**: Custom animation timings or keyframes
6. **Shadows**: Custom box-shadow or text-shadow values
7. **Border radius**: Custom rounding values

Use the `apply_diff` tool to extend the theme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          500: "#0ea5e9",
          900: "#0c4a6e",
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
};
```

Add comments explaining the purpose of each custom value.

### Step 11: Optimize and Deduplicate Classes

If `optimize_classes` is `true`, analyze the transformed files for optimization opportunities:

1. **Identify repeated patterns**: Find utility combinations used 3+ times
2. **Extract to components**: Convert repeated patterns to `@apply` components
3. **Remove redundant utilities**: Eliminate conflicting or overridden classes
4. **Consolidate responsive variants**: Merge similar responsive rules

Use the `apply_diff` tool to apply optimizations to the files.

---

## Outputs

- Modified HTML/JSX files with optimized Tailwind utility classes (if `inline` or `hybrid` format)
- `components.css` with `@apply` directives and documentation (if `component` or `hybrid` format)
- `custom.css` with preserved custom styles and detailed comments (if `preserve_custom` is `true`)
- Updated `tailwind.config.js` with custom theme extensions and comments
- Optimization report showing deduplicated classes and extracted components

---

## Example Usage

### Example 1: Simple Button Transformation

**User request:**

> Transform the CSS in `src/styles/button.css` to Tailwind classes. The styles are used in `src/components/Button.jsx`. Use inline format and preserve any custom animations.

**Expected output:**

- `src/components/Button.jsx` — Updated with optimized Tailwind utilities:
  ```jsx
  <button className="
    px-4 py-2
    bg-blue-500 hover:bg-blue-600 active:bg-blue-700
    text-white font-semibold
    rounded-lg shadow-md hover:shadow-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-300
    disabled:opacity-50 disabled:cursor-not-allowed
  ">
  ```
- `src/styles/custom.css` — Contains preserved custom button animations with documentation
- `tailwind.config.js` — Extended with custom blue color shades and animation timings

### Example 2: Complex Component with Hybrid Approach

**User request:**

> Convert `src/styles/card.css` to Tailwind. The card has multiple variants and is used across 5 components. Use hybrid format to balance reusability and flexibility.

**Expected output:**

- `src/styles/components.css` — New file with component classes:
  ```css
  @layer components {
    .card-base {
      @apply bg-white rounded-xl shadow-lg p-6 border border-gray-200;
    }
    .card-hover {
      @apply hover:shadow-2xl hover:-translate-y-1 transition-all duration-300;
    }
  }
  ```
- 5 component files updated with mix of component classes and inline utilities
- `tailwind.config.js` — Extended with custom shadow and spacing values
- Optimization report showing 12 repeated patterns extracted to components

---

## Notes

- **Mobile-first approach**: Tailwind uses mobile-first responsive design, so start with base styles and add responsive modifiers (`sm:`, `md:`, etc.)
- **Class ordering**: Follow consistent order for better readability: layout → display → positioning → spacing → sizing → colors → typography → effects → transitions
- **Arbitrary values**: Use `[value]` syntax for one-off custom values (e.g., `w-[347px]`, `text-[#1a1a1a]`)
- **Component extraction**: Extract repeated utility combinations (3+ uses) to `@apply` components
- **Preserve complexity**: Keep complex CSS like keyframe animations, multi-stop gradients, complex selectors, or browser-specific hacks in custom CSS
- **Performance**: Tailwind's JIT mode generates only the classes you use, keeping bundle size minimal
- **Accessibility**: Maintain focus states, ARIA attributes, and keyboard navigation when transforming
- **Dark mode**: Consider adding dark mode variants (`dark:`) if the original CSS has theme support

## Warnings

> ⚠️ Always test the visual output after transformation to ensure design consistency.

> ⚠️ Some CSS features (like complex selectors or pseudo-elements) may require custom CSS preservation.

> ⚠️ Tailwind's JIT mode must be enabled for arbitrary values to work properly.

> ⚠️ Review responsive breakpoints carefully as Tailwind's defaults may differ from your original CSS.

> ⚠️ CSS custom properties (CSS variables) require special handling and cannot be directly converted to Tailwind utilities. Consider adding them to `tailwind.config.js` theme or keeping them in custom CSS.

> ⚠️ Long utility class strings can impact readability. Use line breaks and grouping, or extract to components for better maintainability.

> ⚠️ Tailwind's purge/content configuration must include all files using utilities to prevent accidental removal in production builds.

## Related Skills

- Tailwind Configuration Generator - Set up and customize Tailwind theme
- Component Library Migration - Migrate entire component libraries to Tailwind
- CSS Optimization and Cleanup - Remove unused CSS and optimize stylesheets
- Responsive Design Converter - Convert fixed layouts to responsive Tailwind layouts
- Dark Mode Implementation - Add dark mode support using Tailwind's dark variant
