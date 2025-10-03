import React, { useState } from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Tooltip.module.css';

/**
 * Props del componente `Tooltip`.
 * - `content`: texto a mostrar dentro del tooltip.
 * - `position`: posición relativa (top, right, bottom, left).
 * - `variant`: tema visual (light, dark, holographic).
 * - `children`: nodo disparador que muestra el tooltip al pasar el mouse.
 * - `className`: clases CSS adicionales.
 */
export interface TooltipProps {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'light' | 'dark' | 'holographic';
  children: React.ReactNode;
  className?: string;
}

/**
 * Tooltip simple basado en eventos de mouse.
 *
 * @example
 * ```tsx
 * <Tooltip content="Información" position="top">
 *   <button>Hover</button>
 * </Tooltip>
 * ```
 */
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
      // Mostrar/ocultar tooltip según interacción
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

