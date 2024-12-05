import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Toggle.module.css';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  variant = 'light',
  label,
  className,
  ...props
}) => {
  const toggleClasses = [
    styles.toggle,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <label className={toggleClasses}>
      <input type="checkbox" {...props} />
      <span className={styles.slider}></span>
      {label && <Typography variant="span" className={styles.label}>{label}</Typography>}
    </label>
  );
};