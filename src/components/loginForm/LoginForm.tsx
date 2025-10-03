import React, { useState } from 'react';
import { Input } from '@components/input/Input';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/LoginForm.module.css';

/**
 * Props del componente `LoginForm`.
 * Formulario de login extremadamente personalizable con múltiples opciones de diseño.
 * 
 * @example
 * ```tsx
 * <LoginForm 
 *   variant="dark" 
 *   onSubmit={(e,p) => auth(e,p)}
 *   titulo="Bienvenido"
 *   subtitulo="Inicia sesión en tu cuenta"
 *   logo={<img src="/logo.svg" alt="Logo" />}
 *   imagenLateral="/background.jpg"
 *   mostrarOlvidePassword
 *   textoBoton="Iniciar Sesión"
 * />
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
  
  /**
   * Título principal del formulario.
   * @default 'Login'
   */
  titulo?: string;
  
  /**
   * Subtítulo o descripción debajo del título.
   */
  subtitulo?: string;
  
  /**
   * Logo o imagen a mostrar encima del título.
   */
  logo?: React.ReactNode;
  
  /**
   * Imagen o contenido a mostrar en el lado derecho del formulario.
   */
  imagenLateral?: string | React.ReactNode;
  
  /**
   * Placeholder personalizado para el campo de email.
   * @default 'Email'
   */
  placeholderEmail?: string;
  
  /**
   * Placeholder personalizado para el campo de contraseña.
   * @default 'Password'
   */
  placeholderPassword?: string;
  
  /**
   * Texto del botón de submit.
   * @default 'Log In'
   */
  textoBoton?: string;
  
  /**
   * Mostrar enlace de "Olvidé mi contraseña".
   * @default true
   */
  mostrarOlvidePassword?: boolean;
  
  /**
   * Texto personalizado para el enlace de olvidé contraseña.
   * @default 'Forgot Password?'
   */
  textoOlvidePassword?: string;
  
  /**
   * Callback al hacer click en "Olvidé mi contraseña".
   */
  onOlvidePassword?: () => void;
  
  /**
   * Footer personalizado debajo del formulario.
   */
  footer?: React.ReactNode;
  
  /**
   * Mostrar divisor con texto "O continuar con".
   */
  mostrarDivisorSocial?: boolean;
  
  /**
   * Botones de redes sociales u otros métodos de autenticación.
   */
  botonesRedesSociales?: React.ReactNode;
  
  /**
   * Texto del divisor social.
   * @default 'O continuar con'
   */
  textoDivisorSocial?: string;
  
  /**
   * Mostrar checkbox de "Recordarme".
   */
  mostrarRecordarme?: boolean;
  
  /**
   * Texto del checkbox recordarme.
   * @default 'Recordarme'
   */
  textoRecordarme?: string;
  
  /**
   * Callback cuando cambia el estado de recordarme.
   */
  onRecordarmeChange?: (recordar: boolean) => void;
  
  /**
   * Deshabilitar el formulario (útil durante carga).
   */
  deshabilitado?: boolean;
  
  /**
   * Mostrar estado de carga en el botón.
   */
  cargando?: boolean;
  
  /**
   * Mensaje de error a mostrar.
   */
  mensajeError?: string;
  
  /**
   * Layout del formulario: 'centrado' o 'con-imagen-lateral'.
   * @default 'centrado'
   */
  layout?: 'centrado' | 'con-imagen-lateral';
}

