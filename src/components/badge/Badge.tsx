import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Badge.module.css';

/**
 * Props del componente `Badge`.
 * - `variant`: tema visual del badge.
 * - `color`: color semántico adicional.
 * - `children`: contenido interno (texto o nodos React).
 * - `className`: clases CSS extra.
 */
export interface BadgeProps {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
}

/**
 * `Badge` muestra una etiqueta pequeña de estado/conteo.
 *
 * @returns Un `Typography` con `variant="span"` estilizado como badge.
 * @example
 * ```tsx
 * <Badge variant="dark" color="success">Activo</Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'light',
  color = 'default',
  children,
  className,
  ...props
}) => {
  // Clases dinámicas por tema y color
  const badgeClasses = [
    styles.badge,
    styles[variant],
    styles[color],
    className
  ].filter(Boolean).join(' ');

  return (
    <Typography variant="span" className={badgeClasses} {...props}>
      {children}
    </Typography>
  );
};

