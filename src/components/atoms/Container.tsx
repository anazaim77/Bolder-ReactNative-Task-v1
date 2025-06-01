import { CommonStyle, getCommonStyle } from "./styles/style";
import React, { memo } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

export interface ContainerProps extends CommonStyle, ViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Container = memo(({ children, style, ...props }: ContainerProps) => {
  const _style = getCommonStyle(props);

  return (
    <View style={[_style, style]} {...props}>
      {children}
    </View>
  );
});

export default Container;
