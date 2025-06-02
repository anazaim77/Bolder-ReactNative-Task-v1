import React, { memo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { CommonStyle, getCommonStyle } from "./styles/style";

interface SafeAreaAppProps extends CommonStyle, SafeAreaViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SafeAreaApp = memo(({ children, style, ...props }: SafeAreaAppProps) => {
  const _style = getCommonStyle(props);

  return (
    <SafeAreaView style={[style, _style]} {...props}>
      {children}
    </SafeAreaView>
  );
});

export default SafeAreaApp;
