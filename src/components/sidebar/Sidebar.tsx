import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Sidebar.module.css';

/**
 * Individual sidebar item.
 * - `label`: item text.
 * - `icon`: optional icon to display.
 * - `href`: navigation link.
 * - `onClick`: optional click handler.
 * - `active`: whether this item is currently active.
 */
export interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
}

/**
 * Props for the `Sidebar` component.
 * - `items`: list of items to render.
 * - `variant`: visual theme.
 * - `className`: additional CSS classes.
 */
export interface SidebarProps {
  items: SidebarItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Navigable sidebar.
 *
 * @example
 * ```tsx
 * <Sidebar
 *   variant="dark"
 *   items={[{label:'Overview', href:'#', icon:'📊'}]}
 * />
 * ```
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  variant = 'light',
  className,
  ...props
}) => {
  const sidebarClasses = [
    styles.sidebar,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    // Side navigation container
    <nav className={sidebarClasses} {...props}>
      <ul className={styles.sidebarList}>
        {items.map((item, index) => (
          <li key={index} className={styles.sidebarItem}>
            <a 
              href={item.href} 
              className={`${styles.sidebarLink} ${item.active ? styles.active : ''}`}
              onClick={item.onClick}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <Typography variant="span" theme={variant}>{item.label}</Typography>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

