import React from 'react';
import styles from '@styles/Select.module.css';

/**
 * Props for the `Select` component.
 * - `variant`: visual theme.
 * - `inputSize`: visual size (small, medium, large).
 * - `state`: visual state (default, error, warning).
 * - `className`: additional CSS classes.
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  inputSize?: 'small' | 'medium' | 'large';
  state?: 'default' | 'error' | 'warning';
  className?: string;
  options: Array<{ value: string; label: string }>;
}

/**
 * Styled select with variants and sizes.
 * Marks aria-invalid when state = 'error' (overridable).
 *
 * @example
 * ```tsx
 * <Select
 *   variant="light"
 *   inputSize="medium"
 *   options={[{value:'1', label:'Uno'}]}
 * />
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ 
  variant = 'light',
  inputSize = 'medium',
  state = 'default',
  options,
  className,
  ...props
}, ref) => {
  // Dynamic classes by theme, size, and visual state
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