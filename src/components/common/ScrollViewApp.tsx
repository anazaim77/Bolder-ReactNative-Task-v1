import React, { memo, useMemo } from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { CommonStyle, getCommonStyle } from "./styles/style";

interface ScrollViewAppProps extends CommonStyle, ScrollViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ScrollViewApp = memo(
  ({ children, style, ...props }: ScrollViewAppProps) => {
    const _style = getCommonStyle(props);

    return (
      <ScrollView style={[style, _style]} {...props}>
        {children}
      </ScrollView>
    );
  }
);

export default ScrollViewApp;
