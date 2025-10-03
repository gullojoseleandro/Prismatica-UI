import React, { useEffect, useId } from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Modal.module.css';

/**
 * Props del componente `Modal`.
 * - `isOpen`: controla visibilidad del modal.
 * - `onClose`: callback para cerrar.
 * - `title`: título mostrado en el encabezado.
 * - `children`: contenido del modal.
 * - `variant`: tema visual.
 * - `className`: clases CSS adicionales.
 * - Extiende atributos nativos de `<div>`.
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Modal accesible con cierre por Escape y click en overlay.
 * 
 * ARIA:
 * - `role="dialog"`, `aria-modal`, `aria-labelledby` enlazado a título.
 * 
 * @example
 * ```tsx
 * <Modal isOpen={abierto} onClose={() => setAbierto(false)} title="Detalles" variant="light">
 *   <Contenido />
 * </Modal>
 * ```
 */
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
      // Cierre al presionar Escape
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
        // Cierre al hacer click fuera del contenido
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