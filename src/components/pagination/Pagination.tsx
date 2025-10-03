import React from 'react';
import { Button } from '@components/Button/Button';
import styles from '@styles/Pagination.module.css';

/**
 * Props del componente `Pagination`.
 * - `currentPage`: página actual (1-indexed).
 * - `totalPages`: total de páginas.
 * - `onPageChange`: callback al cambiar de página.
 * - `variant`: tema visual.
 * - `className`: clases CSS adicionales.
 */
export interface PaginationProps {
  /**
   * Página actual (1-indexed).
   */
  currentPage: number;
  /**
   * Total de páginas.
   */
  totalPages: number;
  /**
   * Callback al cambiar de página.
   * @param page Nueva página.
   */
  onPageChange: (page: number) => void;
  /**
   * Tema visual.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Navegación paginada con botones anterior/siguiente y ventana de páginas.
 *
 * @example
 * ```tsx
 * <Pagination currentPage={2} totalPages={10} onPageChange={(p) => setPagina(p)} />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'light',
  className,
  ...props
}) => {
  const paginationClasses = [
    styles.pagination,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  // Renderiza números con bordes (1, actual±1, último) e inserta elipsis
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <Button
            key={i}
            variant={variant}
            className={`${styles.pageButton} ${currentPage === i ? styles.active : ''}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(<span key={i} className={styles.ellipsis}>...</span>);
      }
    }
    return pageNumbers;
  };

  return (
    <nav className={paginationClasses} aria-label="Pagination" {...props}>
      <Button
        variant={variant}
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {renderPageNumbers()}
      <Button
        variant={variant}
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </nav>
  );
};