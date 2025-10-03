import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/ProgressBar.module.css';

/**
 * Progress bar with thematic styles and optional percentage.
 *
 * @example
 * ```tsx
 * <ProgressBar progress={65} variant="dark" showPercentage />
 * ```
 */
export interface ProgressBarProps {
  /**
   * Progress percentage (0-100).
   */
  progress: number;
  /**
   * Visual theme (light, dark, holographic).
   */
  variant?: 'light' | 'dark' | 'holographic';
  /**
   * Show percentage as text.
   */
  showPercentage?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * `ProgressBar` component.
 *
 * @param {ProgressBarProps} props - Component props.
 * @returns {React.ReactElement} - JSX element of the component.
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
      {/* Progress bar in percentage */}
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