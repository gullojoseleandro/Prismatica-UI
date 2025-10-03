import React from 'react';
import styles from '@styles/Skeleton.module.css';

/**
 * Props for the `Skeleton` component.
 * Animated placeholder for loading content.
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
   * Skeleton variant.
   * @default 'rectangular'
   */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  
  /**
   * Skeleton width.
   */
  width?: string | number;
  
  /**
   * Skeleton height.
   */
  height?: string | number;
  
  /**
   * Number of lines (only for variant="text").
   */
  lines?: number;
  
  /**
   * Skeleton animation.
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | 'none';
  
  /**
   * Visual theme.
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Skeleton loader for loading states.
 * 
 * Features:
 * - Multiple variants (text, circular, rectangular, rounded)
 * - Animations (pulse, wave)
 * - Customizable sizes
 * - Support for multiple lines
 * - Light and dark themes
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

  // For variant="text" with multiple lines
  if (variant === 'text' && lines > 1) {
    return (
      <div className={styles.textContainer} ref={ref} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={skeletonClasses}
            style={{
              ...skeletonStyle,
              width: index === lines - 1 ? '80%' : '100%', // Last line shorter
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
 * Props for the `SkeletonCard` component.
 * Predefined skeleton for cards.
 */
export interface SkeletonCardProps {
  /**
   * Show image.
   * @default true
   */
  withImage?: boolean;
  
  /**
   * Number of text lines.
   * @default 3
   */
  textLines?: number;
  
  /**
   * Show avatar.
   */
  withAvatar?: boolean;
  
  /**
   * Visual theme.
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Predefined skeleton for cards.
 * 
 * Includes image, optional avatar, and text lines.
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  withImage = true,
  textLines = 3,
  withAvatar = false,
  theme = 'light',
  className,
}) => {
  return (
    <div className={`${styles.skeletonCard} ${className || ''}`}>
      {withImage && (
        <Skeleton variant="rectangular" height="200px" theme={theme} />
      )}
      <div className={styles.skeletonCardContent}>
        {withAvatar && (
          <div className={styles.skeletonCardHeader}>
            <Skeleton variant="circular" width="40px" height="40px" theme={theme} />
            <div style={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height="16px" theme={theme} />
              <Skeleton variant="text" width="40%" height="12px" theme={theme} style={{ marginTop: '8px' }} />
            </div>
          </div>
        )}
        <Skeleton variant="text" lines={textLines} theme={theme} />
      </div>
    </div>
  );
};
