export type ProductsData = {
  name: string;
};

export type PriceData = {
  currency: 'usd' | 'eur';
  product_data: ProductsData;
  unit_amount: number;
};

export type CheckoutItem = {
  price_date: PriceData;
  quantity: number;
};
