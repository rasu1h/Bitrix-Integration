import { useState } from 'react';
import { DealFormData, ApiResponse, FormStatus } from '../types';

interface UseCreateDealReturn {
  status: FormStatus;
  result: ApiResponse | null;
  createDeal: (data: DealFormData) => Promise<void>;
  reset: () => void;
}

export function useCreateDeal(): UseCreateDealReturn {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [result, setResult] = useState<ApiResponse | null>(null);

  const createDeal = async (data: DealFormData): Promise<void> => {
    setStatus('loading');
    setResult(null);

    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json: ApiResponse = await response.json();
      setResult(json);
      setStatus(json.success ? 'success' : 'error');
    } catch (err) {
      setResult({
        success: false,
        error: err instanceof Error ? err.message : 'Ошибка соединения с сервером',
      });
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setResult(null);
  };

  return { status, result, createDeal, reset };
}
