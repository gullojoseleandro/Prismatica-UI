import React, { useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Dropdown.module.css';

/**
 * Opción de selección para `Dropdown`.
 * - `label`: texto visible.
 * - `value`: valor asociado a la opción.
 */
export interface DropdownOption {
  label: string;
  value: string;
}

/**
 * Props del componente `Dropdown`.
 * - `options`: lista de opciones disponibles.
 * - `placeholder`: texto cuando no hay selección.
 * - `variant`: tema visual (light, dark, holographic).
 * - `onChange`: callback con el `value` seleccionado.
 * - `className`: clases adicionales.
 */
export interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  variant?: 'light' | 'dark' | 'holographic';
  onChange: (value: string) => void;
  className?: string;
}

/**
 * `Dropdown` simple controlado internamente.
 * - Muestra una lista desplegable y devuelve el `value` de la opción elegida.
 *
 * @example
 * ```tsx
 * <Dropdown
 *   options={[{label: 'A', value: 'a'}, {label: 'B', value: 'b'}]}
 *   onChange={(v) => console.log(v)}
 * />
 * ```
 */
export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Select an option',
  variant = 'light',
  onChange,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

  const dropdownClasses = [
    styles.dropdown,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  // Selección de opción: actualiza estado y notifica al consumidor
  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div className={dropdownClasses} {...props}>
      <div 
        className={styles.dropdownHeader} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography variant="span" theme={variant}>
          {selectedOption ? selectedOption.label : placeholder}
        </Typography>
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((option, index) => (
            <li 
              key={index} 
              className={styles.dropdownItem}
              onClick={() => handleOptionClick(option)}
            >
              <Typography variant="span" theme={variant}>
                {option.label}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

