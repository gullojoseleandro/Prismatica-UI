import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Chip.module.css';

/**
 * Props del componente `Chip`.
 * - `label`: texto visible del chip.
 * - `onDelete`: callback opcional al presionar eliminar.
 * - `variant`: tema visual.
 * - `className`: clases adicionales.
 */
export interface ChipProps {
  label: string;
  onDelete?: () => void;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * `Chip` muestra una etiqueta breve con opción de eliminar.
 *
 * @returns Un contenedor con etiqueta y, opcionalmente, botón de borrado.
 * @example
 * ```tsx
 * <Chip label="Etiqueta" variant="holographic" onDelete={() => console.log('borrar')} />
 * ```
 */
export const Chip: React.FC<ChipProps> = ({
  label,
  onDelete,
  variant = 'light',
  className,
  ...props
}) => {
  // Clases dinámicas por tema
  const chipClasses = [
    styles.chip,
    styles[variant],
    className
  ].filter(Boolean).join(' ');
  return (
    <div className={chipClasses} {...props}>
      <Typography variant="span" theme={variant} className={styles.label}>{label}</Typography>
      {onDelete && (
        <button className={styles.deleteButton} onClick={onDelete} aria-label="Delete">
          ×
        </button>
      )}
    </div>
  );
};
