import React, { memo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Container, { ContainerProps } from "./Container";
import { CommonStyle, getCommonStyle } from "./styles/style";
import { Colors } from "@/constants";

interface AlerBoxProps extends CommonStyle {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerProps?: ContainerProps;
}

const AlerBox = memo(
  ({
    children,
    style,
    position = "relative",
    containerProps,
    ...props
  }: AlerBoxProps) => {
    const _style = getCommonStyle(props);

    return (
      <Container
        style={_style}
        {...containerProps}
        backgroundColor={Colors.background_blue_light}
        borderColor={Colors.primary_dark}
        borderWidth={1}
        borderRadius={10}
        padding={12}
      >
        {children}
      </Container>
    );
  }
);

export default AlerBox;
