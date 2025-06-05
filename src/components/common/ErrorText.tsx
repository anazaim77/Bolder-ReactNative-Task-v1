import React, { memo } from "react";
import { StyleProp, TextStyle } from "react-native";
import TextApp from "./TextApp";
import { CommonStyle, getCommonStyle } from "./styles/style";

interface ErrorTextProps extends Omit<CommonStyle, "position"> {
  errorText?: string;
  style?: StyleProp<TextStyle>;
  position?: "relative" | "fixed";
}

const ErrorText = memo(
  ({ errorText, style, position = "relative", ...props }: ErrorTextProps) => {
    const _style = getCommonStyle(props);

    const mergedStyle = [_style, style];
    if (position === "fixed") {
      return (
        <TextApp
          variant="light"
          color={!!errorText ? "error_red" : "text_white"}
          style={mergedStyle}
        >
          {errorText}
        </TextApp>
      );
    }
    return (
      !!errorText && (
        <TextApp variant="light" color={"error_red"} style={mergedStyle}>
          {errorText}
        </TextApp>
      )
    );
  }
);

export default ErrorText;
