import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Stepper.module.css';

/**
 * Paso individual dentro del `Stepper`.
 * - `label`: título del paso.
 * - `description`: texto opcional descriptivo.
 */
export interface Step {
  label: string;
  description?: string;
}

/**
 * Props del componente `Stepper`.
 * - `steps`: lista de pasos a mostrar.
 * - `activeStep`: índice del paso activo (0-indexed).
 * - `variant`: tema visual.
 * - `className`: clases CSS adicionales.
 */
export interface StepperProps {
  steps: Step[];
  activeStep: number;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Indicador de progreso por pasos (Stepper).
 *
 * @example
 * ```tsx
 * <Stepper
 *   steps={[{label:'Inicio'}, {label:'Datos'}, {label:'Confirmación'}]}
 *   activeStep={1}
 * />
 * ```
 */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  variant = 'light',
  className,
  ...props
}) => {
  // Clases dinámicas por tema
  const stepperClasses = [
    styles.stepper,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={stepperClasses} {...props}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${styles.step} ${index <= activeStep ? styles.active : ''}`}
        >
          <div className={styles.stepIcon}>{index + 1}</div>
          <div className={styles.stepContent}>
            <Typography variant="h3" theme={variant} className={styles.stepLabel}>
              {step.label}
            </Typography>
            {step.description && (
              <Typography variant="p" theme={variant} className={styles.stepDescription}>
                {step.description}
              </Typography>
            )}
          </div>
          {index < steps.length - 1 && <div className={styles.stepConnector} />}
        </div>
      ))}
    </div>
  );
};
