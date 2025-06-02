import React, { memo } from "react";
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { CommonStyle, getCommonStyle } from "./styles/style";

export interface TouchableAppProps extends CommonStyle, TouchableOpacityProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const TouchableApp = memo(
  ({ children, style, activeOpacity = 0.8, ...props }: TouchableAppProps) => {
    const _style = getCommonStyle(props);

    return (
      <TouchableOpacity
        style={[_style, style]}
        activeOpacity={activeOpacity}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
);

export default TouchableApp;
