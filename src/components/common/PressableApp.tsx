import React, { memo } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { CommonStyle, getCommonStyle } from "./styles/style";

export interface PressableAppProps extends CommonStyle, PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const PressableApp = memo(
  ({ children, style, ...props }: PressableAppProps) => {
    const _style = getCommonStyle(props);

    return (
      <Pressable style={[_style, style]} {...props}>
        {children}
      </Pressable>
    );
  }
);

export default PressableApp;
