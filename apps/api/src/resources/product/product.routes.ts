import { routeUtil } from 'utils';

import list from './actions/list';
import remove from './actions/remove';
import uploadImage from './actions/upload-image';
import create from './actions/create';
import userList from './actions/user-list';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([list, uploadImage, create, remove, userList]);

const adminRoutes = routeUtil.getRoutes([list, remove, uploadImage]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
