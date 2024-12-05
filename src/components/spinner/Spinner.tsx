import React from 'react';
import styles from '@styles/Spinner.module.css';

export interface SpinnerProps {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

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

  return <div className={spinnerClasses} {...props} />;
};