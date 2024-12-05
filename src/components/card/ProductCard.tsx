import React from 'react';
import { Card } from '@components/card/Card';
import { Button } from '@components/Button/Button';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/ProductCard.module.css';

export interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  image,
  variant = 'light',
  className,
  onAddToCart,
  ...props
}) => {
  const cardClasses = [
    styles.productCard,
    styles[variant],
    variant.startsWith('transparent') ? styles.transparent : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Card variant={variant} className={cardClasses} {...props}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <Typography variant="h3" theme={variant} className={styles.name}>{name}</Typography>
        <Typography variant="p" theme={variant} className={styles.description}>{description}</Typography>
        <Typography variant="h4" theme={variant} className={styles.price}>${price.toFixed(2)}</Typography>
        <Button variant={variant} onClick={onAddToCart} className={styles.addToCartButton}>
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};