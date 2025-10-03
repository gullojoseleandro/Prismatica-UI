import React from 'react';
import styles from '@styles/Container.module.css';

/**
 * Props del componente `Container`.
 * Contenedor responsive con anchos máximos predefinidos.
 * 
 * @example
 * ```tsx
 * <Container maxWidth="lg" centrado>
 *   <h1>Contenido</h1>
 * </Container>
 * ```
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Ancho máximo del contenedor.
   * @default 'lg'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  
  /**
   * Centrar el contenedor horizontalmente.
   * @default true
   */
  centrado?: boolean;
  
  /**
   * Padding horizontal.
   * @default 'normal'
   */
  padding?: 'none' | 'small' | 'normal' | 'large';
  
  /**
   * Hacer el contenedor fluido (sin max-width).
   */
  fluido?: boolean;
  
  /**
   * Clases CSS adicionales.
   */
  className?: string;
  
  /**
   * Contenido del contenedor.
   */
  children: React.ReactNode;
}

/**
 * Contenedor responsive con anchos máximos predefinidos.
 * 
 * Características:
 * - Anchos máximos responsive (xs, sm, md, lg, xl, 2xl)
 * - Centrado automático
 * - Padding personalizable
 * - Modo fluido
 * - Compatible con todos los breakpoints
 * 
 * Breakpoints:
 * - xs: 480px
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * - 2xl: 1536px
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({
  maxWidth = 'lg',
  centrado = true,
  padding = 'normal',
  fluido = false,
  className,
  children,
  ...props
}, ref) => {
  const containerClasses = [
    styles.container,
    !fluido && styles[`maxWidth-${maxWidth}`],
    centrado && styles.centrado,
    styles[`padding-${padding}`],
    fluido && styles.fluido,
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={containerClasses} {...props}>
      {children}
    </div>
  );
});

Container.displayName = 'Container';
