import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  size?: 'small' | 'medium' | 'large';
  animation?: 'pulse' | 'shake' | 'glow' | 'wave' | 'none';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'light',
  size = 'medium',
  animation = 'none',
  className,
  disabled,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    animation !== 'none' && styles[`animate-${animation}`],
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      <Typography variant="span" theme={variant}>
        {children}
      </Typography>
      {animation === 'wave' && <span className={styles.wave}></span>}
    </button>
  );
};