import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

const useKeyboardAppearance = (): { isKeyboardShowing: boolean } => {
  const [isKeyboardShowing, setIsKeyboardShowing] = useState(false);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardShowEvent = Keyboard.addListener(showEvent, () =>
      setIsKeyboardShowing(true)
    );

    const keyboardHideEvent = Keyboard.addListener(hideEvent, () =>
      setIsKeyboardShowing(false)
    );

    return () => {
      keyboardHideEvent.remove();
      keyboardShowEvent.remove();
    };
  }, []);

  return {
    isKeyboardShowing,
  };
};

export default useKeyboardAppearance;
