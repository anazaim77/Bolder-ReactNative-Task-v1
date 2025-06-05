import { useEffect } from "react";
import { BackHandler } from "react-native";

export function useBackHandler(
  backHandler: () => boolean,
  deps: unknown[] = []
) {
  useEffect(function backHandlerListener() {
    const _backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backHandler
    );
    return () => _backHandler.remove();
  }, deps);
}

export default useBackHandler;
