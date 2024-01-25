import { CheckoutItem, Product } from 'types';

export const mapProductToCheckoutItem = (product: Product): CheckoutItem => {
  return {
    price_data: {
      product_data: {
        name: product.title,
      },
      currency: 'usd',
      unit_amount: product.price * 100,
    },
    quantity: product.quantity || 1,
  };
};

export default {
  mapProductToCheckoutItem,
};
