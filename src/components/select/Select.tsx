import React from 'react';
import styles from '@styles/Select.module.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  inputSize?: 'small' | 'medium' | 'large';
  state?: 'default' | 'error' | 'warning';
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  variant = 'light',
  inputSize = 'medium',
  state = 'default',
  options,
  className,
  ...props
}) => {
  const selectClasses = [
    styles.select,
    styles[variant],
    styles[inputSize],
    styles[state],
    className
  ].filter(Boolean).join(' ');

  return (
    <select className={selectClasses} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};