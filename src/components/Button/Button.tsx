import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  size?: 'small' | 'medium' | 'large';
  animation?: 'pulse' | 'shake' | 'glow' | 'wave' | 'none';
}

/**
 * Botón reutilizable con variantes de estilo, tamaños y animaciones.
 * 
 * Props principales:
 * - variant: tema visual del botón (light, dark, holographic, transparent-*)
 * - size: tamaño (small, medium, large)
 * - animation: animación opcional (pulse, shake, glow, wave, none)
 * - type: por defecto "button" para evitar submits accidentales en formularios
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'light',
  size = 'medium',
  animation = 'none',
  className,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    animation !== 'none' && styles[`animate-${animation}`],
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button ref={ref} className={buttonClasses} disabled={disabled} type={type} {...props}>
      <Typography variant="span" theme={variant}>
        {children}
      </Typography>
      {animation === 'wave' && <span className={styles.wave} aria-hidden="true"></span>}
    </button>
  );
});
Button.displayName = 'Button';