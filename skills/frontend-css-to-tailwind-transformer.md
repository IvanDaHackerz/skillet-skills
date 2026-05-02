# CSS to Tailwind Refactor

## Description
Automatically refactors traditional CSS styles into Tailwind CSS utility classes. Analyzes existing CSS files, identifies patterns, and converts them to equivalent Tailwind utilities while preserving functionality. Use this when migrating legacy projects to Tailwind or modernizing component styling with utility-first CSS.

## Category
frontend

## Roles
frontend, fullstack

## Prerequisites
- Tailwind CSS installed in the project (`npm install -D tailwindcss`)
- Tailwind configuration file (`tailwind.config.js`) exists
- Basic understanding of CSS and Tailwind utility classes
- Node.js and npm installed
- Text editor or IDE with file access

## Steps
1. Analyze the target CSS file(s) to identify all style rules and selectors
2. Parse CSS properties and values (colors, spacing, typography, layout, etc.)
3. Map each CSS property to equivalent Tailwind utility classes
4. Handle complex selectors (pseudo-classes, media queries, animations)
5. Convert color values to Tailwind color palette or custom colors
6. Transform spacing values (margin, padding) to Tailwind spacing scale
7. Convert responsive breakpoints to Tailwind responsive utilities
8. Replace hover/focus states with Tailwind state variants
9. Apply utility classes to HTML elements, removing inline styles
10. Create custom Tailwind classes in config for non-standard values
11. Remove or comment out the original CSS file
12. Verify visual consistency between old CSS and new Tailwind classes

## Inputs
- CSS file path (string, required): Path to the CSS file to refactor (e.g., "styles.css", "component.module.css")
- HTML/JSX file path (string, required): Path to the corresponding HTML or component file
- Preserve custom properties (boolean, optional): Keep CSS custom properties (variables) instead of converting, defaults to false
- Output format (string, optional): "inline" (apply classes directly) or "extract" (create component classes), defaults to "inline"
- Tailwind config path (string, optional): Path to tailwind.config.js, defaults to "./tailwind.config.js"

## Outputs
- Updated HTML/JSX file with Tailwind utility classes applied
- Modified or removed CSS file (commented out or deleted based on preference)
- Updated tailwind.config.js with custom colors, spacing, or utilities if needed
- Refactor report showing conversion statistics and any manual review items
- Backup of original files with .backup extension

## Example Usage

### Input CSS File (styles.css)
```css
.button {
  background-color: #10b981;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button:hover {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}

.card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .card {
    padding: 16px;
    max-width: 100%;
  }
}
```

### Input HTML File (index.html)
```html
<div class="card">
  <h2>Welcome</h2>
  <p>This is a card component</p>
  <button class="button">Click Me</button>
  <button class="button" disabled>Disabled</button>
</div>
```

### Output HTML File (index.html) - After Refactoring
```html
<div class="bg-white rounded-xl p-6 shadow-sm max-w-md mx-auto md:p-4 md:max-w-full">
  <h2>Welcome</h2>
  <p>This is a card component</p>
  <button class="bg-emerald-500 text-white px-6 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 shadow-sm hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-md">
    Click Me
  </button>
  <button class="bg-emerald-500 text-white px-6 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60" disabled>
    Disabled
  </button>
</div>
```

### Refactor Report
```
CSS to Tailwind Refactor Report
================================

File: styles.css → index.html
Total CSS Rules: 4
Successfully Converted: 4
Manual Review Required: 0

Conversion Details:
-------------------
✅ .button → Tailwind utilities (bg-emerald-500, px-6, py-3, etc.)
✅ .button:hover → hover: variants
✅ .button:disabled → disabled: variants
✅ .card → Tailwind utilities with responsive variants
✅ @media queries → md: responsive prefix

Custom Values Added to tailwind.config.js:
------------------------------------------
None (all values matched existing Tailwind scale)

Backup Created:
---------------
✅ styles.css.backup
✅ index.html.backup
```

## Detailed Conversion Examples

### Example 1: React Component with CSS Module

**Before (Button.module.css):**
```css
.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: transform 0.2s;
}

.primary:hover {
  transform: scale(1.05);
}
```

**Before (Button.jsx):**
```jsx
import styles from './Button.module.css';

const Button = ({ children }) => {
  return <button className={styles.primary}>{children}</button>;
};
```

**After (Button.jsx):**
```jsx
const Button = ({ children }) => {
  return (
    <button className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-transform duration-200 hover:scale-105">
      {children}
    </button>
  );
};
```

### Example 2: Complex Layout with Flexbox

**Before (layout.css):**
```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 2rem;
  gap: 1rem;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
    padding: 4rem;
  }
}
```

**After (HTML):**
```html
<div class="flex flex-col items-center justify-between min-h-screen p-8 gap-4 md:flex-row md:p-16">
  <!-- Content -->
</div>
```

### Example 3: Custom Colors and Spacing

