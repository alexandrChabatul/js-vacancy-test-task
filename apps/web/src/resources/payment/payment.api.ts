import { useMutation } from 'react-query';

import { apiService } from 'services';

export function useCreateStripeSession<T>() {
  const createStripeSession = (data: T) => apiService.post('/payments/create-session', data);

  interface CreatePaymentSessionResponse {
    url: string;
  }

  return useMutation<CreatePaymentSessionResponse, unknown, T>(createStripeSession, {
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });
}
