import React from 'react';
import styles from '@styles/Spacer.module.css';

/**
 * Props del componente `Spacer`.
 * Espacio flexible entre elementos.
 * 
 * @example
 * ```tsx
 * <Spacer size="large" />
 * <Spacer size="20px" />
 * <Spacer axis="horizontal" />
 * ```
 */
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tamaño del espacio.
   * Puede ser un preset o un valor personalizado.
   * @default 'normal'
   */
  size?: 'xs' | 'small' | 'normal' | 'large' | 'xl' | '2xl' | string | number;
  
  /**
   * Eje del espacio.
   * @default 'vertical'
   */
  axis?: 'vertical' | 'horizontal';
  
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Spacer - Espacio flexible entre elementos.
 * 
 * Características:
 * - Presets de tamaño (xs, small, normal, large, xl, 2xl)
 * - Tamaños personalizados
 * - Eje vertical u horizontal
 * - Útil para layouts flexibles
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(({
  size = 'normal',
  axis = 'vertical',
  className,
  style,
  ...props
}, ref) => {
  const presets = ['xs', 'small', 'normal', 'large', 'xl', '2xl'];
  const isPreset = typeof size === 'string' && presets.includes(size);
  
  const spacerClasses = [
    styles.spacer,
    styles[axis],
    isPreset && styles[`size-${size}`],
    className
  ].filter(Boolean).join(' ');

  const customStyle: React.CSSProperties = {};
  
  if (!isPreset) {
    const sizeValue = typeof size === 'number' ? `${size}px` : size;
    if (axis === 'vertical') {
      customStyle.height = sizeValue;
    } else {
      customStyle.width = sizeValue;
    }
  }

  return (
    <div
      ref={ref}
      className={spacerClasses}
      style={{ ...customStyle, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
});

Spacer.displayName = 'Spacer';
