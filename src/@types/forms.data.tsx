export interface SignupFormData {
  username: string;
  phone: string;
}

export interface SigninFormData {
  email: string;
}

export interface ContentCreateFormData {
  collection?: string;
  description?: string;
}

export interface TokenAccessFormData {
  token: string;
}
