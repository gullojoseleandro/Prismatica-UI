import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Breadcrumb.module.css';

/**
 * Item de migas de pan (breadcrumb).
 * - `label`: texto visible del ítem.
 * - `href`: destino del enlace.
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Props del componente `Breadcrumb`.
 * - `items`: lista ordenada de ítems.
 * - `variant`: tema visual.
 * - `className`: clases CSS adicionales.
 */
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Navegación tipo "breadcrumb" con soporte de accesibilidad.
 * - Usa `nav` con `aria-label="Breadcrumb"` y lista ordenada.
 * - El último ítem se marca como página actual.
 *
 * @returns Estructura `<nav><ol>...</ol></nav>`.
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[{ label: 'Home', href: '/' }, { label: 'Productos', href: '/productos' }, { label: 'Item', href: '#' }]}
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
  // Clases dinámicas por tema
  const breadcrumbClasses = [
    styles.breadcrumb,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    // Contenedor de navegación accesible
    <nav className={breadcrumbClasses} aria-label="Breadcrumb" {...props}>
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index > 0 && <span className={styles.separator}>/</span>}
            {index === items.length - 1 ? (
              // Último ítem: página actual
              <Typography variant="span" theme={variant} className={styles.currentPage}>
                {item.label}
              </Typography>
            ) : (
              // Enlace a la página anterior
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