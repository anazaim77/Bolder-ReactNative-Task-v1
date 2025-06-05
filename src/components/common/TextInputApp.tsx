import { Colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import React, { memo, useCallback, useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { ErrorText, PressableApp } from "..";
import Container, { ContainerProps } from "./Container";
import { CommonStyle, getCommonStyle } from "./styles/style";
import TextApp from "./TextApp";

interface TextInputAppProps extends CommonStyle, TextInputProps {
  isDisabled?: boolean;
  errorText?: string;
  errorVisibility?: "fixed" | "relative";
  label?: string;
  isRequired?: boolean;
  format?: "currency";
  containerProps?: ContainerProps;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const TextInputApp = memo(
  ({
    format,
    containerProps,
    style,
    label,
    errorText,
    errorVisibility,
    isRequired,
    isDisabled,
    leftComponent,
    rightComponent,
    ...props
  }: TextInputAppProps) => {
    const _style = getCommonStyle(props);
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(
      props.secureTextEntry
    );

    const toggleSecureTextEntry = useCallback(() => {
      setIsSecureTextEntry((e) => !e);
    }, []);

    const isCurrency = format === "currency";

    const isError = !!errorText;

    return (
      <Container gap={8}>
        <TextApp variant="bold" allowFontScaling={false}>
          {isRequired && <TextApp color={"error_red"}>* </TextApp>}
          {label}
        </TextApp>

        <Container flexDirection="row">
          {leftComponent}
          <Container
            backgroundColor={isDisabled ? Colors.border : Colors.text_white}
            borderRadius={16}
            borderWidth={1}
            borderColor={isError ? Colors.error_red : Colors.border}
            flex={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            {...containerProps}
          >
            <TextInput
              style={[_style, styles.textInput, style]}
              {...props}
              editable={!isDisabled}
              secureTextEntry={isSecureTextEntry}
            />
            {props.secureTextEntry && (
              <PressableApp padding={12} onPress={toggleSecureTextEntry}>
                {isSecureTextEntry ? (
                  <Feather name="eye" size={20} color="black" />
                ) : (
                  <Feather name="eye-off" size={20} color="black" />
                )}
              </PressableApp>
            )}
          </Container>
          {rightComponent}
        </Container>
        <ErrorText errorText={errorText} position={errorVisibility} />
      </Container>
    );
  }
);

export default TextInputApp;

const styles = StyleSheet.create({
  textInput: { padding: 16 },
});
