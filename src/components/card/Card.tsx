import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Card.module.css';

/**
 * Props del componente `Card`.
 * - `title`: título opcional a mostrar en el encabezado.
 * - `children`: contenido principal de la tarjeta.
 * - `variant`: tema visual.
 * - `className`: clases CSS adicionales.
 * - Extiende atributos nativos de `<div>`.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Tarjeta contenedora con título opcional y variantes de estilo.
 *
 * @returns Contenedor `<div>` con encabezado opcional y cuerpo.
 * @example
 * ```tsx
 * <Card title="Ejemplo" variant="dark">
 *   <p>Contenido</p>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ 
  title,
  children,
  variant = 'light',
  className,
  ...props
}, ref) => {
  // Clases dinámicas por tema
  const cardClasses = [
    styles.card,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {title && (
        <Typography variant="h2" theme={variant} className={styles.title}>
          {title}
        </Typography>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
});
Card.displayName = 'Card';