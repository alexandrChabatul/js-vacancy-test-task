import { routeUtil } from 'utils';

import list from './actions/list';
import remove from './actions/remove';
import uploadImage from './actions/upload-image';
import create from './actions/create';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([list, uploadImage, create, remove]);

const adminRoutes = routeUtil.getRoutes([list, remove, uploadImage]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
