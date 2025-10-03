import React from 'react';
import styles from '@styles/Input.module.css';

/**
 * Props for the `Input` component.
 * Extremely customizable input field with multiple options.
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="your@email.com"
 *   variant="dark"
 *   inputSize="large"
 *   leftIcon={<Mail />}
 *   helpMessage="Enter your registered email"
 *   required
 * />
 * ```
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Visual theme for the input.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Size of the input.
   * @default 'medium'
   */
  inputSize?: 'small' | 'medium' | 'large';
  
  /**
   * Visual state of the input.
   * @default 'default'
   */
  state?: 'default' | 'error' | 'warning' | 'success';
  
  /**
   * Label for the input.
   */
  label?: string;
  
  /**
   * Icon to display on the left side of the input.
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Icon to display on the right side of the input.
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Help message below the input.
   */
  helpMessage?: string;
  
  /**
   * Error message to display.
   */
  errorMessage?: string;
  
  /**
   * Warning message to display.
   */
  warningMessage?: string;
  
  /**
   * Success message to display.
   */
  successMessage?: string;
  
  /**
   * Show character counter.
   */
  showCounter?: boolean;
  
  /**
   * Maximum length for the counter.
   */
  maxLength?: number;
  
  /**
   * Show required indicator on the label.
   */
  showRequired?: boolean;
  
  /**
   * Informative tooltip next to the label.
   */
  tooltip?: string;
  
  /**
   * Additional CSS class for the container.
   */
  containerClassName?: string;
  
  /**
   * Additional CSS class for the label.
   */
  labelClassName?: string;
}

/**
 * Extremely customizable input field.
 * 
 * Features:
 * - Label with required indicator
 * - Left and right icons
 * - Help, error, warning, and success messages
 * - Character counter
 * - Informative tooltip
 * - Multiple visual states
 * - Fully accessible
 * 
 * Accessibility: 
 * - Uses aria-invalid when there's an error
 * - Uses aria-describedby for messages
 * - Label associated with unique id
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ 
  variant = 'light',
  inputSize = 'medium',
  state = 'default',
  className,
  containerClassName,
  labelClassName,
  label,
  leftIcon,
  rightIcon,
  helpMessage,
  errorMessage,
  warningMessage,
  successMessage,
  showCounter = false,
  maxLength,
  showRequired = false,
  tooltip,
  value,
  ...props
}, ref) => {
  // Generate unique ID for accessibility
  const inputId = React.useId();
  const messageId = `${inputId}-message`;
  
  // Determine final state based on messages
  let finalState = state;
  if (errorMessage) finalState = 'error';
  else if (warningMessage) finalState = 'warning';
  else if (successMessage) finalState = 'success';
  
  // Determine which message to show
  const messageToShow = errorMessage || warningMessage || successMessage || helpMessage;
  
  // Calculate current length for counter
  const currentLength = typeof value === 'string' ? value.length : 0;
  
  // Dynamic classes
  const containerClasses = [
    styles.inputContainer,
  ].filter(Boolean).join(' ');
  
  const wrapperClasses = [
    styles.inputWrapper,
    leftIcon && styles.withLeftIcon,
    rightIcon && styles.withRightIcon,
    styles[variant]
  ].filter(Boolean).join(' ');
  
  const inputClasses = [
    styles.input,
    className
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    styles.label,
    styles[variant],
    labelClassName
  ].filter(Boolean).join(' ');
  
  const ariaInvalid = finalState === 'error' ? true : undefined;
  const ariaDescribedBy = messageToShow ? messageId : undefined;

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          <span className={styles.labelText}>
            {label}
            {showRequired && <span className={styles.required}>*</span>}
          </span>
          {tooltip && (
            <span className={styles.tooltip} title={tooltip}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </span>
          )}
        </label>
      )}
      
      {/* Input wrapper with icons */}
      <div className={wrapperClasses}>
        {/* Left icon */}
        {leftIcon && (
          <span className={styles.leftIcon}>
            {leftIcon}
          </span>
        )}
        
        {/* Input field */}
        <input
          ref={ref}
          id={inputId}
          className={styles.input}
          aria-invalid={finalState === 'error'}
          aria-describedby={messageToShow ? messageId : undefined}
          aria-required={showRequired}
          maxLength={maxLength}
          {...props}
        />
        
        {/* Right icon */}
        {rightIcon && (
          <span className={styles.rightIcon}>
            {rightIcon}
          </span>
        )}
      </div>
      
      {/* Help/error/warning/success message */}
      {messageToShow && (
        <div 
          id={messageId} 
          className={`${styles.message} ${styles[`message-${finalState}`]}`}
          role={finalState === 'error' ? 'alert' : 'status'}
        >
          {messageToShow}
        </div>
      )}
      
      {/* Character counter */}
      {showCounter && maxLength && (
        <div className={styles.counter}>
          {currentLength} / {maxLength}
        </div>
      )}
    </div>
  );
});
Input.displayName = 'Input';