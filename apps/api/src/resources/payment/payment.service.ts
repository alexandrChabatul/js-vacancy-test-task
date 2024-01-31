import { Payment, PaymentStatus, Product, User } from 'types';
import { paymentSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';
import stripeClient from 'stripe-client';
import { mapProductToCheckoutItem } from 'utils/stripe.util';
import config from 'config';

const service = db.createService<Payment>(DATABASE_DOCUMENTS.PAYMENTS, {
  schemaValidator: (obj) => paymentSchema.parseAsync(obj),
});

const createPaymentSession = (products: Product[], user: User) => {
  const items = products.map(mapProductToCheckoutItem);
  return stripeClient.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: user.email,
    mode: 'payment',
    line_items: items,
    success_url: `${config.WEB_URL}/payment/succeed`,
    cancel_url: `${config.WEB_URL}/payment/failed`,
  });
};

const updatePaymentStatusBySessionId = async (id: string, status: PaymentStatus) => {
  service.updateOne({ sessionId: id }, () => ({ status }));
};

const getHistory = async (userId: string) => {
  const payments = await service.find({ userId });
  return payments.results.reduce((acc: Product[], payment) => {
    acc.push(...payment.products);
    return acc;
  }, []);
};

export default Object.assign(service, {
  createPaymentSession,
  updatePaymentStatusBySessionId,
  getHistory,
});
