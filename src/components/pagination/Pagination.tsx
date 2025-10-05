import React from 'react';
import { Button } from '@components/Button/Button';
import styles from '@styles/Pagination.module.css';

/**
 * Props for the `Pagination` component.
 * - `currentPage`: current page (1-indexed).
 * - `totalPages`: total pages.
 * - `onPageChange`: callback when page changes.
 * - `variant`: visual theme.
 * - `className`: additional CSS classes.
 */
export interface PaginationProps {
  /**
   * Current page (1-indexed).
   */
  currentPage: number;
  /**
   * Total pages.
   */
  totalPages: number;
  /**
   * Callback when page changes.
   * @param page New page.
   */
  onPageChange: (page: number) => void;
  /**
   * Visual theme.
   * @defaultValue 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Paginated navigation with previous/next buttons and page window.
 *
 * @example
 * ```tsx
 * <Pagination currentPage={2} totalPages={10} onPageChange={(p) => setPage(p)} />
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

  // Renders numbers with edges (1, current±1, last) and inserts ellipsis
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