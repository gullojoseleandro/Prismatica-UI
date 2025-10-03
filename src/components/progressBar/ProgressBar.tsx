import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/ProgressBar.module.css';

/**
 * Barra de progreso con estilos temáticos y porcentaje opcional.
 *
 * @example
 * ```tsx
 * <ProgressBar progress={65} variant="dark" showPercentage />
 * ```
 */
export interface ProgressBarProps {
  /**
   * Porcentaje de avance (0-100).
   */
  progress: number;
  /**
   * Tema visual (light, dark, holographic).
   */
  variant?: 'light' | 'dark' | 'holographic';
  /**
   * Mostrar el porcentaje como texto.
   */
  showPercentage?: boolean;
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Componente `ProgressBar`.
 *
 * @param {ProgressBarProps} props - Props del componente.
 * @returns {React.ReactElement} - Elemento JSX del componente.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'light',
  showPercentage = false,
  className,
  ...props
}) => {
  const progressBarClasses = [
    styles.progressBar,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={progressBarClasses} {...props}>
      {/* Trazo de avance en porcentaje */}
      <div 
        className={styles.progress} 
        style={{ width: `${progress}%` }}
      />
      {showPercentage && (
        <Typography 
          variant="span" 
          theme={variant}
          className={styles.percentage}
        >
          {`${progress}%`}
        </Typography>
      )}
    </div>
  );
};