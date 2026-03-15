export interface DealFormData {
  title: string;
  goal: string;
  city: string;
}

export interface ApiResponse {
  success: boolean;
  dealId?: number;
  message?: string;
  error?: string;
  errors?: string[];
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
