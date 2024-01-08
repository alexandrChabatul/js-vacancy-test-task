import { useMutation } from 'react-query';

import { apiService } from 'services';
import { Product } from 'types';

export function useUploadPhoto<T>() {
  const uploadPhoto = (data: T) => apiService.post('/products/photo/upload', data);

  return useMutation<{ url: string }, unknown, T>(uploadPhoto);
}

export function useCreate<T>() {
  const createProduct = (data: T) => apiService.post('/products', data);

  return useMutation<Product, unknown, T>(createProduct);
}
