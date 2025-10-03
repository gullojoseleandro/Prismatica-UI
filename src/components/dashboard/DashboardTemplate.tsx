import React from 'react';
import { Header } from '@components/header/Header';
import { Sidebar } from '@components/sidebar/Sidebar';
import { Card } from '@components/card/Card';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/DashboardTemplate.module.css';

/**
 * Props for the `DashboardTemplate` component.
 * - `variant`: global visual theme of the dashboard.
 * - `className`: additional CSS classes.
 */
export interface DashboardTemplateProps {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Dashboard template with `Header`, `Sidebar`, and main content.
 * Includes Overview, Recent Activity, and Quick Actions sections.
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
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={dashboardClasses} {...props}>
      {/* Header with navigation and search */}
      <Header
        logo={<div className={styles.logo}>FutureUI</div>}
        title="Dashboard"
        menuItems={[
          { label: 'Overview', href: '#overview' },
          { label: 'Analytics', href: '#analytics' },
          { label: 'Settings', href: '#settings' },
        ]}
        onSearch={(query) => console.log('Search:', query)}
        variant={variant}
      />
      <div className={styles.layout}>
        {/* Sidebar with side navigation */}
        <Sidebar
          items={[
            { label: 'Dashboard', href: '#', icon: '📊' },
            { label: 'Reports', href: '#', icon: '📈' },
            { label: 'Users', href: '#', icon: '👥' },
          ]}
          variant={variant}
        />
        <main className={styles.main}>
          {/* Section: Overview with statistics cards */}
          <section className={styles.overview}>
            <Typography variant="h2">Overview</Typography>
            <div className={styles.statsGrid}>
              {['Total Users', 'Revenue', 'Active Sessions'].map((stat, index) => (
                <Card key={index} variant={variant} className={styles.statCard}>
                  <Typography variant="h3">{stat}</Typography>
                  <Typography variant="h1">{(index + 1) * 1000}</Typography>
                </Card>
              ))}
            </div>
          </section>
          {/* Section: Recent activity */}
          <section className={styles.recentActivity}>
            <Typography variant="h2">Recent Activity</Typography>
            <Card variant={variant} className={styles.activityList}>
              {['User logged in', 'New order placed', 'Report generated'].map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <Typography variant="p">{activity}</Typography>
                  <Typography variant="span" className={styles.timestamp}>2 hours ago</Typography>
                </div>
              ))}
            </Card>
          </section>
          {/* Section: Quick actions */}
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

