import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Breadcrumb.module.css';

/**
 * Breadcrumb item.
 * - `label`: visible text of the item.
 * - `href`: link destination.
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Props for the `Breadcrumb` component.
 * - `items`: ordered list of items.
 * - `variant`: visual theme.
 * - `className`: additional CSS classes.
 */
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Breadcrumb navigation with accessibility support.
 * - Uses `nav` with `aria-label="Breadcrumb"` and ordered list.
 * - The last item is marked as current page.
 *
 * @returns Structure `<nav><ol>...</ol></nav>`.
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Item', href: '#' }]}
 *   variant="dark"
 * />
 * ```
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  variant = 'light',
  className,
  ...props
}) => {
  // Dynamic classes by theme
  const breadcrumbClasses = [
    styles.breadcrumb,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    // Accessible navigation container
    <nav className={breadcrumbClasses} aria-label="Breadcrumb" {...props}>
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index > 0 && <span className={styles.separator}>/</span>}
            {index === items.length - 1 ? (
              // Last item: current page
              <Typography variant="span" theme={variant} className={styles.currentPage}>
                {item.label}
              </Typography>
            ) : (
              // Link to previous page
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