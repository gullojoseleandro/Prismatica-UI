import React, { useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Tooltip.module.css';

export interface TooltipProps {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'light' | 'dark' | 'holographic';
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  variant = 'light',
  children,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipClasses = [
    styles.tooltip,
    styles[variant],
    styles[position],
    isVisible && styles.visible,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={styles.tooltipWrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      <div className={tooltipClasses}>
        <Typography variant="span" theme={variant}>
          {content}
        </Typography>
      </div>
    </div>
  );
};

