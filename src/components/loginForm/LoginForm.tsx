import React, { useState } from 'react';
import { Input } from '@components/input/Input';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/LoginForm.module.css';

/**
 * Props del componente `LoginForm`.
 * - `variant`: tema visual del formulario.
 * - `onSubmit`: callback con `email` y `password` al enviar.
 * - `className`: clases CSS adicionales.
 * @example
 * ```tsx
 * <LoginForm variant="dark" onSubmit={(e,p) => auth(e,p)} />
 * ```
 */
export interface LoginFormProps {
  /**
   * Tema visual del formulario.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Callback con `email` y `password` al enviar.
   */
  onSubmit: (email: string, password: string) => void;
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Formulario de login controlado con campos de correo y contraseña.
 * Accesibilidad: usa `type="email"` y `type="password"` y `required`.
 * @example
 * ```tsx
 * <LoginForm variant="dark" onSubmit={(e,p) => auth(e,p)} />
 * ```
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  variant = 'light',
  onSubmit,
  className,
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Manejo de envío: previene recarga y delega a la prop onSubmit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  const formClasses = [
    styles.loginForm,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <form className={formClasses} onSubmit={handleSubmit} {...props}>
      <Typography variant="h2" theme={variant} className={styles.title}>Login</Typography>
      <div className={styles.inputGroup}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant={variant}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant={variant}
          required
        />
      </div>
      <Button type="submit" variant={variant} className={styles.submitButton}>
        Log In
      </Button>
      <div className={styles.forgotPassword}>
        <Typography variant="span" theme={variant}>
          <a href="#" className={styles.link}>Forgot Password?</a>
        </Typography>
      </div>
    </form>
  );
};