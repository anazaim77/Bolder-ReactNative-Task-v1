import { Colors } from "@/constants";
import React, { memo } from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { TextApp, TouchableApp } from "..";
import { CommonStyle, getCommonStyle } from "./styles/style";

export interface ButtonAppProps extends CommonStyle {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "solid" | "outlined" | "link";
  size?: "sm" | "md" | "lg";
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const ButtonApp = memo(
  ({
    children,
    style,
    variant = "solid",
    size = "md",
    onPress,
    disabled = false,
    isLoading = false,
    ...props
  }: ButtonAppProps) => {
    const _style = getCommonStyle(props);

    const _variantStyle = React.useMemo(() => {
      switch (variant) {
        case "solid":
          return {
            backgroundColor: disabled ? Colors.background_gray : Colors.primary,
            paddingVertical: size === "sm" ? 8 : size === "md" ? 12 : 16,
            paddingHorizontal: size === "sm" ? 16 : size === "md" ? 24 : 32,
            borderRadius: 100,
          };
        case "outlined":
          return {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: disabled ? Colors.background_gray : Colors.primary,
            paddingVertical: size === "sm" ? 8 : size === "md" ? 12 : 16,
            paddingHorizontal: size === "sm" ? 16 : size === "md" ? 24 : 32,
            borderRadius: 100,
          };
        case "link":
          return {
            backgroundColor: "transparent",
            paddingVertical: 4,
            paddingHorizontal: 8,
          };
        default:
          return {};
      }
    }, [variant, size, disabled]);

    const textColor = React.useMemo(() => {
      switch (variant) {
        case "solid":
          return "text_white";
        case "outlined":
        case "link":
          return disabled ? "gray_300" : "primary";
        default:
          return "text_black";
      }
    }, [variant, disabled]);

    return (
      <TouchableApp
        style={[_style, _variantStyle, style]}
        onPress={onPress}
        disabled={disabled || isLoading}
        alignItems="center"
        justifyContent="center"
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.text_white} />
        ) : (
          <TextApp
            color={textColor as keyof typeof Colors}
            variant="medium"
            textAlign="center"
            size={size === "sm" ? "sm" : size === "md" ? "md" : "lg"}
          >
            {children}
          </TextApp>
        )}
      </TouchableApp>
    );
  }
);

export default ButtonApp;
