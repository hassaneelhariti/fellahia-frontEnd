export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  userId: string;
  fullName: string;
  phone: string;
  role: 'FELLAH' | 'AVOCAT';
  verified: boolean;
}

export interface RegisterRequest {
  fullName: string;
  phone: string;
  password: string;
  role: 'FELLAH' | 'AVOCAT' | 'ADMIN';
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface OtpVerifyRequest {
  phone: string;
  code: string;
}

export interface LegalCaseResponse {
  id: string;
  reference: string;
  description: string;
  urgency: 'NORMAL' | 'URGENT' | 'VERY_URGENT';
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'CLOSED';
  cost: number;
  region: string;
  createdAt: string;
  updatedAt: string;
  fellahName: string;
  lawyerName: string;
  files: CaseFileResponse[];
}

export interface CaseFileResponse {
  id: string;
  fileName: string;
  fileType: string;
  sizeBytes: number;
  downloadUrl: string;
  uploadedAt: string;
}

export interface CaseSubmitRequest {
  description: string;
  urgency: 'NORMAL' | 'URGENT' | 'VERY_URGENT';
  region?: string;
}

export interface ChatMessageResponse {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

export interface UserProfileResponse {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: 'FELLAH' | 'AVOCAT';
  verified: boolean;
  createdAt: string;
  balance: number;
  rib?: string;
  barNumber?: string;
  specialization?: string;
  region?: string;
  rating?: number;
  totalCases?: number;
  avatar?:string;
}

export interface LawyerDashboardResponse {
  fullName: string;
  totalCases: number;
  pendingCases: number;
  acceptedCases: number;
  closedCases: number;
  rating: number;
}

export interface TransactionResponse {
  id: string;
  amount: number;
  type: string;
  description: string;
  createdAt: string;
}

export interface BalanceResponse {
  balance: number;
}

export interface PageLegalCaseResponse {
  content: LegalCaseResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}
