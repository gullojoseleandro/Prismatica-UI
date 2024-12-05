import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/ProgressBar.module.css';

export interface ProgressBarProps {
  progress: number;
  variant?: 'light' | 'dark' | 'holographic';
  showPercentage?: boolean;
  className?: string;
}

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