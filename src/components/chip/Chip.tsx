import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Chip.module.css';

/**
 * Props for the `Chip` component.
 * - `label`: visible chip text.
 * - `onDelete`: optional callback when pressing delete.
 * - `variant`: visual theme.
 * - `className`: additional CSS classes.
 */
export interface ChipProps {
  label: string;
  onDelete?: () => void;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * `Chip` displays a brief label with delete option.
 *
 * @returns A container with label and, optionally, delete button.
 * @example
 * ```tsx
 * <Chip label="Tag" variant="holographic" onDelete={() => console.log('delete')} />
 * ```
 */
export const Chip: React.FC<ChipProps> = ({
  label,
  onDelete,
  variant = 'light',
  className,
  ...props
}) => {
  // Dynamic classes by theme
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
