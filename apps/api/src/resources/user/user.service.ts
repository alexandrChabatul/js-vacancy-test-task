import _ from 'lodash';

import { CartItem, User } from 'types';
import { userSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';
import { productService } from '../product';

const service = db.createService<User>(DATABASE_DOCUMENTS.USERS, {
  schemaValidator: (obj) => userSchema.parseAsync(obj),
});

const updateLastRequest = (_id: string) => {
  return service.atomic.updateOne(
    { _id },
    {
      $set: {
        lastRequest: new Date(),
      },
    }
  );
};

const increaseQuantity = (userId: string, productId: string) => {
  return service.updateOne({ _id: userId }, ({ cart }) => ({
    cart: cart.map((cartItem) =>
      cartItem.product === productId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem),
  }));
};

const decreaseQuantity = (userId: string, productId: string) => {
  return service.updateOne({ _id: userId }, ({ cart }) => ({
    cart: cart.reduce((acc: CartItem[], cartItem) => {
      if (cartItem.product === productId && cartItem.quantity > 1) {
        acc.push({ ...cartItem, quantity: cartItem.quantity - 1 });
        return acc;
      } else if (cartItem.product === productId && cartItem.quantity <= 1) {
        return acc;
      }
      acc.push(cartItem);
      return acc;
    }, []),
  }));
};

const removeFromCart = (userId: string, productId: string) => {
  return service.updateOne({ _id: userId }, ({ cart }) => ({
    cart: cart.filter((cartItem) => cartItem.product !== productId),
  }));
};

const removeProductsFromCart = (userId: string, productIds: string[]) => {
  return service.updateOne({ _id: userId }, ({ cart }) => ({
    cart: cart.filter((cartItem) => !productIds.includes(cartItem.product)),
  }));
};

const addToCart = (userId: string, productId: string) => {
  return service.updateOne({ _id: userId }, ({ cart }) => ({
    cart: [...cart, { product: productId, quantity: 1 }],
  }));
};

const getCart = (user: User) => {
  return user.cart.map((item) => {
    return productService.findOne({ _id: item.product }).then((product) => {
      return { ...item, product };
    });
  });
};

const privateFields = ['passwordHash', 'signupToken', 'resetPasswordToken'];

const getPublic = (user: User | null) => _.omit(user, privateFields);

export default Object.assign(service, {
  updateLastRequest,
  getPublic,
  decreaseQuantity,
  increaseQuantity,
  addToCart,
  removeFromCart,
  removeProductsFromCart,
  getCart,
});
