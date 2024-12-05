import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Chip.module.css';

export interface ChipProps {
  label: string;
  onDelete?: () => void;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onDelete,
  variant = 'light',
  className,
  ...props
}) => {
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
