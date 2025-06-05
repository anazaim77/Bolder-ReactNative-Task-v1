// import { StorageUtils } from "@/utils";
// import { NavigationUtils } from "@/utils";
import { Config } from "@/constants";
import axios, { InternalAxiosRequestConfig } from "axios";
import { showMessage } from "react-native-flash-message";
import { store } from "@/store";

const axiosClient = axios.create({
  baseURL: Config.supabaseUrl,
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.baseURL = Config.supabaseUrl;
    const state = store.getState();
    const authToken = state.auth.token;

    if (Config.supabaseAnonKey) {
      config.headers.set("apikey", Config.supabaseAnonKey);
    }
    if (authToken) {
      config.headers.set("Authorization", `Bearer ${authToken}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log("[Axios] response.error", error);
    if (error.response.status === 401) {
      // unauthorized
      showMessage({
        message: "Please sign in to continue",
        type: "danger",
        duration: 3000,
      });
      // do logout
      // NavigationUtils.replace("onboarding");
    } else if (error.response.status === 500) {
      // internal server error
      showMessage({
        message: "[500] Internal Server Error",
        type: "danger",
      });
    } else {
      // response error
      let message = error.response.data?.message;
      if (typeof message !== "string") {
        message = JSON.stringify(message);
      }

      // showMessage({
      //   message: message,
      //   type: "danger",
      //   duration: 3000,
      // });
    }

    return Promise.reject(error.response.data);
  }
);

export default axiosClient;
