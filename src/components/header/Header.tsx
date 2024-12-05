import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { SearchBar } from '@components/searchBar/SearchBar';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Header.module.css';

export interface HeaderProps {
  logo?: React.ReactNode;
  title?: string;
  menuItems: Array<{ label: string; href: string }>;
  onSearch: (query: string) => void;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

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
    variant.startsWith('transparent') ? styles.transparent : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses} {...props}>
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
      <Typography variant="h1" theme={variant} className={styles.pageTitle}>{title}</Typography>
    </header>
  );
};