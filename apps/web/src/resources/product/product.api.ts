import { useMutation } from 'react-query';

import { apiService } from 'services';

export function useUploadPhoto<T>() {
  const uploadPhoto = (data: T) => apiService.post('/products/photo/upload', data);

  return useMutation<{ url: string }, unknown, T>(uploadPhoto);
}
