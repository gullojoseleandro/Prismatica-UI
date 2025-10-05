import React, { useState } from 'react';
import { Input } from '@components/input/Input';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/LoginForm.module.css';

/**
 * Props for the `LoginForm` component.
 * Extremely customizable login form with multiple layout options.
 * 
 * @example
 * ```tsx
 * <LoginForm 
 *   variant="dark" 
 *   onSubmit={(e,p) => auth(e,p)}
 *   title="Welcome Back"
 *   subtitle="Sign in to your account"
 *   logo={<img src="/logo.svg" alt="Logo" />}
 *   sideImage="/background.jpg"
 *   showForgotPassword
 *   buttonText="Sign In"
 * />
 * ```
 */
export interface LoginFormProps {
  /**
   * Visual theme for the form.
   * @defaultValue 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  
  /**
   * Callback with `email` and `password` on submit.
   */
  onSubmit: (email: string, password: string) => void;
  
  /**
   * Additional CSS classes.
   */
  className?: string;
  
  /**
   * Main title of the form.
   * @defaultValue 'Login'
   */
  title?: string;
  
  /**
   * Subtitle or description below the title.
   */
  subtitle?: string;
  
  /**
   * Logo or image to display above the title.
   */
  logo?: React.ReactNode;
  
  /**
   * Image or content to display on the right side of the form.
   */
  sideImage?: string | React.ReactNode;
  
  /**
   * Custom placeholder for the email field.
   * @defaultValue 'Email'
   */
  emailPlaceholder?: string;
  
  /**
   * Custom placeholder for the password field.
   * @defaultValue 'Password'
   */
  passwordPlaceholder?: string;
  
  /**
   * Text for the submit button.
   * @defaultValue 'Log In'
   */
  buttonText?: string;
  
  /**
   * Show "Forgot Password" link.
   * @defaultValue true
   */
  showForgotPassword?: boolean;
  
  /**
   * Custom text for the forgot password link.
   * @defaultValue 'Forgot Password?'
   */
  forgotPasswordText?: string;
  
  /**
   * Callback when clicking "Forgot Password".
   */
  onForgotPassword?: () => void;
  
  /**
   * Custom footer below the form.
   */
  footer?: React.ReactNode;
  
  /**
   * Show divider with "Or continue with" text.
   */
  showSocialDivider?: boolean;
  
  /**
   * Social media buttons or other authentication methods.
   */
  socialButtons?: React.ReactNode;
  
  /**
   * Text for the social divider.
   * @defaultValue 'Or continue with'
   */
  socialDividerText?: string;
  
  /**
   * Show "Remember me" checkbox.
   */
  showRememberMe?: boolean;
  
  /**
   * Text for the remember me checkbox.
   * @defaultValue 'Remember me'
   */
  rememberMeText?: string;
  
  /**
   * Callback when remember me state changes.
   */
  onRememberMeChange?: (remember: boolean) => void;
  
  /**
   * Disable the form (useful during loading).
   */
  disabled?: boolean;
  
  /**
   * Show loading state on the button.
   */
  loading?: boolean;
  
  /**
   * Error message to display.
   */
  errorMessage?: string;
  
  /**
   * Form layout: 'centered' or 'with-side-image'.
   * @defaultValue 'centered'
   */
  layout?: 'centered' | 'with-side-image';
}

