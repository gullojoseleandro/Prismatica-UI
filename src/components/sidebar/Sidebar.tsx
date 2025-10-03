import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Sidebar.module.css';

/**
 * Item de la barra lateral.
 * - `label`: texto del ítem.
 * - `icon`: ícono opcional a mostrar.
 * - `href`: enlace de navegación.
 */
export interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  href: string;
}

/**
 * Props del componente `Sidebar`.
 * - `items`: lista de ítems a renderizar.
 * - `variant`: tema visual.
 * - `className`: clases CSS adicionales.
 */
export interface SidebarProps {
  items: SidebarItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Barra lateral navegable.
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
    // Contenedor de navegación lateral
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

