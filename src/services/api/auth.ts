import { StateTypes } from "@/types";
import axiosClient from "./AxiosClient";
import { Config } from "@/constants";

interface SignInParams {
  email: string;
  password: string;
}

interface SignUpParams extends SignInParams {
  name?: string;
}

interface ResetPasswordParams {
  email: string;
}

interface AuthResponse {
  user: StateTypes.User;
  token: string;
}

export interface AuthLogoutCallbacks {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export interface AuthCallbacks {
  onSuccess?: (response: AuthResponse) => void;
  onError?: (error: any) => void;
}

export const authService = {
  signIn: async (
    params: SignInParams,
    callbacks?: AuthCallbacks
  ): Promise<AuthResponse> => {
    return axiosClient
      .post<AuthResponse>("/auth/v1/token?grant_type=password", params)
      .then((response) => {
        callbacks?.onSuccess?.(response.data);
        return response.data;
      })
      .catch((error) => {
        callbacks?.onError?.(error);
        throw error;
      });
  },

  signUp: async (
    params: SignUpParams,
    callbacks?: AuthCallbacks
  ): Promise<AuthResponse> => {
    return axiosClient
      .post<AuthResponse>("/auth/v1/signup", params)
      .then((response) => {
        callbacks?.onSuccess?.(response.data);
        return response.data;
      })
      .catch((error) => {
        callbacks?.onError?.(error);
        throw error;
      });
  },

  signOut: async (callbacks?: AuthLogoutCallbacks): Promise<void> => {
    try {
      await axiosClient.post("/auth/v1/logout");
      callbacks?.onSuccess?.();
    } catch (error) {
      callbacks?.onError?.(error);
      throw error;
    }
  },

  resetPassword: async (
    params: ResetPasswordParams,
    callbacks?: AuthCallbacks
  ) => {
    return axiosClient
      .post<AuthResponse>("/auth/v1/recover", params)
      .then((response) => {
        console.log("res", response);
        callbacks?.onSuccess?.(response.data);
        return response.data;
      })
      .catch((error) => {
        callbacks?.onError?.(error);
        throw error;
      });
  },
};
