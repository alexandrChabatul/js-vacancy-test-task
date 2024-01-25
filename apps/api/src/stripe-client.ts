import Stripe from 'stripe';

import config from 'config';

const stripeClient = new Stripe(config.STRIPE_SECRET_KEY);

export default stripeClient;
