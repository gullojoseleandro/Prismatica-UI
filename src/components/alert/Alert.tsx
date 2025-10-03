import React from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Alert.module.css';

/**
 * Props for the `Alert` component.
 * Alert or highlighted notification message.
 * 
 * @example
 * ```tsx
 * <Alert
 *   type="success"
 *   title="Success!"
 *   message="The operation completed successfully"
 *   closable
 * />
 * ```
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert type.
   * @default 'info'
   */
  type?: 'success' | 'error' | 'warning' | 'info';
  
  /**
   * Alert title.
   */
  title?: string;
  
  /**
   * Alert message.
   */
  message?: string;
  
  /**
   * Custom content (replaces message).
   */
  children?: React.ReactNode;
  
  /**
   * Custom icon.
   */
  icon?: React.ReactNode;
  
  /**
   * Show default icon.
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Allow closing the alert.
   */
  closable?: boolean;
  
  /**
   * Callback on close.
   */
  onClose?: () => void;
  
  /**
   * Style variant.
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined' | 'subtle';
  
  /**
   * Custom actions (buttons).
   */
  actions?: React.ReactNode;
  
  /**
   * Visual theme.
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Default icons for each type.
 */
const defaultIcons = {
  success: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  error: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  warning: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  info: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
};

/**
 * Alert - Alert or highlighted notification message.
 * 
 * Features:
 * - 4 types: success, error, warning, info
 * - 3 variants: filled, outlined, subtle
 * - Customizable icons
 * - Closable
 * - Custom actions
 * - Fully accessible
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({
  type = 'info',
  title,
  message,
  children,
  icon,
  showIcon = true,
  closable = false,
  onClose,
  variant = 'filled',
  actions,
  theme = 'light',
  className,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  const alertClasses = [
    styles.alert,
    styles[type],
    styles[variant],
    styles[theme],
    className
  ].filter(Boolean).join(' ');

  const iconToShow = icon || defaultIcons[type];

  return (
    <div
      ref={ref}
      className={alertClasses}
      role="alert"
      {...props}
    >
      {showIcon && (
        <div className={styles.iconContainer}>
          {iconToShow}
        </div>
      )}
      
      <div className={styles.content}>
        {title && (
          <Typography variant="h4" theme={theme} className={styles.title}>
            {title}
          </Typography>
        )}
        {message && (
          <Typography variant="p" theme={theme} className={styles.message}>
            {message}
          </Typography>
        )}
        {children}
        
        {actions && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}
      </div>
      
      {closable && (
        <Button
          size="small"
          buttonStyle="ghost"
          circular
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close alert"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </Button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';
