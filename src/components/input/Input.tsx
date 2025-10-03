import React from 'react';
import styles from '@styles/Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  inputSize?: 'small' | 'medium' | 'large';
  state?: 'default' | 'error' | 'warning';
}

/**
 * Campo de entrada con variantes visuales y tamaños.
 * 
 * Accesibilidad: cuando state = 'error' se marca aria-invalid por defecto (sobrescribible).
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ 
  variant = 'light',
  inputSize = 'medium',
  state = 'default',
  className,
  ...props
}, ref) => {
  const inputClasses = [
    styles.input,
    styles[variant],
    styles[inputSize],
    styles[state],
    className
  ].filter(Boolean).join(' ');

  const ariaInvalid = state === 'error' ? true : undefined;

  return (
    <input
      ref={ref}
      className={inputClasses}
      {...{ 'aria-invalid': ariaInvalid }}
      {...props}
    />
  );
});
Input.displayName = 'Input';