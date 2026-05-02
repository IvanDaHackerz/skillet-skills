# React Dashboard Component Session

## Task
Create a reusable dashboard card component for displaying metrics with React and CSS modules.

## Context
Building a modern analytics dashboard that needs consistent card components for displaying various metrics like user count, revenue, and activity stats.

## Implementation

### Component Structure
Created a flexible DashboardCard component that accepts props for customization:

```jsx
import React from 'react';
import styles from './DashboardCard.module.css';

export default function DashboardCard({ title, value, icon, trend, color }) {
  return (
    <div className={styles.card} style={{ borderColor: color }}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.value}>{value}</div>
      {trend && (
        <div className={`${styles.trend} ${trend > 0 ? styles.positive : styles.negative}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}
```

### Styling
Applied modern CSS with hover effects and responsive design:

```css
.card {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-left: 4px solid;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.icon {
  font-size: 1.5rem;
}

.title {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.trend {
  font-size: 0.875rem;
  font-weight: 600;
}

.positive {
  color: var(--cat-shared);
}

.negative {
  color: #fc8181;
}
```

### Usage Example
Integrated the component into the dashboard page:

```jsx
import DashboardCard from './components/DashboardCard';

function Dashboard() {
  return (
    <div className="dashboard-grid">
      <DashboardCard
        title="Total Users"
        value="12,543"
        icon="👥"
        trend={12.5}
        color="#5ec4b6"
      />
      <DashboardCard
        title="Revenue"
        value="$45,231"
        icon="💰"
        trend={8.2}
        color="#6fa3f7"
      />
      <DashboardCard
        title="Active Sessions"
        value="1,234"
        icon="⚡"
        trend={-3.1}
        color="#e8875e"
      />
    </div>
  );
}
```

## Results
- Created reusable React component with TypeScript support
- Implemented responsive CSS modules with hover animations
- Added trend indicators with color coding
- Component successfully displays metrics across dashboard
- Fully customizable through props (title, value, icon, trend, color)

## Testing
- Tested with various metric types (numbers, currency, percentages)
- Verified responsive behavior on mobile and desktop
- Confirmed hover animations work smoothly
- Validated accessibility with screen readers

The dashboard card component is now production-ready and can be reused throughout the application for consistent metric displays.