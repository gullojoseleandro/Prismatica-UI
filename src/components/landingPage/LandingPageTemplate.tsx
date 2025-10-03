import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import { Card } from '@components/card/Card';
import styles from '@styles/LandingPageTemplate.module.css';

/**
 * Props for the `LandingPage` component.
 * - `variant`: page visual theme.
 * - `className`: additional CSS classes.
 */
export interface LandingPageProps {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Landing page template with hero, features, pricing, and contact.
 *
 * @example
 * ```tsx
 * <LandingPage variant="light" />
 * ```
 */
export const LandingPage: React.FC<LandingPageProps> = ({
  variant = 'light',
  className,
  ...props
}) => {
  const pageClasses = [
    styles.landingPage,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={pageClasses} {...props}>
      {/* Top navbar with main navigation */}
      <Navbar
        logo={<div className={styles.logo}>FutureUI</div>}
        title="FutureUI"
        menuItems={[
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Contact', href: '#contact' },
        ]}
        variant={variant}
      />
      <main className={styles.main}>
        {/* Hero welcome section */}
        <section className={styles.hero}>
          <Typography variant="h1" className={styles.heroTitle}>Welcome to FutureUI</Typography>
          <Typography variant="p" className={styles.heroSubtitle}>The next generation of user interfaces</Typography>
          <Button variant={variant} size="large" className={styles.ctaButton}>Get Started</Button>
        </section>
        {/* Features section */}
        <section id="features" className={styles.features}>
          <Typography variant="h2">Features</Typography>
          <div className={styles.featureGrid}>
            {['Modern Design', 'Responsive', 'Accessible', 'Customizable'].map((feature, index) => (
              <Card key={index} variant={variant} className={styles.featureCard}>
                <Typography variant="h3">{feature}</Typography>
                <Typography variant="p">Lorem ipsum dolor sit amet</Typography>
              </Card>
            ))}
          </div>
        </section>
        {/* Pricing section */}
        <section id="pricing" className={styles.pricing}>
          <Typography variant="h2">Pricing</Typography>
          <div className={styles.pricingGrid}>
            {['Free', 'Pro', 'Enterprise'].map((plan, index) => (
              <Card key={index} variant={variant} className={styles.pricingCard}>
                <Typography variant="h3">{plan}</Typography>
                <Typography variant="h4">${index * 10}/mo</Typography>
                <Button variant={variant}>Choose Plan</Button>
              </Card>
            ))}
          </div>
        </section>
        {/* Contact section */}
        <section id="contact" className={styles.contact}>
          <Typography variant="h2">Contact Us</Typography>
          <form className={styles.contactForm}>
            <input type="text" placeholder="Name" className={styles.input} />
            <input type="email" placeholder="Email" className={styles.input} />
            <textarea placeholder="Message" className={styles.textarea}></textarea>
            <Button variant={variant} type="submit">Send Message</Button>
          </form>
        </section>
      </main>
      {/* Simple footer with copyright */}
      <footer className={styles.footer}>
        <Typography variant="p">&copy; 2023 FutureUI. All rights reserved.</Typography>
      </footer>
    </div>
  );
};
