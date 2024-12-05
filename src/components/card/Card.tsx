import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Card.module.css';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  variant = 'light',
  className,
  ...props
}) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {title && (
        <Typography variant="h2" theme={variant} className={styles.title}>
          {title}
        </Typography>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};