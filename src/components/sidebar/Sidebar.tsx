import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Sidebar.module.css';

export interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  href: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

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
    <nav className={sidebarClasses} {...props}>
      <ul className={styles.sidebarList}>
        {items.map((item, index) => (
          <li key={index} className={styles.sidebarItem}>
            <a href={item.href} className={styles.sidebarLink}>
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <Typography variant="span" theme={variant}>{item.label}</Typography>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

