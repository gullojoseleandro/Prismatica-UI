import React from 'react';
import styles from '@styles/Spinner.module.css';

/**
 * Props for the `Spinner` component.
 * - `variant`: visual theme (light, dark, holographic, transparent-*).
 * - `size`: spinner size (small, medium, large).
 * - `className`: additional CSS classes.
 */
export interface SpinnerProps {
  /**
   * Visual theme for the spinner.
   * @defaultValue 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Spinner size.
   * @defaultValue 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Simple and accessible loading indicator (spinner).
 *
 * @example
 * ```tsx
 * <Spinner variant="dark" size="large" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  variant = 'light',
  size = 'medium',
  className,
  ...props
}) => {
  const spinnerClasses = [
    styles.spinner,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  // Visual element without content, decorative only
  return <div className={spinnerClasses} {...props} />;
};