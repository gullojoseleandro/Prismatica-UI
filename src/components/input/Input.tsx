import React from 'react';
import styles from '@styles/Input.module.css';

/**
 * Props del componente `Input`.
 * Campo de entrada extremadamente personalizable con múltiples opciones.
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Correo electrónico"
 *   placeholder="tu@email.com"
 *   variant="dark"
 *   inputSize="large"
 *   iconoIzquierdo={<Mail />}
 *   mensajeAyuda="Ingresa tu correo registrado"
 *   required
 * />
 * ```
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Tema visual del input.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Tamaño del input.
   * @default 'medium'
   */
  inputSize?: 'small' | 'medium' | 'large';
  
  /**
   * Estado visual del input.
   * @default 'default'
   */
  state?: 'default' | 'error' | 'warning' | 'success';
  
  /**
   * Label o etiqueta del input.
   */
  label?: string;
  
  /**
   * Icono a mostrar a la izquierda del input.
   */
  iconoIzquierdo?: React.ReactNode;
  
  /**
   * Icono a mostrar a la derecha del input.
   */
  iconoDerecho?: React.ReactNode;
  
  /**
   * Mensaje de ayuda debajo del input.
   */
  mensajeAyuda?: string;
  
  /**
   * Mensaje de error a mostrar.
   */
  mensajeError?: string;
  
  /**
   * Mensaje de advertencia a mostrar.
   */
  mensajeAdvertencia?: string;
  
  /**
   * Mensaje de éxito a mostrar.
   */
  mensajeExito?: string;
  
  /**
   * Mostrar contador de caracteres.
   */
  mostrarContador?: boolean;
  
  /**
   * Longitud máxima para el contador.
   */
  maxLength?: number;
  
  /**
   * Mostrar indicador de campo requerido en el label.
   */
  mostrarRequerido?: boolean;
  
  /**
   * Tooltip informativo al lado del label.
   */
  tooltip?: string;
  
  /**
   * Clase CSS adicional para el contenedor.
   */
  containerClassName?: string;
  
  /**
   * Clase CSS adicional para el label.
   */
  labelClassName?: string;
}

/**
 * Campo de entrada extremadamente personalizable.
 * 
 * Características:
 * - Label con indicador de requerido
 * - Iconos a izquierda y derecha
 * - Mensajes de ayuda, error, advertencia y éxito
 * - Contador de caracteres
 * - Tooltip informativo
 * - Múltiples estados visuales
 * - Totalmente accesible
 * 
 * Accesibilidad: 
 * - Usa aria-invalid cuando hay error
 * - Usa aria-describedby para mensajes
 * - Label asociado con id único
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ 
  variant = 'light',
  inputSize = 'medium',
  state = 'default',
  className,
  containerClassName,
  labelClassName,
  label,
  iconoIzquierdo,
  iconoDerecho,
  mensajeAyuda,
  mensajeError,
  mensajeAdvertencia,
  mensajeExito,
  mostrarContador = false,
  maxLength,
  mostrarRequerido = false,
  tooltip,
  value,
  ...props
}, ref) => {
  // Generar ID único para accesibilidad
  const inputId = React.useId();
  const mensajeId = `${inputId}-mensaje`;
  
  // Determinar el estado basado en los mensajes
  let estadoFinal = state;
  if (mensajeError) estadoFinal = 'error';
  else if (mensajeAdvertencia) estadoFinal = 'warning';
  else if (mensajeExito) estadoFinal = 'success';
  
  // Determinar qué mensaje mostrar
  const mensajeMostrar = mensajeError || mensajeAdvertencia || mensajeExito || mensajeAyuda;
  
  // Calcular longitud actual para el contador
  const longitudActual = typeof value === 'string' ? value.length : 0;
  
  // Clases dinámicas
  const containerClasses = [
    styles.inputContainer,
    containerClassName
  ].filter(Boolean).join(' ');
  
  const wrapperClasses = [
    styles.inputWrapper,
    styles[variant],
    styles[inputSize],
    styles[estadoFinal],
    iconoIzquierdo ? styles.conIconoIzquierdo : '',
    iconoDerecho ? styles.conIconoDerecho : ''
  ].filter(Boolean).join(' ');
  
  const inputClasses = [
    styles.input,
    className
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    styles.label,
    styles[variant],
    labelClassName
  ].filter(Boolean).join(' ');
  
  const ariaInvalid = estadoFinal === 'error' ? true : undefined;
  const ariaDescribedBy = mensajeMostrar ? mensajeId : undefined;

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          <span className={styles.labelTexto}>
            {label}
            {mostrarRequerido && <span className={styles.requerido}>*</span>}
          </span>
          {tooltip && (
            <span className={styles.tooltip} title={tooltip}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </span>
          )}
        </label>
      )}
      
      {/* Input wrapper con iconos */}
      <div className={wrapperClasses}>
        {iconoIzquierdo && (
          <span className={styles.iconoIzquierdo}>
            {iconoIzquierdo}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        
        {iconoDerecho && (
          <span className={styles.iconoDerecho}>
            {iconoDerecho}
          </span>
        )}
      </div>
      
      {/* Mensaje de ayuda/error/advertencia/éxito */}
      {mensajeMostrar && (
        <div 
          id={mensajeId} 
          className={`${styles.mensaje} ${styles[`mensaje-${estadoFinal}`]}`}
          role={estadoFinal === 'error' ? 'alert' : 'status'}
        >
          {mensajeMostrar}
        </div>
      )}
      
      {/* Contador de caracteres */}
      {mostrarContador && maxLength && (
        <div className={styles.contador}>
          {longitudActual} / {maxLength}
        </div>
      )}
    </div>
  );
});
Input.displayName = 'Input';