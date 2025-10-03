import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Button.module.css';

/**
 * Props del componente `Button`.
 * Botón extremadamente personalizable con múltiples opciones.
 * 
 * @example
 * ```tsx
 * <Button
 *   variant="dark"
 *   size="large"
 *   iconoIzquierdo={<Save />}
 *   cargando={isLoading}
 *   fullWidth
 * >
 *   Guardar Cambios
 * </Button>
 * ```
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Tema visual del botón.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Tamaño del botón.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Animación del botón.
   * @default 'none'
   */
  animation?: 'pulse' | 'shake' | 'glow' | 'wave' | 'none';
  
  /**
   * Estilo del botón: 'solid', 'outline', 'ghost', 'link'.
   * @default 'solid'
   */
  buttonStyle?: 'solid' | 'outline' | 'ghost' | 'link';
  
  /**
   * Icono a mostrar a la izquierda del texto.
   */
  iconoIzquierdo?: React.ReactNode;
  
  /**
   * Icono a mostrar a la derecha del texto.
   */
  iconoDerecho?: React.ReactNode;
  
  /**
   * Estado de carga. Muestra un spinner y deshabilita el botón.
   */
  cargando?: boolean;
  
  /**
   * Texto a mostrar durante la carga.
   */
  textoCargando?: string;
  
  /**
   * Icono personalizado para el estado de carga.
   */
  iconoCargando?: React.ReactNode;
  
  /**
   * Botón de ancho completo.
   */
  fullWidth?: boolean;
  
  /**
   * Botón circular (solo icono, sin texto).
   */
  circular?: boolean;
  
  /**
   * Forma del botón: 'rounded', 'square', 'pill'.
   * @default 'rounded'
   */
  forma?: 'rounded' | 'square' | 'pill';
  
  /**
   * Color personalizado del botón: 'primary', 'secondary', 'success', 'danger', 'warning', 'info'.
   */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * Mostrar sombra.
   */
  conSombra?: boolean;
  
  /**
   * Grupo de botones (para estilos especiales cuando están juntos).
   */
  enGrupo?: boolean;
}

/**
 * Botón extremadamente personalizable.
 * 
 * Características:
 * - Múltiples variantes y estilos (solid, outline, ghost, link)
 * - Iconos a izquierda y derecha
 * - Estado de carga con spinner
 * - Colores semánticos (success, danger, warning, etc.)
 * - Formas personalizables (rounded, square, pill, circular)
 * - Ancho completo opcional
 * - Animaciones
 * - Totalmente accesible
 * 
 * @returns Elemento `<button>` estilizado y accesible.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children,
  variant = 'light',
  size = 'medium',
  animation = 'none',
  buttonStyle = 'solid',
  iconoIzquierdo,
  iconoDerecho,
  cargando = false,
  textoCargando,
  iconoCargando,
  fullWidth = false,
  circular = false,
  forma = 'rounded',
  color,
  conSombra = false,
  enGrupo = false,
  className,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  // El botón está deshabilitado si está cargando o disabled
  const estaDeshabilitado = disabled || cargando;
  
  // Spinner por defecto para carga
  const spinnerPorDefecto = (
    <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
      <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
    </svg>
  );
  
  // Construcción de clases dinámicas
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    styles[buttonStyle],
    styles[forma],
    color && styles[`color-${color}`],
    animation !== 'none' && styles[`animate-${animation}`],
    fullWidth && styles.fullWidth,
    circular && styles.circular,
    conSombra && styles.conSombra,
    enGrupo && styles.enGrupo,
    estaDeshabilitado && styles.disabled,
    cargando && styles.cargando,
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      ref={ref} 
      className={buttonClasses} 
      disabled={estaDeshabilitado} 
      type={type}
      aria-busy={cargando}
      {...props}
    >
      {/* Contenido del botón */}
      <span className={styles.contenido}>
        {/* Icono de carga */}
        {cargando && (
          <span className={styles.iconoCargandoWrapper}>
            {iconoCargando || spinnerPorDefecto}
          </span>
        )}
        
        {/* Icono izquierdo */}
        {!cargando && iconoIzquierdo && (
          <span className={styles.iconoIzquierdo}>
            {iconoIzquierdo}
          </span>
        )}
        
        {/* Texto del botón */}
        {!circular && (
          <Typography variant="span" theme={variant} className={styles.texto}>
            {cargando && textoCargando ? textoCargando : children}
          </Typography>
        )}
        
        {/* Icono derecho */}
        {!cargando && iconoDerecho && (
          <span className={styles.iconoDerecho}>
            {iconoDerecho}
          </span>
        )}
      </span>
      
      {/* Elemento decorativo para animación wave */}
      {animation === 'wave' && <span className={styles.wave} aria-hidden="true"></span>}
    </button>
  );
});
Button.displayName = 'Button';