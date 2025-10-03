import React from 'react';
import { Button } from '@components/Button/Button';
import styles from '@styles/Drawer.module.css';

/**
 * Props for the `Drawer` component.
 * - `isOpen`: controls panel visibility.
 * - `onClose`: callback to close.
 * - `position`: appearance side (left, right, top, bottom).
 * - `variant`: visual theme.
 * - `className`: additional CSS classes.
 */
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  children: React.ReactNode;
  className?: string;
}

/**
 * `Drawer` is a sliding panel with overlay.
 *
 * @returns Fragment with overlay (click to close) and side container.
 * @example
 * ```tsx
 * <Drawer isOpen={open} onClose={() => setOpen(false)} position="right" variant="dark">
 *   <Content />
 * </Drawer>
 * ```
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'left',
  variant = 'light',
  children,
  className,
  ...props
}) => {
  // Dynamic classes by position, theme, and open state
  const drawerClasses = [
    styles.drawer,
    styles[position],
    styles[variant],
    isOpen ? styles.open : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Clickable overlay to close */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={drawerClasses} {...props}>
        {/* Close button in the panel */}
        <Button variant={variant} onClick={onClose} className={styles.closeButton}>
          ×
        </Button>
        {children}
      </div>
    </>
  );
};
