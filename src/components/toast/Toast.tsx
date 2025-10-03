import React, { useState, useEffect } from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Toast.module.css';

/**
 * Props for the `Toast` component.
 * Temporary notification with auto-close.
 * 
 * @example
 * ```tsx
 * <Toast
 *   type="success"
 *   message="Operation successful"
 *   visible={show}
 *   onClose={() => setShow(false)}
 * />
 * ```
 */
export interface ToastProps {
  /**
   * Type of notification.
   * @default 'info'
   */
  type?: 'success' | 'error' | 'warning' | 'info';
  
  /**
   * Toast title.
   */
  title?: string;
  
  /**
   * Toast message.
   */
  message: string;
  
  /**
   * Custom icon.
   */
  icon?: React.ReactNode;
  
  /**
   * Duration in milliseconds before auto-close.
   * @default 5000
   */
  duration?: number;
  
  /**
   * Toast position.
   * @default 'top-right'
   */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  
  /**
   * Show close button.
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Callback on close.
   */
  onClose?: () => void;
  
  /**
   * Custom action.
   */
  action?: {
    text: string;
    onClick: () => void;
  };
  
  /**
   * Controls visibility.
   */
  visible?: boolean;
  
  /**
   * Theme variant.
   * @default 'light'
   */
  variant?: 'light' | 'dark';
  
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
 * Toast component for temporary notifications.
 * 
 * Features:
 * - 4 types: success, error, warning, info
 * - Configurable auto-close
 * - 6 available positions
 * - Customizable action
 * - Smooth animations
 * - Fully accessible
 */
export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  icon,
  duration = 5000,
  position = 'top-right',
  showCloseButton = true,
  onClose,
  action,
  visible = true,
  variant = 'light',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
    if (visible) {
      setIsExiting(false);
    }
  }, [visible]);

  useEffect(() => {
    if (!isVisible || duration === 0) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Exit animation duration
  };

  if (!isVisible) return null;

  const toastClasses = [
    styles.toast,
    styles[type],
    styles[position],
    styles[variant],
    isExiting && styles.exiting,
    className
  ].filter(Boolean).join(' ');

  const iconToShow = icon || defaultIcons[type];

  return (
    <div className={toastClasses} role="alert" aria-live="polite">
      <div className={styles.iconContainer}>
        {iconToShow}
      </div>
      
      <div className={styles.content}>
        {title && (
          <Typography variant="h4" theme={variant} className={styles.title}>
            {title}
          </Typography>
        )}
        <Typography variant="p" theme={variant} className={styles.message}>
          {message}
        </Typography>
        
        {action && (
          <Button
            size="small"
            buttonStyle="ghost"
            onClick={action.onClick}
            className={styles.actionButton}
          >
            {action.text}
          </Button>
        )}
      </div>
      
      {showCloseButton && (
        <Button
          size="small"
          buttonStyle="ghost"
          circular
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close notification"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </Button>
      )}
    </div>
  );
};

/**
 * Hook to manage toasts programmatically.
 * 
 * @example
 * ```tsx
 * const { showToast } = useToast();
 * 
 * showToast({
 *   type: 'success',
 *   message: 'Saved!'
 * });
 * ```
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const showToast = (props: Omit<ToastProps, 'visible' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...props, id, visible: true }]);
  };

  const closeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return {
    toasts,
    showToast,
    closeToast,
  };
};
