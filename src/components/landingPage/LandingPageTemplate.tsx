import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/LandingPageTemplate.module.css';

export interface LandingPageProps {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  variant = 'light',
  className,
  ...props
}) => {
  const pageClasses = [
    styles.landingPage,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={pageClasses} {...props}>
      <Navbar
        logo={<div className={styles.logo}>FutureUI</div>}
        title="FutureUI"
        menuItems={[
          { label: 'Home', href: '#' },
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Contact', href: '#contact' },
        ]}
        variant={variant}
      />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Typography variant="h1" className={styles.heroTitle}>Welcome to FutureUI</Typography>
          <Typography variant="p" className={styles.heroSubtitle}>The next generation of user interfaces</Typography>
          <Button variant={variant} size="large" className={styles.ctaButton}>Get Started</Button>
        </section>
        <section id="features" className={styles.features}>
          <Typography variant="h2">Features</Typography>
          <div className={styles.featureGrid}>
            {['Responsive', 'Customizable', 'Fast', 'Accessible'].map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <Typography variant="h3">{feature}</Typography>
                <Typography variant="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
              </div>
            ))}
          </div>
        </section>
        <section id="pricing" className={styles.pricing}>
          <Typography variant="h2">Pricing</Typography>
          <div className={styles.pricingGrid}>
            {['Basic', 'Pro', 'Enterprise'].map((plan, index) => (
              <div key={index} className={styles.pricingItem}>
                <Typography variant="h3">{plan}</Typography>
                <Typography variant="h4">${(index + 1) * 9.99}/mo</Typography>
                <Button variant={variant}>Choose Plan</Button>
              </div>
            ))}
          </div>
        </section>
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
      <footer className={styles.footer}>
        <Typography variant="p">&copy; 2023 FutureUI. All rights reserved.</Typography>
      </footer>
    </div>
  );
};
