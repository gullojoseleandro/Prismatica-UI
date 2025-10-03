import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Toggle.module.css';

/**
 * Props for the `Toggle` component.
 * - Extends `<input>` attributes (except `type`).
 * - `variant`: visual theme.
 * - `label`: optional text next to the switch.
 * - `className`: additional CSS classes.
 */
export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  label?: string;
  className?: string;
}

/**
 * Toggle switch component.
 *
 * @example
 * ```tsx
 * <Toggle checked={active} onChange={(e) => setActive(e.target.checked)} label="Active" />
 * ```
 */
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
      {/* The checkbox input is what actually does the work */}
      <input type="checkbox" {...props} />
      {/* The span is responsible for drawing the switch */}
      <span className={styles.slider}></span>
      {/* The label displays the text */}
      {label && <Typography variant="span" className={styles.label}>{label}</Typography>}
    </label>
  );
};