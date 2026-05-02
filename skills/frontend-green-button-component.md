# Green Button Component

## Description
Generates a reusable green button component that displays "POGI AKO" with modern styling, hover effects, and accessibility features. Works across React, Vue, and vanilla HTML/CSS implementations. Use this when you need a consistent, accessible button component with a distinctive green theme.

## Category
frontend

## Roles
frontend, fullstack

## Prerequisites
- Basic understanding of HTML, CSS, and JavaScript
- For React: React 16.8+ installed (`npm install react react-dom`)
- For Vue: Vue 3+ installed (`npm install vue`)
- For vanilla: Modern browser with ES6+ support
- Text editor or IDE

## Steps
1. Determine which framework/approach the developer wants to use (React, Vue, or vanilla HTML/CSS)
2. Create the component file with appropriate naming convention for the chosen framework
3. Implement the button structure with "POGI AKO" text content
4. Add CSS styling with green background (#10b981), proper padding, and border-radius
5. Implement hover effects with smooth transitions (darker green on hover)
6. Add ARIA attributes for accessibility (role, aria-label)
7. Include focus states for keyboard navigation
8. Add optional props/attributes for customization (disabled state, onClick handler)
9. Export the component for reuse across the application
10. Create usage example demonstrating how to import and use the component

## Inputs
- Framework choice (string, required): "react", "vue", or "vanilla"
- Component name (string, optional): Custom name for the component, defaults to "GreenButton"
- File location (string, optional): Where to create the component file, defaults to appropriate framework convention

## Outputs
- Component file: React (.jsx), Vue (.vue), or vanilla (.html + .css + .js) files
- Styled button with green background (#10b981)
- Hover effect with darker green (#059669)
- ARIA labels for accessibility
- Usage example in comments or separate file

## Example Usage

### React Example
```jsx
// GreenButton.jsx
import React from 'react';
import './GreenButton.css';

const GreenButton = ({ onClick, disabled = false, className = '' }) => {
  return (
    <button
      className={`green-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="POGI AKO button"
      type="button"
    >
      POGI AKO
    </button>
  );
};

export default GreenButton;
```

```css
/* GreenButton.css */
.green-button {
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

.green-button:hover:not(:disabled) {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.green-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.green-button:focus {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

.green-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Vue Example
```vue
<!-- GreenButton.vue -->
<template>
  <button
    class="green-button"
    @click="handleClick"
    :disabled="disabled"
    aria-label="POGI AKO button"
    type="button"
  >
    POGI AKO
  </button>
</template>

<script>
export default {
  name: 'GreenButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    }
  }
};
</script>

<style scoped>
.green-button {
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

.green-button:hover:not(:disabled) {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.green-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.green-button:focus {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

.green-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
```

### Vanilla HTML/CSS/JS Example
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Green Button Component</title>
  <link rel="stylesheet" href="green-button.css">
</head>
<body>
  <button 
    id="greenButton" 
    class="green-button" 
    aria-label="POGI AKO button"
    type="button"
  >
    POGI AKO
  </button>
  
  <script src="green-button.js"></script>
</body>
</html>
```

```css
/* green-button.css */
.green-button {
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.green-button:hover:not(:disabled) {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.green-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.green-button:focus {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

.green-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}
```

```javascript
// green-button.js
class GreenButton {
  constructor(elementId) {
    this.button = document.getElementById(elementId);
    this.init();
  }

  init() {
    if (this.button) {
      this.button.addEventListener('click', this.handleClick.bind(this));
    }
  }

  handleClick(event) {
    if (!this.button.disabled) {
      console.log('Green button clicked!');
      // Add your custom click handler logic here
    }
  }

  disable() {
    this.button.disabled = true;
  }

  enable() {
    this.button.disabled = false;
  }
}

// Initialize the button
const greenButton = new GreenButton('greenButton');
```

## Usage in Application

### React Usage
```jsx
import GreenButton from './components/GreenButton';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <GreenButton onClick={handleClick} />
      <GreenButton onClick={handleClick} disabled />
    </div>
  );
}
```

### Vue Usage
```vue
<template>
  <div>
    <GreenButton @click="handleClick" />
    <GreenButton @click="handleClick" :disabled="true" />
  </div>
</template>

<script>
import GreenButton from './components/GreenButton.vue';

export default {
  components: {
    GreenButton
  },
  methods: {
    handleClick() {
      console.log('Button clicked!');
    }
  }
};
</script>
```

## Notes
- The green color (#10b981) is from the Tailwind CSS emerald-500 palette
- Hover color (#059669) is emerald-700 for consistent design system
- Component includes smooth transitions (0.3s) for professional feel
- ARIA labels ensure screen reader compatibility
- Focus states support keyboard navigation (Tab key)
- Disabled state prevents interaction and provides visual feedback
- Box shadow adds depth and modern appearance
- Transform on hover creates subtle lift effect
- All CSS uses modern properties supported in current browsers

## Accessibility Features
- `aria-label` attribute for screen readers
- Proper focus indicators for keyboard navigation
- Disabled state prevents interaction when appropriate
- Sufficient color contrast (green on white text meets WCAG AA standards)
- Button semantic HTML element for proper role identification
- Hover and focus states are visually distinct

## Customization Options
Developers can extend the component by:
- Adding size variants (small, medium, large)
- Supporting different color themes
- Adding icon support (left or right of text)
- Implementing loading states
- Adding ripple effects on click
- Supporting full-width option
- Adding custom CSS classes for additional styling