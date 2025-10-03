/**
 * Props del componente `Header`.
 * - `logo`: nodo opcional para la marca/logo.
 * - `title`: texto de título de página.
 * - `menuItems`: elementos a mostrar en el `Navbar`.
 * - `onSearch`: callback para búsquedas desde la barra.
 * - `variant`: tema visual.
 * - `className`: clases CSS extra.
 */
import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { SearchBar } from '@components/searchBar/SearchBar';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Header.module.css';

export interface HeaderProps {
  /**
   * Nodo opcional para la marca/logo.
   */
  logo?: React.ReactNode;
  /**
   * Texto de título de página.
   */
  title?: string;
  /**
   * Elementos a mostrar en el `Navbar`.
   */
  menuItems: Array<{ label: string; href: string }>;
  /**
   * Callback para búsquedas desde la barra.
   * @param {string} query - texto de búsqueda.
   */
  onSearch: (query: string) => void;
  /**
   * Tema visual.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Clases CSS extra.
   */
  className?: string;
}

/**
 * Encabezado de página que compone `Navbar`, `SearchBar` y título.
 *
 * @example
 * ```tsx
 * <Header
 *   logo={<Logo/>}
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
    variant.startsWith('transparent') ? styles.transparent : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses} {...props}>
      {/* Navegación principal */}
      <Navbar
        logo={logo}
        title={title}
        menuItems={menuItems}
        variant={variant}
      />
      {/* Buscador superior */}
      <div className={styles.searchContainer}>
        <SearchBar
          onSearch={onSearch}
          variant={variant}
          placeholder="Search..."
        />
      </div>
      {/* Título de página semántico */}
      <Typography variant="h1" theme={variant} className={styles.pageTitle}>{title}</Typography>
    </header>
  );
};