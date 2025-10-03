import React from 'react';
import styles from '@styles/Select.module.css';

/**
 * Props del componente `Select`.
 * - `variant`: tema visual.
 * - `inputSize`: tamaño visual (small, medium, large).
 * - `state`: estado visual (default, error, warning).
 * - `options`: opciones a renderizar con `value` y `label`.
 * - Extiende atributos nativos de `<select>`.
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  inputSize?: 'small' | 'medium' | 'large';
  state?: 'default' | 'error' | 'warning';
  options: Array<{ value: string; label: string }>;
}

/**
 * Select estilizado con variantes y tamaños.
 * Marca aria-invalid cuando state = 'error' (sobrescribible).
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
  // Clases dinámicas por tema, tamaño y estado visual
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