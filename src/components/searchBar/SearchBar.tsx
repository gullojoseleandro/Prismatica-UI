import React, { useState } from 'react';
import { Input } from '@components/input/Input';
import { Button } from '@components/Button/Button';
import styles from '@styles/SearchBar.module.css';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  variant = 'light',
  placeholder = 'Search...',
  className,
  ...props
}) => {
  const [query, setQuery] = useState('');

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