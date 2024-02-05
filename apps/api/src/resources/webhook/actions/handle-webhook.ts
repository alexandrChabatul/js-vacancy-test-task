import { AppKoaContext, AppRouter, Next } from 'types';

import config from 'config';
import stripeClient from 'stripe-client';
import Stripe from 'stripe';
import webhookService from '../webhook.service';
import { analyticsService } from 'services';

async function validator(ctx: AppKoaContext, next: Next) {
  const payload = ctx.request.rawBody;
  const sig = ctx.headers['stripe-signature'];
  const endpointSecret = config.STRIPE_SIGNING_SECRET;
  ctx.assertError(payload && sig, 'Webhook payload or sig error.');

  const event = stripeClient.webhooks.constructEvent(payload, sig, endpointSecret);

  ctx.assertError(event, 'Webhook payload error.');

  await next();
}

async function handler(ctx: AppKoaContext) {
  const event = ctx.request.body as Stripe.Event;

  const res = await webhookService.handleWebhook(event);

  analyticsService.track('Handle stripe webhook', res);

  ctx.body = { success: true };
}

export default (router: AppRouter) => {
  router.post('/', validator, handler);
};
