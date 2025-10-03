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
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Contenido del badge.
   */
  children: React.ReactNode;

  /**
   * Color del badge.
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';

  /**
   * Variante del badge.
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'subtle';

  /**
   * Tamaño del badge.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Forma del badge.
   * @default 'rounded'
   */
  forma?: 'rounded' | 'pill' | 'square';

  /**
   * Mostrar punto indicador.
   */
  dot?: boolean;

  /**
   * Icono a mostrar.
   */
  icono?: React.ReactNode;

  /**
   * Posición del icono.
   * @default 'left'
   */
  posicionIcono?: 'left' | 'right';

  /**
   * Hacer el badge clickeable.
   */
  clickeable?: boolean;

  /**
   * Callback al hacer click.
   */
  onClick?: () => void;

  /**
   * Mostrar botón de cerrar.
   */
  removible?: boolean;

  /**
   * Callback al remover.
   */
  onRemove?: () => void;

  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Badge - Etiqueta para mostrar información o estado.
 * 
 * Características:
 * - 7 colores semánticos
 * - 3 variantes (solid, outline, subtle)
 * - 3 tamaños
 * - Formas personalizables
 * - Punto indicador
 * - Iconos
 * - Removible
 * - Clickeable
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
  children,
  color = 'primary',
  variant = 'solid',
  size = 'medium',
  forma = 'rounded',
  dot = false,
  icono,
  posicionIcono = 'left',
  clickeable = false,
  onClick,
  removible = false,
  onRemove,
  className,
  ...props
}, ref) => {
  const badgeClasses = [
    styles.badge,
    styles[`color-${color}`],
    styles[variant],
    styles[size],
    styles[forma],
    (clickeable || onClick) && styles.clickeable,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (onClick) {
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <span
      ref={ref}
      className={badgeClasses}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {dot && <span className={styles.dot} />}
      {icono && posicionIcono === 'left' && (
        <span className={styles.icono}>{icono}</span>
      )}
      <Typography variant="span" className={styles.texto}>
        {children}
      </Typography>
      {icono && posicionIcono === 'right' && (
        <span className={styles.icono}>{icono}</span>
      )}
      {removible && (
        <button
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="Remover"
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </span>
  );
});

Badge.displayName = 'Badge';
