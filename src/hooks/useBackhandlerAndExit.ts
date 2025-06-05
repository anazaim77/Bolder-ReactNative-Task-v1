import { useEffect, useState, useCallback } from "react";
import { AppState, BackHandler, ToastAndroid } from "react-native";
import { router } from "expo-router";
import { useBackHandler } from "./useBackhandler";

const useBackhandlerAndExit = () => {
  const [backPressCount, setBackPressCount] = useState<number>(0);

  const handleBackButtonPress = useCallback(() => {
    const isRootStack = !router.canGoBack();
    if (isRootStack) {
      setBackPressCount((prevCount) => prevCount + 1);
      if (backPressCount === 1) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show("Click again to close", ToastAndroid.SHORT);
      }
      return true;
    }
    router.back();
    return false;
  }, [backPressCount, router]);

  useBackHandler(handleBackButtonPress, [backPressCount]);

  useEffect(() => {
    const appResumeListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          setBackPressCount(0);
        }
      }
    );

    return () => appResumeListener.remove();
  }, []);
};

export default useBackhandlerAndExit;