/**
 * Formulario de login extremadamente personalizable.
 * 
 * Características:
 * - Título, subtítulo y logo personalizables
 * - Imagen lateral opcional
 * - Botones de redes sociales
 * - Checkbox de recordarme
 * - Estados de carga y error
 * - Footer personalizable
 * - Múltiples layouts
 * 
 * Accesibilidad: usa `type="email"` y `type="password"` y `required`.
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  variant = 'light',
  onSubmit,
  className,
  titulo = 'Login',
  subtitulo,
  logo,
  imagenLateral,
  placeholderEmail = 'Email',
  placeholderPassword = 'Password',
  textoBoton = 'Log In',
  mostrarOlvidePassword = true,
  textoOlvidePassword = 'Forgot Password?',
  onOlvidePassword,
  footer,
  mostrarDivisorSocial = false,
  botonesRedesSociales,
  textoDivisorSocial = 'O continuar con',
  mostrarRecordarme = false,
  textoRecordarme = 'Recordarme',
  onRecordarmeChange,
  deshabilitado = false,
  cargando = false,
  mensajeError,
  layout = 'centrado',
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recordarme, setRecordarme] = useState(false);

  // Manejo de envío: previene recarga y delega a la prop onSubmit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deshabilitado && !cargando) {
      onSubmit(email, password);
    }
  };

  // Manejo del checkbox recordarme
  const handleRecordarmeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoValor = e.target.checked;
    setRecordarme(nuevoValor);
    if (onRecordarmeChange) {
      onRecordarmeChange(nuevoValor);
    }
  };

  // Manejo del enlace olvidé contraseña
  const handleOlvidePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOlvidePassword) {
      onOlvidePassword();
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

  // Contenido del formulario
  const formularioContenido = (
    <form className={formClasses} onSubmit={handleSubmit} {...props}>
      {/* Logo */}
      {logo && <div className={styles.logoContainer}>{logo}</div>}
      
      {/* Título y subtítulo */}
      <div className={styles.headerContainer}>
        <Typography variant="h2" theme={variant} className={styles.title}>
          {titulo}
        </Typography>
        {subtitulo && (
          <Typography variant="p" theme={variant} className={styles.subtitulo}>
            {subtitulo}
          </Typography>
        )}
      </div>

      {/* Mensaje de error */}
      {mensajeError && (
        <div className={styles.errorMessage} role="alert">
          <Typography variant="span" theme={variant}>
            {mensajeError}
          </Typography>
        </div>
      )}

      {/* Campo de email */}
      <div className={styles.inputGroup}>
        <Input
          type="email"
          placeholder={placeholderEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant={variant}
          required
          disabled={deshabilitado || cargando}
          state={mensajeError ? 'error' : 'default'}
        />
      </div>

      {/* Campo de contraseña */}
      <div className={styles.inputGroup}>
        <Input
          type="password"
          placeholder={placeholderPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant={variant}
          required
          disabled={deshabilitado || cargando}
          state={mensajeError ? 'error' : 'default'}
        />
      </div>

      {/* Recordarme y Olvidé contraseña */}
      {(mostrarRecordarme || mostrarOlvidePassword) && (
        <div className={styles.optionsRow}>
          {mostrarRecordarme && (
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={recordarme}
                onChange={handleRecordarmeChange}
                disabled={deshabilitado || cargando}
                className={styles.checkbox}
              />
              <Typography variant="span" theme={variant} className={styles.checkboxText}>
                {textoRecordarme}
              </Typography>
            </label>
          )}
          {mostrarOlvidePassword && (
            <div className={styles.forgotPassword}>
              <Typography variant="span" theme={variant}>
                <a 
                  href="#" 
                  className={styles.link}
                  onClick={handleOlvidePassword}
                >
                  {textoOlvidePassword}
                </a>
              </Typography>
            </div>
          )}
        </div>
      )}

      {/* Botón de submit */}
      <Button 
        type="submit" 
        variant={variant} 
        className={styles.submitButton}
        disabled={deshabilitado || cargando}
      >
        {cargando ? 'Cargando...' : textoBoton}
      </Button>

      {/* Divisor social */}
      {mostrarDivisorSocial && (
        <div className={styles.divisorSocial}>
          <span className={styles.divisorLinea}></span>
          <Typography variant="span" theme={variant} className={styles.divisorTexto}>
            {textoDivisorSocial}
          </Typography>
          <span className={styles.divisorLinea}></span>
        </div>
      )}

      {/* Botones de redes sociales */}
      {botonesRedesSociales && (
        <div className={styles.botonesRedesSociales}>
          {botonesRedesSociales}
        </div>
      )}

      {/* Footer personalizado */}
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </form>
  );

  // Si hay imagen lateral, usar layout especial
  if (layout === 'con-imagen-lateral' && imagenLateral) {
    return (
      <div className={containerClasses}>
        <div className={styles.formSection}>
          {formularioContenido}
        </div>
        <div className={styles.imagenLateralSection}>
          {typeof imagenLateral === 'string' ? (
            <img src={imagenLateral} alt="" className={styles.imagenLateral} />
          ) : (
            imagenLateral
          )}
        </div>
      </div>
    );
  }

  // Layout centrado por defecto
  return (
    <div className={containerClasses}>
      {formularioContenido}
    </div>
  );
};