/**
 * Extremely customizable login form component.
 * 
 * Features:
 * - Customizable title, subtitle, and logo
 * - Optional side image
 * - Social media buttons
 * - Remember me checkbox
 * - Loading and error states
 * - Customizable footer
 * - Multiple layouts
 * 
 * Accessibility: uses `type="email"`, `type="password"`, and `required`.
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  variant = 'light',
  onSubmit,
  className,
  title = 'Login',
  subtitle,
  logo,
  sideImage,
  emailPlaceholder = 'Email',
  passwordPlaceholder = 'Password',
  buttonText = 'Log In',
  showForgotPassword = true,
  forgotPasswordText = 'Forgot Password?',
  onForgotPassword,
  footer,
  showSocialDivider = false,
  socialButtons,
  socialDividerText = 'Or continue with',
  showRememberMe = false,
  rememberMeText = 'Remember me',
  onRememberMeChange,
  disabled = false,
  loading = false,
  errorMessage,
  layout = 'centered',
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Handle form submission: prevents reload and delegates to onSubmit prop
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled && !loading) {
      onSubmit(email, password);
    }
  };

  // Handle remember me checkbox change
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setRememberMe(newValue);
    if (onRememberMeChange) {
      onRememberMeChange(newValue);
    }
  };

  // Handle forgot password link click
  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  const containerClasses = [
    styles.loginFormContainer,
    styles[layout],
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  const formClasses = [
    styles.loginForm,
    styles[variant]
  ].filter(Boolean).join(' ');

  // Form content
  const formContent = (
    <form className={formClasses} onSubmit={handleSubmit} {...props}>
      {/* Logo */}
      {logo && <div className={styles.logoContainer}>{logo}</div>}
      
      {/* Title and subtitle */}
      <div className={styles.headerContainer}>
        <Typography variant="h1" theme={variant} className={styles.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="p" theme={variant} className={styles.subtitle}>
            {subtitle}
          </Typography>
        )}
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className={styles.errorMessage} role="alert">
          <Typography variant="p" theme={variant}>
            {errorMessage}
          </Typography>
        </div>
      )}

      {/* Email field */}
      <div className={styles.inputGroup}>
        <Input
          type="email"
          placeholder={emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant={variant}
          required
          disabled={disabled || loading}
          state={errorMessage ? 'error' : 'default'}
        />
      </div>

      {/* Password field */}
      <div className={styles.inputGroup}>
        <Input
          type="password"
          placeholder={passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant={variant}
          required
          disabled={disabled || loading}
          state={errorMessage ? 'error' : 'default'}
        />
      </div>

      {/* Remember me and Forgot password */}
      {(showRememberMe || showForgotPassword) && (
        <div className={styles.optionsRow}>
          {showRememberMe && (
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                disabled={disabled || loading}
                className={styles.checkbox}
              />
              <Typography variant="span" theme={variant} className={styles.checkboxText}>
                {rememberMeText}
              </Typography>
            </label>
          )}
          {showForgotPassword && (
            <div className={styles.forgotPassword}>
              <Typography variant="span" theme={variant}>
                <a 
                  href="#" 
                  className={styles.link}
                  onClick={handleForgotPassword}
                >
                  {forgotPasswordText}
                </a>
              </Typography>
            </div>
          )}
        </div>
      )}

      {/* Submit button */}
      <Button 
        type="submit" 
        variant={variant} 
        className={styles.submitButton}
        disabled={disabled || loading}
      >
        {loading ? 'Loading...' : buttonText}
      </Button>

      {/* Social divider */}
      {showSocialDivider && (
        <div className={styles.socialDivider}>
          <span className={styles.dividerLine}></span>
          <Typography variant="span" theme={variant} className={styles.dividerText}>
            {socialDividerText}
          </Typography>
          <span className={styles.dividerLine}></span>
        </div>
      )}

      {/* Social media buttons */}
      {socialButtons && (
        <div className={styles.socialButtons}>
          {socialButtons}
        </div>
      )}

      {/* Custom footer */}
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </form>
  );

  // If there's a side image, use special layout
  if (layout === 'with-side-image' && sideImage) {
    return (
      <div className={containerClasses}>
        <div className={styles.formSection}>
          {formContent}
        </div>
        <div className={styles.sideImageSection}>
          {typeof sideImage === 'string' ? (
            <img src={sideImage} alt="" className={styles.sideImage} />
          ) : (
            sideImage
          )}
        </div>
      </div>
    );
  }

  // Centered layout by default
  return (
    <div className={containerClasses}>
      {formContent}
    </div>
  );
};