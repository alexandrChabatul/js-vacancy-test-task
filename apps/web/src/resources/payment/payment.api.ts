import { useMutation, useQuery } from 'react-query';

import { apiService } from 'services';
import { PopulatedHistoryItem } from 'types';

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

export function useGetPaymentsHistory() {
  const getPaymentHistory = () => apiService.get('/payments/history');

  interface GetPaymentsHistoryResponse {
    products: PopulatedHistoryItem[];
  }

  return useQuery<GetPaymentsHistoryResponse>(['history'], getPaymentHistory);
}
