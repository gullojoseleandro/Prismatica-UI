import React, { useEffect, useId } from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Modal.module.css';

/**
 * Props del componente `Modal`.
 * Modal extremadamente personalizable con múltiples opciones.
 * 
 * @example
 * ```tsx
 * <Modal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   titulo="Confirmar acción"
 *   subtitulo="Esta acción no se puede deshacer"
 *   size="large"
 *   footer={<Button>Confirmar</Button>}
 *   centrado
 * >
 *   Contenido del modal
 * </Modal>
 * ```
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controla visibilidad del modal.
   */
  isOpen: boolean;
  
  /**
   * Callback para cerrar.
   */
  onClose: () => void;
  
  /**
   * Título del modal.
   */
  titulo?: string;
  
  /**
   * Subtítulo o descripción.
   */
  subtitulo?: string;
  
  /**
   * Contenido del modal.
   */
  children: React.ReactNode;
  
  /**
   * Tema visual.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Tamaño del modal.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  
  /**
   * Footer personalizado.
   */
  footer?: React.ReactNode;
  
  /**
   * Icono en el header.
   */
  icono?: React.ReactNode;
  
  /**
   * Mostrar botón de cerrar.
   * @default true
   */
  mostrarBotonCerrar?: boolean;
  
  /**
   * Cerrar al hacer click en el overlay.
   * @default true
   */
  cerrarAlClickFuera?: boolean;
  
  /**
   * Cerrar al presionar Escape.
   * @default true
   */
  cerrarConEscape?: boolean;
  
  /**
   * Centrar verticalmente.
   */
  centrado?: boolean;
  
  /**
   * Animación de entrada.
   * @default 'fade'
   */
  animacion?: 'fade' | 'slide' | 'zoom' | 'none';
  
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Modal extremadamente personalizable.
 * 
 * Características:
 * - Múltiples tamaños y animaciones
 * - Header y footer personalizables
 * - Icono en el header
 * - Control de cierre (Escape, click fuera)
 * - Centrado vertical
 * - Totalmente accesible
 * 
 * ARIA:
 * - `role="dialog"`, `aria-modal`, `aria-labelledby`
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(({ 
  isOpen,
  onClose,
  titulo,
  subtitulo,
  children,
  variant = 'light',
  size = 'medium',
  footer,
  icono,
  mostrarBotonCerrar = true,
  cerrarAlClickFuera = true,
  cerrarConEscape = true,
  centrado = false,
  animacion = 'fade',
  className,
  ...props
}, ref) => {
  if (!isOpen) return null;

  const instanceId = useId();

  // Cerrar con tecla Escape
  useEffect(() => {
    if (!cerrarConEscape) return;
    
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, cerrarConEscape]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const overlayClasses = [
    styles.modalOverlay,
    styles[`animacion-${animacion}`],
    centrado && styles.centrado,
    className
  ].filter(Boolean).join(' ');
  
  const contentClasses = [
    styles.modalContent,
    styles[variant],
    styles[`size-${size}`]
  ].filter(Boolean).join(' ');

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (cerrarAlClickFuera && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={overlayClasses}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titulo ? `modal-title-${instanceId}` : undefined}
      onClick={handleOverlayClick}
      {...props}
    >
      <div ref={ref} className={contentClasses} role="document">
        {/* Header */}
        {(titulo || subtitulo || mostrarBotonCerrar) && (
          <div className={styles.modalHeader}>
            <div className={styles.headerContenido}>
              {icono && <div className={styles.icono}>{icono}</div>}
              <div className={styles.headerTextos}>
                {titulo && (
                  <Typography 
                    id={`modal-title-${instanceId}`} 
                    variant="h2" 
                    theme={variant}
                    className={styles.titulo}
                  >
                    {titulo}
                  </Typography>
                )}
                {subtitulo && (
                  <Typography variant="p" theme={variant} className={styles.subtitulo}>
                    {subtitulo}
                  </Typography>
                )}
              </div>
            </div>
            {mostrarBotonCerrar && (
              <Button 
                aria-label="Cerrar modal" 
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