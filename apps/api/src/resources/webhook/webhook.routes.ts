import { routeUtil } from 'utils';
import handleWebhook from './actions/handle-webhook';

const publicRoutes = routeUtil.getRoutes([handleWebhook]);

export default {
  publicRoutes,
};
