import { useMutation, useQuery } from 'react-query';

import { PopulatedCartItem, User } from 'types';

import { apiService } from 'services';
import queryClient from '../../query-client';

export function useList<T>(params: T) {
  const list = () => apiService.get('/users', params);

  interface UserListResponse {
    count: number;
    items: User[];
    totalPages: number;
  }

  return useQuery<UserListResponse>(['users', params], list);
}

export function useAddToCart<T>() {
  const addToCart = (data: T) => apiService.post('/users/cart', data);

  return useMutation<User, unknown, T>(addToCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
      queryClient.invalidateQueries(['cart']);
    },
  });
}

export function useRemoveFromCart() {
  const removeFromCart = (id: string) => apiService.delete(`/users/cart/${id}`);

  return useMutation<User, unknown, string>(removeFromCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
      queryClient.invalidateQueries(['cart']);
    },
  });
}

export function useIncreaseItemCount<T>() {
  const increaseItemCount = (data: T) => apiService.patch('/users/cart/increase', data);

  return useMutation<User, unknown, T>(increaseItemCount, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
      queryClient.invalidateQueries(['cart']);
    },
  });
}

export function useDecreaseItemCount<T>() {
  const decreaseItemCount = (data: T) => apiService.patch('/users/cart/decrease', data);

  return useMutation<User, unknown, T>(decreaseItemCount, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
      queryClient.invalidateQueries(['cart']);
    },
  });
}

export function useGetCart(options?: {}) {
  const get = () => apiService.get('/users/cart');

  interface CartResponse {
    cart: PopulatedCartItem[];
  }

  return useQuery<CartResponse>(['cart'], get, options);
}
