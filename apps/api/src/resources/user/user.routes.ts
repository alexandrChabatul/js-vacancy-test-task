import { routeUtil } from 'utils';

import list from './actions/list';
import update from './actions/update';
import remove from './actions/remove';
import addToCart from './actions/add-to-cart';
import removeFromCart from './actions/remove-from-cart';
import increaseItemCart from './actions/increase-item-cart';
import decreaseItemCart from './actions/decrease-item-cart';
import getUserCart from './actions/get-user-cart';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([
  list,
  addToCart,
  removeFromCart,
  increaseItemCart,
  decreaseItemCart,
  getUserCart,
]);

const adminRoutes = routeUtil.getRoutes([list, update, remove]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
