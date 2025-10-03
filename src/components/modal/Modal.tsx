import React, { useEffect, useId } from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Modal.module.css';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(({
  isOpen,
  onClose,
  title,
  children,
  variant = 'light',
  className,
  ...props
}, ref) => {
  if (!isOpen) return null;

  const instanceId = useId();

  // Cerrar con tecla Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const modalClasses = [
    styles.modalOverlay,
    styles[variant],
    variant.startsWith('transparent') ? styles.transparent : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={modalClasses}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${instanceId}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      {...props}
    >
      <div ref={ref} className={styles.modalContent} role="document">
        <div className={styles.modalHeader}>
          <Typography id={`modal-title-${instanceId}`} variant="h2" theme={variant}>{title}</Typography>
          <Button aria-label="Cerrar modal" variant={variant} size="small" onClick={onClose} className={styles.closeButton}>
            &times;
          </Button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
});
Modal.displayName = 'Modal';