import React, { useState } from 'react';
import { Input } from '@components/input/Input';
import { Button } from '@components/Button/Button';
import styles from '@styles/SearchBar.module.css';

/**
 * Props del componente `SearchBar`.
 * - `onSearch`: callback que recibe el texto ingresado al enviar.
 * - `variant`: tema visual.
 * - `placeholder`: texto del input cuando está vacío.
 * - `className`: clases CSS adicionales.
 */
export interface SearchBarProps {
  /**
   * Callback que recibe el texto ingresado al enviar.
   * @param {string} query - Término de búsqueda.
   */
  onSearch: (query: string) => void;
  /**
   * Tema visual.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Texto del input cuando está vacío.
   * @default 'Search...'
   */
  placeholder?: string;
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Barra de búsqueda controlada con input y botón submit.
 *
 * @example
 * ```tsx
 * <SearchBar variant="light" onSearch={(q) => console.log(q)} />
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

  // Envío del formulario: previene recarga y notifica el término
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