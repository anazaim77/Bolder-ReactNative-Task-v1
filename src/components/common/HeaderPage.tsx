import { Colors } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Edges } from "react-native-safe-area-context";
import { PressableApp, SafeAreaApp, TextApp } from "..";
import { ContainerProps } from "./Container";
import { CommonStyle, getCommonStyle } from "./styles/style";
import { TextAppProps } from "./TextApp";

interface HeaderPageProps extends CommonStyle {
  title?: string;
  style?: StyleProp<ViewStyle>;
  showBackButton?: boolean;
  containerProps?: ContainerProps;
  titleProps?: TextAppProps;
  isSafeTop?: boolean;
  onLeftPress?: () => void;
}

const HeaderPage: React.FC<HeaderPageProps> = ({
  title = "",
  style,
  showBackButton = true,
  containerProps,
  titleProps,
  isSafeTop = true,
  onLeftPress,
  ...props
}) => {
  const _style = getCommonStyle(props);

  const handleGoBack = useCallback(() => {
    if (onLeftPress) {
      onLeftPress();
      return;
    }
    router.back();
  }, [onLeftPress]);

  const _edges: Edges = useMemo(() => {
    if (isSafeTop) {
      return ["top"];
    }
    return [];
  }, [isSafeTop]);

  return (
    <SafeAreaApp
      edges={_edges}
      style={[_style, style]}
      flexDirection="row"
      alignItems="center"
      gap={16}
      backgroundColor={Colors.background_white}
      padding={16}
      {...containerProps}
    >
      <PressableApp onPress={handleGoBack}>
        <AntDesign name="left" size={24} color="black" />
      </PressableApp>
      <TextApp size="lg" variant="bold" color="text_black" {...titleProps}>
        {title}
      </TextApp>
    </SafeAreaApp>
  );
};

export default HeaderPage;
