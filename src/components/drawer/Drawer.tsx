import React from 'react';
import { Button } from '@components/Button/Button';
import styles from '@styles/Drawer.module.css';

/**
 * Props del componente `Drawer`.
 * - `isOpen`: controla visibilidad del panel.
 * - `onClose`: callback para cerrar.
 * - `position`: lado de aparición (left, right, top, bottom).
 * - `variant`: tema visual.
 * - `children`: contenido del panel.
 * - `className`: clases CSS extra.
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
 * `Drawer` es un panel deslizante con overlay.
 *
 * @returns Fragmento con overlay (click para cerrar) y contenedor lateral.
 * @example
 * ```tsx
 * <Drawer isOpen={abierto} onClose={() => setAbierto(false)} position="right" variant="dark">
 *   <Contenido />
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
  // Clases dinámicas por posición, tema y estado abierto
  const drawerClasses = [
    styles.drawer,
    styles[position],
    styles[variant],
    isOpen ? styles.open : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Overlay clickeable para cerrar */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={drawerClasses} {...props}>
        {/* Botón de cierre en el panel */}
        <Button variant={variant} onClick={onClose} className={styles.closeButton}>
          ×
        </Button>
        {children}
      </div>
    </>
  );
};
