import React from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Alert.module.css';

/**
 * Props del componente `Alert`.
 * Mensaje de alerta o notificación destacada.
 * 
 * @example
 * ```tsx
 * <Alert
 *   tipo="success"
 *   titulo="¡Éxito!"
 *   mensaje="La operación se completó correctamente"
 *   cerrable
 * />
 * ```
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tipo de alerta.
   * @default 'info'
   */
  tipo?: 'success' | 'error' | 'warning' | 'info';
  
  /**
   * Título de la alerta.
   */
  titulo?: string;
  
  /**
   * Mensaje de la alerta.
   */
  mensaje?: string;
  
  /**
   * Contenido personalizado (reemplaza mensaje).
   */
  children?: React.ReactNode;
  
  /**
   * Icono personalizado.
   */
  icono?: React.ReactNode;
  
  /**
   * Mostrar icono por defecto.
   * @default true
   */
  mostrarIcono?: boolean;
  
  /**
   * Permitir cerrar la alerta.
   */
  cerrable?: boolean;
  
  /**
   * Callback al cerrar.
   */
  onClose?: () => void;
  
  /**
   * Variante de estilo.
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined' | 'subtle';
  
  /**
   * Acciones personalizadas (botones).
   */
  acciones?: React.ReactNode;
  
  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
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
 * Alert - Mensaje de alerta o notificación destacada.
 * 
 * Características:
 * - 4 tipos: success, error, warning, info
 * - 3 variantes: filled, outlined, subtle
 * - Iconos personalizables
 * - Cerrable
 * - Acciones personalizadas
 * - Totalmente accesible
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({
  tipo = 'info',
  titulo,
  mensaje,
  children,
  icono,
  mostrarIcono = true,
  cerrable = false,
  onClose,
  variant = 'filled',
  acciones,
  theme = 'light',
  className,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  const alertClasses = [
    styles.alert,
    styles[tipo],
    styles[variant],
    styles[theme],
    className
  ].filter(Boolean).join(' ');

  const iconToShow = icono || defaultIcons[tipo];

  return (
    <div
      ref={ref}
      className={alertClasses}
      role="alert"
      {...props}
    >
      {mostrarIcono && (
        <div className={styles.iconContainer}>
          {iconToShow}
        </div>
      )}
      
      <div className={styles.contenido}>
        {titulo && (
          <Typography variant="h4" theme={theme} className={styles.titulo}>
            {titulo}
          </Typography>
        )}
        {mensaje && (
          <Typography variant="p" theme={theme} className={styles.mensaje}>
            {mensaje}
          </Typography>
        )}
        {children}
        
        {acciones && (
          <div className={styles.acciones}>
            {acciones}
          </div>
        )}
      </div>
      
      {cerrable && (
        <Button
          size="small"
          buttonStyle="ghost"
          circular
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Cerrar alerta"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </Button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';
