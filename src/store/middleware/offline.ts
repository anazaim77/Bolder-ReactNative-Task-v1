import { offline } from "@redux-offline/redux-offline";
import defaultConfig from "@redux-offline/redux-offline/lib/defaults";
import { Config } from "@redux-offline/redux-offline/lib/types";

const customRetry = (_: unknown, retries: number): number | void => {
  const maxRetries = 3;
  const retryDelay = 5000; // 5 seconds

  if (retries < maxRetries) {
    return retryDelay;
  }
  return;
};

const customDiscard = (_: unknown, __: unknown, retries: number): boolean => {
  const maxRetries = 3;
  return retries >= maxRetries;
};

const offlineConfig: Config = {
  ...defaultConfig,
  retry: customRetry,
  discard: customDiscard,
};

export default offline(offlineConfig);
