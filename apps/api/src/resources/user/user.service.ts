import _ from 'lodash';

import { Product, User } from 'types';
import { userSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';

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

const increaseQuantity = (userId: string, product: Product) => {
  const { quantity } = product;

  product = {
    ...product,
    quantity: quantity ? quantity + 1 : quantity,
  };

  return service.updateOne({ _id: userId }, ({ cart }) => ({
    cart: cart.map((cartItem) => (cartItem._id === product._id ? product : cartItem)),
  }));
};

const decreaseQuantity = (userId: string, product: Product) => {
  const { quantity } = product;

  if (quantity === 1)
    return service.updateOne({ _id: userId }, ({ cart }) => ({
      cart: cart.filter((cartItem) => cartItem._id !== product._id),
    }));

  product = {
    ...product,
    quantity: quantity ? quantity - 1 : quantity,
  };

  return service.updateOne({ _id: userId }, ({ cart }) => ({
    cart: cart.map((cartItem) => (cartItem._id === product._id ? product : cartItem)),
  }));
};

const removeFromCart = (userId: string, productId: string) => {
  return service.updateOne({ _id: userId }, ({ cart }) => ({
    cart: cart.filter((cartItem) => cartItem._id !== productId),
  }));
};

const addToCart = (userId: string, product: Product) => {
  return service.updateOne({ _id: userId }, ({ cart }) => ({
    cart: [...cart, { ...product, quantity: 1 }],
  }));
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
});