**Before (custom.css):**
```css
.brand-card {
  background-color: #ff6b6b;
  padding: 18px;
  margin-bottom: 20px;
  border-radius: 6px;
}
```

**After (tailwind.config.js):**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#ff6b6b',
        },
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
};
```

**After (HTML):**
```html
<div class="bg-brand-red p-18 mb-5 rounded-md">
  <!-- Content -->
</div>
```

## CSS Property to Tailwind Mapping

### Layout
- `display: flex` → `flex`
- `display: grid` → `grid`
- `display: block` → `block`
- `display: inline-block` → `inline-block`
- `position: relative` → `relative`
- `position: absolute` → `absolute`
- `position: fixed` → `fixed`
- `position: sticky` → `sticky`

### Spacing
- `padding: 16px` → `p-4`
- `padding: 8px 16px` → `py-2 px-4`
- `margin: 16px` → `m-4`
- `margin: 0 auto` → `mx-auto`
- `gap: 16px` → `gap-4`

### Typography
- `font-size: 16px` → `text-base`
- `font-weight: 600` → `font-semibold`
- `font-weight: 700` → `font-bold`
- `text-align: center` → `text-center`
- `line-height: 1.5` → `leading-normal`

### Colors
- `color: #000000` → `text-black`
- `background-color: #ffffff` → `bg-white`
- `border-color: #e5e7eb` → `border-gray-200`

### Borders
- `border-radius: 8px` → `rounded-lg`
- `border: 1px solid #e5e7eb` → `border border-gray-200`
- `border-width: 2px` → `border-2`

### Effects
- `box-shadow: 0 1px 3px rgba(0,0,0,0.1)` → `shadow-sm`
- `opacity: 0.5` → `opacity-50`
- `transition: all 0.3s` → `transition-all duration-300`

### Responsive Breakpoints
- `@media (min-width: 640px)` → `sm:`
- `@media (min-width: 768px)` → `md:`
- `@media (min-width: 1024px)` → `lg:`
- `@media (min-width: 1280px)` → `xl:`
- `@media (min-width: 1536px)` → `2xl:`

### State Variants
- `:hover` → `hover:`
- `:focus` → `focus:`
- `:active` → `active:`
- `:disabled` → `disabled:`
- `:first-child` → `first:`
- `:last-child` → `last:`

## Notes

### Best Practices
- Always create backups before refactoring
- Test visual consistency after conversion
- Use browser DevTools to compare before/after
- Consider extracting repeated utility combinations into components
- Use `@apply` directive in CSS for complex repeated patterns
- Leverage Tailwind's JIT mode for custom values

### Performance Considerations
- Tailwind's JIT compiler only includes used utilities
- Purge unused CSS in production builds
- Consider code splitting for large applications
- Use component extraction for repeated patterns

### Common Pitfalls
- Not all CSS can be directly converted (complex animations, keyframes)
- Custom CSS properties may need manual handling
- Browser-specific prefixes require attention
- Z-index values may need custom configuration

### When NOT to Use This Skill
- Projects with minimal CSS (not worth the migration effort)
- CSS-in-JS solutions (styled-components, emotion) - different approach needed
- Complex animations requiring @keyframes (keep in separate CSS file)
- Third-party component libraries with their own styling system

## Manual Review Items

After automatic refactoring, manually review:
1. **Complex animations**: Convert @keyframes to Tailwind's animation utilities or keep in CSS
2. **CSS Grid templates**: May require custom grid-template-columns/rows
3. **Custom fonts**: Ensure font-family is configured in Tailwind config
4. **Calc() functions**: May need custom spacing values
5. **CSS variables**: Decide whether to convert to Tailwind theme or keep as CSS custom properties
6. **Print styles**: Keep @media print rules in separate CSS file
7. **Browser hacks**: Review if still needed with modern Tailwind

## Troubleshooting

### Issue: Colors don't match exactly
**Solution**: Add custom colors to `tailwind.config.js` theme.extend.colors

### Issue: Spacing values not available
**Solution**: Add custom spacing to `tailwind.config.js` theme.extend.spacing

### Issue: Complex selectors not converting
**Solution**: Use `@apply` directive or keep as custom CSS

### Issue: Animations not working
**Solution**: Define custom animations in Tailwind config or use separate CSS file

### Issue: Pseudo-elements (::before, ::after) not converting
**Solution**: Use Tailwind's `before:` and `after:` variants with content utilities

## Related Skills
- `frontend-tailwind-component-library`: Create reusable Tailwind components
- `frontend-responsive-design`: Implement responsive layouts with Tailwind
- `frontend-dark-mode-setup`: Add dark mode support with Tailwind

## Accessibility Considerations
- Ensure color contrast ratios meet WCAG standards after conversion
- Maintain focus indicators (use `focus:` variants)
- Preserve screen reader text and ARIA attributes
- Test keyboard navigation after refactoring

## Version Compatibility
- Tailwind CSS v3.0+
- Works with React, Vue, Angular, and vanilla HTML
- Compatible with Next.js, Vite, and other build tools