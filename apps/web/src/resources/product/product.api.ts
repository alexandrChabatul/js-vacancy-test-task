import { useMutation, useQuery } from 'react-query';

import { apiService } from 'services';
import { Product } from 'types';
import queryClient from '../../query-client';

export function useUploadPhoto<T>() {
  const uploadPhoto = (data: T) => apiService.post('/products/photo/upload', data);

  return useMutation<{ url: string }, unknown, T>(uploadPhoto);
}

export function useRemovePhoto<T>() {
  const removePhoto = (data: T) => apiService.post('/products/photo/remove', data);

  return useMutation<void, unknown, T>(removePhoto);
}

export function useCreate<T>() {
  const createProduct = (data: T) => apiService.post('/products', data);

  return useMutation<Product, unknown, T>(createProduct);
}

export function useRemove() {
  const removeProduct = (id: string) => apiService.delete(`/products/${id}`);

  interface ProductsListResponse {
    count: number;
    items: Product[];
  }

  return useMutation<ProductsListResponse, unknown, string>(removeProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['my-products']);
    },
  });
}

export function useList<T>(params: T) {
  const list = () => apiService.get('/products', params);

  interface ProductsListResponse {
    count: number;
    items: Product[];
    totalPages: number;
  }

  return useQuery<ProductsListResponse>(['products', params], list);
}

export function useMyList<T>(params: T) {
  const myList = () => apiService.get('/products/my', params);

  interface ProductsListResponse {
    items: Product[];
    count: number;
  }

  return useQuery<ProductsListResponse>(['my-products', params], myList);
}
