import Stripe from 'stripe';
import { paymentService } from '../payment';
import { PaymentStatus } from 'types';

interface HandleWebhookResponse {
  sessionId: string;
  type: string;
}

const handleCheckoutSessionCompleted = async (event: Stripe.Event): Promise<HandleWebhookResponse> => {
  const data = (event as Stripe.CheckoutSessionCompletedEvent).data;
  await paymentService.updatePaymentStatusBySessionId(data.object.id, PaymentStatus.SUCCESS);
  return { sessionId: data.object.id, type: event.type };
};

const handleCheckoutSessionExpired = async (event: Stripe.Event): Promise<HandleWebhookResponse> => {
  const data = (event as Stripe.CheckoutSessionExpiredEvent).data;
  await paymentService.updatePaymentStatusBySessionId(data.object.id, PaymentStatus.EXPIRED);
  return { sessionId: data.object.id, type: event.type };
};

const hooksHandlers: Record<string, (event: Stripe.Event) => Promise<HandleWebhookResponse>> = {
  'checkout.session.completed': handleCheckoutSessionCompleted,
  'checkout.session.expired': handleCheckoutSessionExpired,
};

const handleWebhook = async (event: Stripe.Event) => {
  const handler = hooksHandlers[event.type];
  let result: HandleWebhookResponse = { type: event.type, sessionId: 'no id' };
  if (handler) result = await handler(event);
  return result;
};

export default { handleWebhook };
