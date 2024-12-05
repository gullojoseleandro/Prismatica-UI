import React from 'react';
import { Button } from '@components/Button/Button';
import styles from '@styles/Pagination.module.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

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