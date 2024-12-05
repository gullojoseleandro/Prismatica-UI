import React from 'react';
import { Header } from '@components/header/Header';
import { Sidebar } from '@components/sidebar/Sidebar';
import { Card } from '@components/card/Card';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/DashboardTemplate.module.css';

export interface DashboardTemplateProps {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

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

