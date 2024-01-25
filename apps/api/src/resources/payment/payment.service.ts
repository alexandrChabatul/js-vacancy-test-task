import { Payment, Product } from 'types';
import { paymentSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';
import stripeClient from 'stripe-client';
import { mapProductToCheckoutItem } from 'utils/stripe.util';
import config from 'config';

const service = db.createService<Payment>(DATABASE_DOCUMENTS.PAYMENTS, {
  schemaValidator: (obj) => paymentSchema.parseAsync(obj),
});

const createPaymentSession = (products: Product[]) => {
  const items = products.map(mapProductToCheckoutItem);
  return stripeClient.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: items,
    success_url: `${config.WEB_URL}/payment/succeed`,
    cancel_url: `${config.WEB_URL}/payment/failed`,
  });
};

export default Object.assign(service, {
  createPaymentSession,
});