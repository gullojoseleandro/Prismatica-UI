import React from 'react';
import { Typography } from '@components/typography/Typography';
import { Button } from '@components/Button/Button';
import styles from '@styles/Navbar.module.css';

export interface NavbarProps {
  logo?: React.ReactNode;
  title?: string;
  menuItems: Array<{ label: string; href: string }>;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  title,
  menuItems,
  variant = 'light',
  className,
  ...props
}) => {
  const navbarClasses = [
    styles.navbar,
    styles[variant],
    variant.startsWith('transparent') ? styles.transparent : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <nav className={navbarClasses} {...props}>
      <div className={styles.navbarBrand}>
        {logo && <div className={styles.logo}>{logo}</div>}
        {title && <Typography variant="h1" theme={variant} className={styles.title}>{title}</Typography>}
      </div>
      <ul className={styles.navbarMenu}>
        {menuItems.map((item, index) => (
          <li key={index} className={styles.navbarMenuItem}>
            <a href={item.href} className={styles.navbarMenuLink}>
              <Typography variant="span" theme={variant}>{item.label}</Typography>
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.navbarActions}>
        <Button variant={variant} size="small">Sign In</Button>
      </div>
    </nav>
  );
};