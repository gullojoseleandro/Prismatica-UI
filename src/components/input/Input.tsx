import React from 'react';
import styles from '@styles/Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  inputSize?: 'small' | 'medium' | 'large';
  state?: 'default' | 'error' | 'warning';
}

export const Input: React.FC<InputProps> = ({
  variant = 'light',
  inputSize = 'medium',
  state = 'default',
  className,
  ...props
}) => {
  const inputClasses = [
    styles.input,
    styles[variant],
    styles[inputSize],
    styles[state],
    className
  ].filter(Boolean).join(' ');

  return <input className={inputClasses} {...props} />;
};