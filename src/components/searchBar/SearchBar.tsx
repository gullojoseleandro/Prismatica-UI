import React, { useState } from 'react';
import { Input } from '@components/input/Input';
import { Button } from '@components/Button/Button';
import styles from '@styles/SearchBar.module.css';

/**
 * Props for the `SearchBar` component.
 * - `onSearch`: callback that receives the entered text on submit.
 * - `variant`: visual theme.
 * - `placeholder`: input text when empty.
 * - `className`: additional CSS classes.
 */
export interface SearchBarProps {
  /**
   * Callback that receives the entered text on submit.
   * @param {string} query - Search term.
   */
  onSearch: (query: string) => void;
  /**
   * Visual theme.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Input text when empty.
   * @default 'Search...'
   */
  placeholder?: string;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Controlled search bar with input and submit button.
 *
 * @example
 * ```tsx
 * <SearchBar onSearch={(q) => console.log(q)} placeholder="Search..." />
 * ```
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  variant = 'light',
  placeholder = 'Search...',
  className,
  ...props
}) => {
  const [query, setQuery] = useState('');

  // Form submission: prevents reload and notifies the term
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const searchBarClasses = [
    styles.searchBar,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <form className={searchBarClasses} onSubmit={handleSubmit} {...props}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant={variant}
        className={styles.searchInput}
      />
      <Button type="submit" variant={variant} className={styles.searchButton}>
        Search
      </Button>
    </form>
  );
};