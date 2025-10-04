import React, { useEffect, useId } from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Modal.module.css';

/**
 * Props for the `Modal` component.
 * Extremely customizable modal with multiple options.
 * 
 * @example
 * ```tsx
 * <Modal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm action"
 *   subtitle="This action cannot be undone"
 *   size="large"
 *   footer={<Button>Confirm</Button>}
 *   centered
 * >
 *   Modal content
 * </Modal>
 * ```
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controls modal visibility.
   */
  isOpen: boolean;
  
  /**
   * Callback to close the modal.
   */
  onClose: () => void;
  
  /**
   * Modal title.
   */
  title?: string;
  
  /**
   * Subtitle or description.
   */
  subtitle?: string;
  
  /**
   * Modal content.
   */
  children: React.ReactNode;
  
  /**
   * Visual theme.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Modal size.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  
  /**
   * Custom footer.
   */
  footer?: React.ReactNode;
  
  /**
   * Icon in the header.
   */
  icon?: React.ReactNode;
  
  /**
   * Show close button.
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Close when clicking outside.
   * @default true
   */
  closeOnClickOutside?: boolean;
  
  /**
   * Close when pressing Escape.
   * @default true
   */
  closeOnEscape?: boolean;
  
  /**
   * Modal position on screen.
   * @default 'center'
   */
  position?: 'top' | 'center' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  
  /**
   * Entry animation.
   * @default 'fade'
   */
  animation?: 'fade' | 'slide' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoom' | 'none';
  
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Extremely customizable modal component.
 * 
 * Features:
 * - Multiple sizes and animations
 * - Customizable header and footer
 * - Icon in the header
 * - Close control (Escape, click outside)
 * - Customizable position on screen
 * - Fully accessible
 * 
 * - `role="dialog"`, `aria-modal`, `aria-labelledby`
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(({ 
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  variant = 'light',
  size = 'medium',
  footer,
  icon,
  showCloseButton = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  position = 'center',
  animation = 'fade',
  className,
  ...props
}, ref) => {
  if (!isOpen) return null;

  const instanceId = useId();

  // Close with Escape key
  useEffect(() => {
    if (!closeOnEscape) return;
    
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, closeOnEscape]);

  // Block body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const overlayClasses = [
    styles.modalOverlay,
    styles[`animation-${animation}`],
    styles[`position-${position}`],
    className
  ].filter(Boolean).join(' ');
  
  const contentClasses = [
    styles.modalContent,
    styles[variant],
    styles[`size-${size}`]
  ].filter(Boolean).join(' ');

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={overlayClasses}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? `modal-title-${instanceId}` : undefined}
      onClick={handleOverlayClick}
      {...props}
    >
      <div ref={ref} className={contentClasses} role="document">
        {/* Header */}
        {(title || subtitle || showCloseButton) && (
          <div className={styles.modalHeader}>
            <div className={styles.headerContent}>
              {icon && <div className={styles.icon}>{icon}</div>}
              <div className={styles.headerTexts}>
                {title && (
                  <Typography 
                    id={`modal-title-${instanceId}`} 
                    variant="h2" 
                    theme={variant}
                    className={styles.title}
                  >
                    {title}
                  </Typography>
                )}
                {subtitle && (
                  <Typography variant="p" theme={variant} className={styles.subtitle}>
                    {subtitle}
                  </Typography>
                )}
              </div>
            </div>
            {showCloseButton && (
              <Button 
                aria-label="Close modal" 
                variant={variant}
                buttonStyle="ghost"
                size="small" 
                onClick={onClose} 
                className={styles.closeButton}
                circular
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </Button>
            )}
          </div>
        )}
        
        {/* Body */}
        <div className={styles.modalBody}>
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className={styles.modalFooter}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});
Modal.displayName = 'Modal';