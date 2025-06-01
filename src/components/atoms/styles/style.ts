import { AnimatableNumericValue, ColorValue } from "react-native";

const sanitizeStyle = (value: number | undefined) => {
  if (value === undefined) return undefined;
  return value;
};

export interface CommonStyle {
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  flex?: number;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignSelf?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  backgroundColor?: ColorValue;
  gap?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: ColorValue;
  borderBottomWidth?: number;
  borderBottomColor?: ColorValue;
  borderTopWidth?: number;
  borderTopColor?: ColorValue;
  borderLeftWidth?: number;
  borderLeftColor?: ColorValue;
  borderRightWidth?: number;
  borderRightColor?: ColorValue;
  opacity?: AnimatableNumericValue;
  width?: number;
  height?: number;
  position?: "absolute" | "relative" | "static";
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  zIndex?: number;
}

export const getCommonStyle = (style: CommonStyle) => {
  return {
    padding: sanitizeStyle(style.padding),
    paddingTop: sanitizeStyle(style.paddingTop),
    paddingRight: sanitizeStyle(style.paddingRight),
    paddingBottom: sanitizeStyle(style.paddingBottom),
    paddingLeft: sanitizeStyle(style.paddingLeft),
    paddingHorizontal: sanitizeStyle(style.paddingHorizontal),
    paddingVertical: sanitizeStyle(style.paddingVertical),
    margin: sanitizeStyle(style.margin),
    marginTop: sanitizeStyle(style.marginTop),
    marginRight: sanitizeStyle(style.marginRight),
    marginBottom: sanitizeStyle(style.marginBottom),
    marginLeft: sanitizeStyle(style.marginLeft),
    marginHorizontal: sanitizeStyle(style.marginHorizontal),
    marginVertical: sanitizeStyle(style.marginVertical),
    flex: sanitizeStyle(style.flex),
    flexDirection: style.flexDirection,
    justifyContent: style.justifyContent,
    alignItems: style.alignItems,
    alignSelf: style.alignSelf,
    backgroundColor: style.backgroundColor,
    gap: sanitizeStyle(style.gap),
    borderRadius: sanitizeStyle(style.borderRadius),
    borderWidth: sanitizeStyle(style.borderWidth),
    borderBottomWidth: sanitizeStyle(style.borderBottomWidth),
    borderBottomColor: style.borderBottomColor,
    borderTopWidth: sanitizeStyle(style.borderTopWidth),
    borderTopColor: style.borderTopColor,
    borderLeftWidth: sanitizeStyle(style.borderLeftWidth),
    borderLeftColor: style.borderLeftColor,
    borderRightWidth: sanitizeStyle(style.borderRightWidth),
    borderRightColor: style.borderRightColor,
    borderColor: style.borderColor,
    opacity: style.opacity,
    width: sanitizeStyle(style.width),
    height: sanitizeStyle(style.height),
    position: style.position,
    top: sanitizeStyle(style.top),
    right: sanitizeStyle(style.right),
    bottom: sanitizeStyle(style.bottom),
    left: sanitizeStyle(style.left),
    zIndex: sanitizeStyle(style.zIndex),
  };
};
