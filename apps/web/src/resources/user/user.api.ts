import { useMutation, useQuery } from 'react-query';

import { User } from 'types';

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
  const addToCart = (data: T) => {
    console.log(data);
    return apiService.post('/users/cart', data);
  };

  return useMutation<User, unknown, T>(addToCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useRemoveFromCart() {
  const removeFromCart = (id: string) => apiService.delete(`/users/cart/${id}`);

  return useMutation<User, unknown, string>(removeFromCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}
