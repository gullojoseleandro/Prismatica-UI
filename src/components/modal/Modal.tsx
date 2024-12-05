import React from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variant = 'light',
  className,
  ...props
}) => {
  if (!isOpen) return null;

  const modalClasses = [
    styles.modalOverlay,
    styles[variant],
    variant.startsWith('transparent') ? styles.transparent : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={modalClasses} {...props}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <Typography variant="h2" theme={variant}>{title}</Typography>
          <Button variant={variant} size="small" onClick={onClose} className={styles.closeButton}>
            &times;
          </Button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};