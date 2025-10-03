import React, { useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Dropdown.module.css';

/**
 * Selection option for `Dropdown`.
 * - `label`: visible text.
 * - `value`: value associated with the option.
 */
export interface DropdownOption {
  label: string;
  value: string;
}

/**
 * Props for the `Dropdown` component.
 * - `options`: list of available options.
 * - `placeholder`: text when no selection.
 * - `variant`: visual theme (light, dark, holographic).
 * - `onChange`: callback with the selected `value`.
 * - `className`: additional CSS classes.
 */
export interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  variant?: 'light' | 'dark' | 'holographic';
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Simple internally controlled `Dropdown`.
 * - Displays a dropdown list and returns the `value` of the chosen option.
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

  // Option selection: updates state and notifies consumer
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

