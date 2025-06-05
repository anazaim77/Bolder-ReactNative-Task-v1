import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckTypeUtils as Check } from ".";

export const setItem = async (
  key: string,
  value: boolean | number | object | string
) => {
  try {
    if (value === undefined || value === null) {
      return;
    }
    if (Check.isString(value)) {
      return await AsyncStorage.setItem(key, value.toString());
    }
    if (
      Check.isBoolean(value) ||
      Check.isNumber(value) ||
      Check.isObject(value)
    ) {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    throw new Error("[Local Storage] An error occurred while saving data");
  }
};

export const getString = async (key: string) => {
  try {
    return (await AsyncStorage.getItem(key)) as string;
  } catch (error) {
    throw new Error("[Local Storage] An error occurred while getting data");
  }
};

export const getAnyItem = async (key: string) => {
  try {
    const items = await AsyncStorage.getItem(key);
    if (!items) {
      return null;
    }
    return JSON.parse(items);
  } catch (error) {
    throw new Error("[Local Storage] An error occurred while getting data");
  }
};

export const removeItem = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error("[Local Storage] An error occurred while deleting data");
  }
};
