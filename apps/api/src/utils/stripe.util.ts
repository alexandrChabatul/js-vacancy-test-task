import { CheckoutItem, PopulatedCartItem } from 'types';

export const mapProductToCheckoutItem = (item: PopulatedCartItem): CheckoutItem => {
  return {
    price_data: {
      product_data: {
        name: item.product.title,
        images: [item.product.photoUrl],
      },
      currency: 'usd',
      unit_amount: item.product.price * 100,
    },
    quantity: item.quantity || 1,
  };
};

export default {
  mapProductToCheckoutItem,
};
