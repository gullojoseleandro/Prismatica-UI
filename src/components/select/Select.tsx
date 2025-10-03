import React from 'react';
import styles from '@styles/Select.module.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  inputSize?: 'small' | 'medium' | 'large';
  state?: 'default' | 'error' | 'warning';
  options: Array<{ value: string; label: string }>;
}

/**
 * Select estilizado con variantes y tamaños.
 * Marca aria-invalid cuando state = 'error' (sobrescribible).
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ 
  variant = 'light',
  inputSize = 'medium',
  state = 'default',
  options,
  className,
  ...props
}, ref) => {
  const selectClasses = [
    styles.select,
    styles[variant],
    styles[inputSize],
    styles[state],
    className
  ].filter(Boolean).join(' ');

  const ariaInvalid = state === 'error' ? true : undefined;

  return (
    <select ref={ref} className={selectClasses} {...{ 'aria-invalid': ariaInvalid }} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});
Select.displayName = 'Select';