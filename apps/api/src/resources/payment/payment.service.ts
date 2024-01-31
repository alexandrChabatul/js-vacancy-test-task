import { Payment, PaymentStatus, PopulatedCartItem, PopulatedHistoryItem, User } from 'types';
import { paymentSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';
import stripeClient from 'stripe-client';
import { mapProductToCheckoutItem } from 'utils/stripe.util';
import config from 'config';
import { userService } from '../user';

const service = db.createService<Payment>(DATABASE_DOCUMENTS.PAYMENTS, {
  schemaValidator: (obj) => paymentSchema.parseAsync(obj),
});

const createPaymentSession = (products: PopulatedCartItem[], user: User) => {
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

const handleSuccessPayment = async (id: string, time: number) => {
  const date = new Date(time * 1000);
  const payment = await service.findOne({ sessionId: id });
  if (!payment) return;
  service.updateOne({ sessionId: id }, ({ products }) => ({
    status: PaymentStatus.SUCCESS,
    products: products.map((item: PopulatedHistoryItem) => ({ ...item, paidAt: date })),
  }));
  const toRemoveIds = payment.products.map((item) => item.product._id);
  await userService.removeProductsFromCart(payment.userId, toRemoveIds);
};

const getHistory = async (userId: string) => {
  const payments = await service.find({ userId, status: PaymentStatus.SUCCESS });
  return payments.results.reduce((acc: PopulatedCartItem[], payment) => {
    acc.push(...payment.products);
    return acc;
  }, []);
};

export default Object.assign(service, {
  createPaymentSession,
  updatePaymentStatusBySessionId,
  getHistory,
  handleSuccessPayment,
});
