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
export interface SearchBarProps extends React.FormHTMLAttributes<HTMLFormElement> {
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
  /** Size of the control */
  size?: 'small' | 'medium' | 'large';
  /** Shape of the control */
  shape?: 'rounded' | 'pill' | 'square';
  /** Stretch to full width */
  fullWidth?: boolean;
  /** Show the submit button */
  showButton?: boolean;
  /** Submit button label */
  buttonLabel?: string;
  /** Place the button on left or right */
  buttonPosition?: 'left' | 'right';
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
  size = 'medium',
  shape = 'rounded',
  fullWidth = false,
  showButton = true,
  buttonLabel = 'Search',
  buttonPosition = 'right',
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
    styles[`size-${size}`],
    styles[shape],
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ');

  const inputEl = (
    <Input
      type="text"
      placeholder={placeholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      variant={variant}
      className={styles.searchInput}
    />
  );

  const buttonEl = showButton ? (
    <Button type="submit" variant={variant} className={styles.searchButton}>
      {buttonLabel}
    </Button>
  ) : null;

  return (
    <form className={searchBarClasses} onSubmit={handleSubmit} {...props}>
      {buttonPosition === 'left' && buttonEl}
      {inputEl}
      {buttonPosition === 'right' && buttonEl}
    </form>
  );
};