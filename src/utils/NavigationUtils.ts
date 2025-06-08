import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from "@react-navigation/native";
import { createRef } from "react";

export const navigationRef = createRef<NavigationContainerRef<any>>();

const navigate = (screen: string, params?: any) => {
  navigationRef.current?.dispatch(CommonActions.navigate(screen, params));
};

const goBack = () => {
  navigationRef.current?.dispatch(CommonActions.goBack());
};

const replace = (screen: string, params?: any) => {
  navigationRef.current?.dispatch(StackActions.replace(screen, params));
};

export { navigate, goBack, replace };
