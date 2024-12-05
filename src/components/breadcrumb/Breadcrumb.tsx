import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  variant = 'light',
  className,
  ...props
}) => {
  const breadcrumbClasses = [
    styles.breadcrumb,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <nav className={breadcrumbClasses} aria-label="Breadcrumb" {...props}>
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index > 0 && <span className={styles.separator}>/</span>}
            {index === items.length - 1 ? (
              <Typography variant="span" theme={variant} className={styles.currentPage}>
                {item.label}
              </Typography>
            ) : (
              <a href={item.href} className={styles.breadcrumbLink}>
                <Typography variant="span" theme={variant}>
                  {item.label}
                </Typography>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};