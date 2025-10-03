import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { SearchBar } from '@components/searchBar/SearchBar';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Header.module.css';

/**
 * Props for the `Header` component.
 * - `logo`: optional node for brand/logo.
 * - `title`: page title text.
 * - `menuItems`: elements to display in the `Navbar`.
 * - `onSearch`: callback for searches from the bar.
 * - `variant`: visual theme.
 * - `className`: additional CSS classes.
 */
export interface HeaderProps {
  /**
   * Optional node for brand/logo.
   */
  logo?: React.ReactNode;
  /**
   * Page title text.
   */
  title?: string;
  /**
   * Elements to display in the `Navbar`.
   */
  menuItems: Array<{ label: string; href: string }>;
  /**
   * Callback for searches from the bar.
   * @param {string} query - search query.
   */
  onSearch: (query: string) => void;
  /**
   * Visual theme.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Page header that composes `Navbar`, `SearchBar`, and title.
 *
 * @example
 * ```tsx
 * <Header
 *   logo={<img src="/logo.svg" />}
 *   title="Dashboard"
 *   menuItems={[{label:'Home', href:'#'}]}
 *   onSearch={(q) => console.log(q)}
 *   variant="light"
 * />
 * ```
 */
export const Header: React.FC<HeaderProps> = ({
  logo,
  title,
  menuItems,
  onSearch,
  variant = 'light',
  className,
  ...props
}) => {
  const headerClasses = [
    styles.header,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses} {...props}>
      {/* Main navigation */}
      <Navbar
        logo={logo}
        title={title}
        menuItems={menuItems}
        variant={variant}
      />
      <div className={styles.searchContainer}>
        <SearchBar
          onSearch={onSearch}
          variant={variant}
          placeholder="Search..."
        />
      </div>
      {/* Semantic page title */}
      <Typography variant="h1" theme={variant} className={styles.pageTitle}>{title}</Typography>
    </header>
  );
};