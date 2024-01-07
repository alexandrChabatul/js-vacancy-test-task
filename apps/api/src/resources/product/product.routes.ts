import { routeUtil } from 'utils';

import list from './actions/list';
import remove from './actions/remove';
import uploadImage from './actions/upload-image';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([list, uploadImage]);

const adminRoutes = routeUtil.getRoutes([list, remove, uploadImage]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
