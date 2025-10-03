import React, { useEffect, useState } from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Toast.module.css';

/**
 * Props del componente `Toast`.
 * Notificación temporal con auto-cierre.
 * 
 * @example
 * ```tsx
 * <Toast
 *   tipo="success"
 *   titulo="¡Éxito!"
 *   mensaje="Los cambios se guardaron correctamente"
 *   visible={showToast}
 *   onClose={() => setShowToast(false)}
 * />
 * ```
 */
export interface ToastProps {
  /**
   * Tipo de notificación.
   * @default 'info'
   */
  tipo?: 'success' | 'error' | 'warning' | 'info';
  
  /**
   * Título del toast.
   */
  titulo?: string;
  
  /**
   * Mensaje del toast.
   */
  mensaje: string;
  
  /**
   * Icono personalizado.
   */
  icono?: React.ReactNode;
  
  /**
   * Duración en milisegundos antes de auto-cerrar.
   * @default 5000
   */
  duracion?: number;
  
  /**
   * Posición del toast.
   * @default 'top-right'
   */
  posicion?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  
  /**
   * Mostrar botón de cerrar.
   * @default true
   */
  mostrarBotonCerrar?: boolean;
  
  /**
   * Callback al cerrar.
   */
  onClose?: () => void;
  
  /**
   * Acción personalizada.
   */
  accion?: {
    texto: string;
    onClick: () => void;
  };
  
  /**
   * Controla la visibilidad.
   */
  visible?: boolean;
  
  /**
   * Variante de tema.
   * @default 'light'
   */
  variant?: 'light' | 'dark';
  
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Iconos por defecto para cada tipo.
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
 * Componente Toast para notificaciones temporales.
 * 
 * Características:
 * - 4 tipos: success, error, warning, info
 * - Auto-cierre configurable
 * - 6 posiciones disponibles
 * - Acción personalizable
 * - Animaciones suaves
 * - Totalmente accesible
 */
export const Toast: React.FC<ToastProps> = ({
  tipo = 'info',
  titulo,
  mensaje,
  icono,
  duracion = 5000,
  posicion = 'top-right',
  mostrarBotonCerrar = true,
  onClose,
  accion,
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
    if (!isVisible || duracion === 0) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duracion);

    return () => clearTimeout(timer);
  }, [isVisible, duracion]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Duración de la animación de salida
  };

  if (!isVisible) return null;

  const toastClasses = [
    styles.toast,
    styles[tipo],
    styles[posicion],
    styles[variant],
    isExiting && styles.exiting,
    className
  ].filter(Boolean).join(' ');

  const iconToShow = icono || defaultIcons[tipo];

  return (
    <div className={toastClasses} role="alert" aria-live="polite">
      <div className={styles.iconContainer}>
        {iconToShow}
      </div>
      
      <div className={styles.contenido}>
        {titulo && (
          <Typography variant="h4" theme={variant} className={styles.titulo}>
            {titulo}
          </Typography>
        )}
        <Typography variant="p" theme={variant} className={styles.mensaje}>
          {mensaje}
        </Typography>
        
        {accion && (
          <Button
            size="small"
            buttonStyle="ghost"
            onClick={accion.onClick}
            className={styles.accionButton}
          >
            {accion.texto}
          </Button>
        )}
      </div>
      
      {mostrarBotonCerrar && (
        <Button
          size="small"
          buttonStyle="ghost"
          circular
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Cerrar notificación"
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
 * Hook para gestionar toasts de forma programática.
 * 
 * @example
 * ```tsx
 * const { mostrarToast } = useToast();
 * 
 * mostrarToast({
 *   tipo: 'success',
 *   mensaje: '¡Guardado!'
 * });
 * ```
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const mostrarToast = (props: Omit<ToastProps, 'visible' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...props, id, visible: true }]);
  };

  const cerrarToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return {
    toasts,
    mostrarToast,
    cerrarToast,
  };
};
