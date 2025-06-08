export const isProductionBuild = () => {
  return process.env.APP_ENV === "production";
};

export const isDevelopmentBuild = () => {
  return process.env.APP_ENV !== "production";
};
