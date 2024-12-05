import React, { useState } from 'react';
import { Input } from '@components/input/Input';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/LoginForm.module.css';

export interface LoginFormProps {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  onSubmit: (email: string, password: string) => void;
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  variant = 'light',
  onSubmit,
  className,
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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