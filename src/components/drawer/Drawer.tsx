import React from 'react';
import { Button } from '@components/Button/Button';
import styles from '@styles/Drawer.module.css';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'left',
  variant = 'light',
  children,
  className,
  ...props
}) => {
  const drawerClasses = [
    styles.drawer,
    styles[position],
    styles[variant],
    isOpen ? styles.open : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={drawerClasses} {...props}>
        <Button variant={variant} onClick={onClose} className={styles.closeButton}>
          ×
        </Button>
        {children}
      </div>
    </>
  );
};
