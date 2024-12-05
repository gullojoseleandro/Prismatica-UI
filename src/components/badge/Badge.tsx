import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Badge.module.css';

export interface BadgeProps {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'light',
  color = 'default',
  children,
  className,
  ...props
}) => {
  const badgeClasses = [
    styles.badge,
    styles[variant],
    styles[color],
    className
  ].filter(Boolean).join(' ');

  return (
    <Typography variant="span" className={badgeClasses} {...props}>
      {children}
    </Typography>
  );
};

