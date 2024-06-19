export interface IFormData {
  username: string;
  email: string;
  subject: string;
  message: string;
}

export interface IFormErrors {
  username?: string;
  email?: string;
  subject?: string;
  message?: string;
}
