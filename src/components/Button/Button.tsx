import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Button.module.css';

  /**
   * Props for the `Button` component.
   * Extremely customizable button with multiple options.
   * 
   * @example
   * ```tsx
   * <Button
   *   variant="dark"
   *   size="large"
   *   leftIcon={<Save />}
   *   loading={isLoading}
   *   fullWidth
   * >
   *   Save Changes
   * </Button>
   * ```
   */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual theme for the button.
   * @defaultValue 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Size of the button.
   * @defaultValue 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Animation for the button.
   * @defaultValue 'none'
   */
  animation?: 'pulse' | 'shake' | 'glow' | 'wave' | 'none';
  
  /**
   * Button style: 'solid', 'outline', 'ghost', 'link'.
   * @defaultValue 'solid'
   */
  buttonStyle?: 'solid' | 'outline' | 'ghost' | 'link';
  
  /**
   * Icon to display on the left side of the text.
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Icon to display on the right side of the text.
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Loading state. Shows a spinner and disables the button.
   */
  loading?: boolean;
  
  /**
   * Text to display during loading.
   */
  loadingText?: string;
  
  /**
   * Custom icon for the loading state.
   */
  loadingIcon?: React.ReactNode;
  
  /**
   * Full width button.
   */
  fullWidth?: boolean;
  
  /**
   * Circular button (icon only, no text).
   */
  circular?: boolean;
  
  /**
   * Button shape: 'rounded', 'square', 'pill'.
   * @defaultValue 'rounded'
   */
  shape?: 'rounded' | 'square' | 'pill';
  
  /**
   * Semantic color for the button: 'primary', 'secondary', 'success', 'danger', 'warning', 'info'.
   */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * Show shadow.
   */
  withShadow?: boolean;
  
  /**
   * Button group (for special styles when together).
   */
  inGroup?: boolean;
}

/**
 * Extremely customizable button component.
 * 
 * Features:
 * - Multiple variants and styles (solid, outline, ghost, link)
 * - Left and right icons
 * - Loading state with spinner
 * - Semantic colors (success, danger, warning, etc.)
 * - Customizable shapes (rounded, square, pill, circular)
 * - Optional full width
 * - Animations
 * - Fully accessible
 * 
 * @returns Styled and accessible `<button>` element.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children,
  variant = 'light',
  size = 'medium',
  animation = 'none',
  buttonStyle = 'solid',
  leftIcon,
  rightIcon,
  loading = false,
  loadingText,
  loadingIcon,
  fullWidth = false,
  circular = false,
  shape = 'rounded',
  color,
  withShadow = false,
  inGroup = false,
  className,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  // Button is disabled if loading or disabled
  const isDisabled = disabled || loading;
  
  // Default spinner for loading
  const defaultSpinner = (
    <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
      <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
    </svg>
  );
  
  // Build dynamic classes
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    styles[buttonStyle],
    styles[shape],
    color && styles[`color-${color}`],
    animation !== 'none' && styles[`animate-${animation}`],
    fullWidth && styles.fullWidth,
    circular && styles.circular,
    withShadow && styles.conSombra,
    inGroup && styles.enGrupo,
    isDisabled && styles.disabled,
    loading && styles.cargando,
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      ref={ref} 
      className={buttonClasses} 
      disabled={isDisabled} 
      type={type}
      aria-busy={loading}
      {...props}
    >
      {/* Button content */}
      <span className={styles.content}>
        {/* Loading icon */}
        {loading && (
          <span className={styles.loadingIconWrapper}>
            {loadingIcon || defaultSpinner}
          </span>
        )}
        
        {/* Left icon */}
        {!loading && leftIcon && (
          <span className={styles.leftIcon}>
            {leftIcon}
          </span>
        )}
        
        {/* Button text */}
        {!loading && children && (
          <span className={styles.text}>
            {children}
          </span>
        )}
        
        {/* Loading text */}
        {loading && loadingText && (
          <span className={styles.text}>
            {loadingText}
          </span>
        )}
        
        {/* Right icon */}
        {!loading && rightIcon && (
          <span className={styles.rightIcon}>
            {rightIcon}
          </span>
        )}
      </span>
      
      {/* Wave animation */}
      {animation === 'wave' && <span className={styles.wave} aria-hidden="true"></span>}
    </button>
  );
});
Button.displayName = 'Button';