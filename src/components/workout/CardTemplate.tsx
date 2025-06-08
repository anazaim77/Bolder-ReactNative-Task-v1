import React, { memo } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { getCommonStyle } from "../common/styles/style";
import { CommonStyle } from "../common/styles/style";

export interface CardTemplateProps extends CommonStyle, ViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CardTemplate = memo(
  ({ children, style, ...props }: CardTemplateProps) => {
    const _style = getCommonStyle(props);
    return (
      <View style={[_style, style]} {...props}>
        {children}
      </View>
    );
  }
);

export default CardTemplate;
