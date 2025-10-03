import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Divider.module.css';

/**
 * Props del componente `Divider`.
 * Separador visual entre secciones.
 * 
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider texto="O" />
 * ```
 */
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orientación del divider.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Texto a mostrar en el divider.
   */
  texto?: string;
  
  /**
   * Alineación del texto.
   * @default 'center'
   */
  alineacionTexto?: 'left' | 'center' | 'right';
  
  /**
   * Grosor del divider.
   * @default 'thin'
   */
  grosor?: 'thin' | 'medium' | 'thick';
  
  /**
   * Estilo del divider.
   * @default 'solid'
   */
  estilo?: 'solid' | 'dashed' | 'dotted';
  
  /**
   * Tema visual.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'primary' | 'secondary';
  
  /**
   * Espaciado vertical (solo horizontal).
   * @default 'normal'
   */
  espaciado?: 'none' | 'small' | 'normal' | 'large';
  
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Divider - Separador visual entre secciones.
 * 
 * Características:
 * - Orientación horizontal y vertical
 * - Texto opcional
 * - Múltiples estilos (solid, dashed, dotted)
 * - Grosores personalizables
 * - Espaciado ajustable
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(({
  orientation = 'horizontal',
  texto,
  alineacionTexto = 'center',
  grosor = 'thin',
  estilo = 'solid',
  variant = 'light',
  espaciado = 'normal',
  className,
  ...props
}, ref) => {
  const dividerClasses = [
    styles.divider,
    styles[orientation],
    styles[`grosor-${grosor}`],
    styles[`estilo-${estilo}`],
    styles[variant],
    styles[`espaciado-${espaciado}`],
    texto && styles.conTexto,
    texto && styles[`texto-${alineacionTexto}`],
    className
  ].filter(Boolean).join(' ');

  if (texto && orientation === 'horizontal') {
    return (
      <div ref={ref} className={dividerClasses} role="separator" {...props}>
        <span className={styles.linea}></span>
        <Typography variant="span" className={styles.textoContenido}>
          {texto}
        </Typography>
        <span className={styles.linea}></span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={dividerClasses}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';
