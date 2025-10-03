import React from 'react';
import { Header } from '@components/header/Header';
import { Sidebar } from '@components/sidebar/Sidebar';
import { Card } from '@components/card/Card';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/DashboardTemplate.module.css';

/**
 * Props del componente `DashboardTemplate`.
 * - `variant`: tema visual global del dashboard.
 * - `className`: clases CSS adicionales.
 */
export interface DashboardTemplateProps {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Plantilla de Dashboard con `Header`, `Sidebar` y contenido principal.
 * Incluye secciones de Overview, Recent Activity y Quick Actions.
 *
 * @example
 * ```tsx
 * <DashboardTemplate variant="dark" />
 * ```
 */
export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  variant = 'light',
  className,
  ...props
}) => {
  const dashboardClasses = [
    styles.dashboard,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={dashboardClasses} {...props}>
      {/* Encabezado con navegación y búsqueda */}
      <Header
        logo={<div className={styles.logo}>FutureUI</div>}
        title="Dashboard"
        menuItems={[
          { label: 'Home', href: '#' },
          { label: 'Analytics', href: '#' },
          { label: 'Settings', href: '#' },
        ]}
        onSearch={(query) => console.log('Search:', query)}
        variant={variant}
      />
      {/* Layout principal con barra lateral y contenido */}
      <div className={styles.content}>
        <Sidebar
          items={[
            { label: 'Overview', icon: '📊' , href: '#' },
            { label: 'Users', icon: '👥' , href: '#' },
            { label: 'Products', icon: '📦' , href: '#' },
            { label: 'Orders', icon: '🛒' , href: '#' },
          ]}
          variant={variant}
        />
        <main className={styles.main}>
          {/* Sección: Overview con tarjetas de estadísticas */}
          <section className={styles.overview}>
            <Typography variant="h2">Overview</Typography>
            <div className={styles.statsGrid}>
              {['Total Users', 'Total Products', 'Total Orders', 'Revenue'].map((stat, index) => (
                <Card key={index} variant={variant} className={styles.statCard}>
                  <Typography variant="h3">{stat}</Typography>
                  <Typography variant="h4">{Math.floor(Math.random() * 10000)}</Typography>
                </Card>
              ))}
            </div>
          </section>
          {/* Sección: Actividad reciente */}
          <section className={styles.recentActivity}>
            <Typography variant="h2">Recent Activity</Typography>
            <Card variant={variant} className={styles.activityList}>
              {['User signup', 'New order', 'Product update', 'Payment received'].map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <Typography variant="p">{activity}</Typography>
                  <Typography variant="span" className={styles.activityTime}>
                    {new Date().toLocaleTimeString()}
                  </Typography>
                </div>
              ))}
            </Card>
          </section>
          {/* Sección: Acciones rápidas */}
          <section className={styles.quickActions}>
            <Typography variant="h2">Quick Actions</Typography>
            <div className={styles.actionButtons}>
              <Button variant={variant}>Add User</Button>
              <Button variant={variant}>Create Product</Button>
              <Button variant={variant}>View Orders</Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

