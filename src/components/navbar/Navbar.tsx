import React from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Navbar.module.css';

/**
 * Props for the `Navbar` component.
 * - `logo`: optional node for logo/brand.
 * - `title`: optional text title.
 * - `menuItems`: array of navigation links.
 * - `actions`: optional node for actions on the right (e.g. buttons).
 * - `variant`: visual theme.
 * - `className`: additional CSS classes.
 * - Extends native `<nav>` attributes via `React.HTMLAttributes<HTMLElement>`.
 */
export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  title?: string;
  menuItems: Array<{ label: string; href: string }>;
  actions?: React.ReactNode;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
  /** Optional version badge text (e.g., v2.0.2) */
  version?: string;
  /** Shows a theme toggle button on the right */
  showThemeToggle?: boolean;
  /** Callback when theme toggle is clicked */
  onToggleTheme?: () => void;
  /** Custom label for theme toggle button */
  themeToggleLabel?: string;
}

/**
 * Main navigation bar.
 *
 * @example
 * ```tsx
 * <Navbar
 *   logo={<img src="/logo.svg" alt="Brand" />}
 *   title="App"
 *   menuItems={[{label:'Home', href:'#'}]}
 *   actions={<Button>Logout</Button>}
 * />
 * ```
 */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(({ 
  logo,
  title,
  menuItems,
  variant = 'light',
  className,
  actions,
  version,
  showThemeToggle,
  onToggleTheme,
  themeToggleLabel,
  ...props
}, ref) => {
  const navbarClasses = [
    styles.navbar,
    styles[variant],
    variant.startsWith('transparent') ? styles.transparent : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <nav
      ref={ref}
      className={navbarClasses}
      aria-label={title ? undefined : 'Main navigation'}
      {...props}
    >
      <div className={styles.navbarBrand}>
        {logo && <div className={styles.logo}>{logo}</div>}
        {title && <Typography variant="h1" theme={variant} className={styles.title}>{title}</Typography>}
      </div>
      <ul className={styles.navbarMenu}>
        {menuItems.map((item, index) => (
          <li key={index} className={styles.navbarMenuItem}>
            <a href={item.href} className={styles.navbarMenuLink}>
              <Typography variant="span" theme={variant}>{item.label}</Typography>
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.navbarActions}>
        {actions}
        {showThemeToggle && (
          <Button
            size="small"
            buttonStyle="outline"
            variant={variant}
            onClick={onToggleTheme}
            style={{ marginLeft: '0.5rem' }}
          >
            {themeToggleLabel || 'Theme'}
          </Button>
        )}
        {version && (
          <span
            className={styles.versionBadge}
            style={{ marginLeft: '0.5rem', opacity: 0.8 }}
            aria-label={`Version ${version}`}
            title={`Version ${version}`}
          >
            {version}
          </span>
        )}
      </div>
    </nav>
  );
});
Navbar.displayName = 'Navbar';