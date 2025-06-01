import { Colors } from "@/constants";
import React from "react";
import { StyleProp, Text, TextInputProps, TextStyle } from "react-native";
import { CommonStyle, getCommonStyle } from "./styles/style";

interface TextAppProps extends CommonStyle, TextInputProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: "light" | "medium" | "bold";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: keyof typeof Colors;
}

const TextApp: React.FC<TextAppProps> = ({
  children,
  style,
  variant = "medium",
  size = "md",
  color = "text_black",
  textAlign,
  ...props
}) => {
  const variantStyle = React.useMemo(
    () => ({
      fontFamily:
        variant === "light"
          ? "Inter_300Light"
          : variant === "medium"
          ? "Inter_500Medium"
          : variant === "bold"
          ? "Inter_700Bold"
          : "Inter_500Medium",
      fontSize:
        size === "xs"
          ? 10
          : size === "sm"
          ? 12
          : size === "md"
          ? 14
          : size === "lg"
          ? 18
          : size === "xl"
          ? 24
          : 14,
      color: Colors[color as keyof typeof Colors],
    }),
    [variant, size, color]
  );

  const _style = getCommonStyle(props);

  return (
    <Text style={[_style, { textAlign }, variantStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export default React.memo(TextApp);
export type { TextAppProps };
