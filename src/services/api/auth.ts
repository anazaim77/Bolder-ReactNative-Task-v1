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
    try {
      const response = await axiosClient.post<AuthResponse>(
        "/auth/v1/signup",
        params
      );
      callbacks?.onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      callbacks?.onError?.(error);
      throw error;
    }
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
};
