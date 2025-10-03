import React from 'react';
import styles from '@styles/Skeleton.module.css';

/**
 * Props del componente `Skeleton`.
 * Placeholder animado para contenido en carga.
 * 
 * @example
 * ```tsx
 * <Skeleton width="200px" height="20px" />
 * <Skeleton variant="circle" width="50px" height="50px" />
 * <Skeleton variant="text" lines={3} />
 * ```
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variante del skeleton.
   * @default 'rectangular'
   */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  
  /**
   * Ancho del skeleton.
   */
  width?: string | number;
  
  /**
   * Alto del skeleton.
   */
  height?: string | number;
  
  /**
   * Número de líneas (solo para variant="text").
   */
  lines?: number;
  
  /**
   * Animación del skeleton.
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | 'none';
  
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
 * Skeleton loader para estados de carga.
 * 
 * Características:
 * - Múltiples variantes (text, circular, rectangular, rounded)
 * - Animaciones (pulse, wave)
 * - Tamaños personalizables
 * - Soporte para múltiples líneas
 * - Temas claro y oscuro
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animation = 'pulse',
  theme = 'light',
  className,
  style,
  ...props
}, ref) => {
  const skeletonClasses = [
    styles.skeleton,
    styles[variant],
    styles[`animation-${animation}`],
    styles[theme],
    className
  ].filter(Boolean).join(' ');

  const skeletonStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  // Para variant="text" con múltiples líneas
  if (variant === 'text' && lines > 1) {
    return (
      <div className={styles.textContainer} ref={ref} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={skeletonClasses}
            style={{
              ...skeletonStyle,
              width: index === lines - 1 ? '80%' : '100%', // Última línea más corta
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={skeletonClasses}
      style={skeletonStyle}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';

/**
 * Props del componente `SkeletonCard`.
 * Skeleton predefinido para tarjetas.
 */
export interface SkeletonCardProps {
  /**
   * Mostrar imagen.
   * @default true
   */
  conImagen?: boolean;
  
  /**
   * Número de líneas de texto.
   * @default 3
   */
  lineasTexto?: number;
  
  /**
   * Mostrar avatar.
   */
  conAvatar?: boolean;
  
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
 * Skeleton predefinido para tarjetas.
 * 
 * Incluye imagen, avatar opcional y líneas de texto.
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  conImagen = true,
  lineasTexto = 3,
  conAvatar = false,
  theme = 'light',
  className,
}) => {
  return (
    <div className={`${styles.skeletonCard} ${className || ''}`}>
      {conImagen && (
        <Skeleton variant="rectangular" height="200px" theme={theme} />
      )}
      <div className={styles.skeletonCardContent}>
        {conAvatar && (
          <div className={styles.skeletonCardHeader}>
            <Skeleton variant="circular" width="40px" height="40px" theme={theme} />
            <div style={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height="16px" theme={theme} />
              <Skeleton variant="text" width="40%" height="12px" theme={theme} style={{ marginTop: '8px' }} />
            </div>
          </div>
        )}
        <Skeleton variant="text" lines={lineasTexto} theme={theme} />
      </div>
    </div>
  );
};
