import { makeRequest } from "./makeRequest";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData extends LoginCredentials {
  name: string;
}

interface ResetPasswordData {
  password: string;
  confirmPassword: string;
  token: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export class UserService {
  private static readonly BASE_PATH = "/auth";

  static async login(credentials: LoginCredentials): Promise<UserResponse> {
    return makeRequest<LoginCredentials, UserResponse>(`${this.BASE_PATH}/login`, {
      method: "POST",
      body: credentials,
    });
  }

  static async signup(userData: SignupData): Promise<UserResponse> {
    return makeRequest<SignupData, UserResponse>(`${this.BASE_PATH}/register`, {
      method: "POST",
      body: userData,
    });
  }

  static async forgotPassword(email: string): Promise<{ message: string }> {
    return makeRequest<{ email: string }, { message: string }>(`${this.BASE_PATH}/forgot-password`, {
      method: "POST",
      body: { email },
    });
  }

  static async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    return makeRequest<ResetPasswordData, { message: string }>(`${this.BASE_PATH}/reset-password`, {
      method: "POST",
      body: data,
    });
  }

  static async verifyResetToken(token: string): Promise<{ valid: boolean }> {
    return makeRequest<void, { valid: boolean }>(`${this.BASE_PATH}/verify-reset-token/${token}`);
  }

  static async logout(): Promise<void> {
    return makeRequest(`${this.BASE_PATH}/logout`, {
      method: "POST",
    });
  }

  static async getCurrentUser(): Promise<UserResponse> {
    return makeRequest<void, UserResponse>(`${this.BASE_PATH}/me`);
  }

  static async updateProfile(data: Partial<UserResponse>): Promise<UserResponse> {
    return makeRequest<Partial<UserResponse>, UserResponse>(`${this.BASE_PATH}/profile`, {
      method: "PUT",
      body: data,
    });
  }
}
