import { ButtonApp, Container, HeaderPage, ScrollViewApp } from "@/components";
import { SafeAreaApp } from "@/components";
import { Colors } from "@/constants";
import { router } from "expo-router";
import * as React from "react";
import { useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";

interface DeveloperMenuScreenProps {}

const DeveloperMenuScreen = (props: DeveloperMenuScreenProps) => {
  const handleOpenNetworkLogger = useCallback(() => {
    router.push("/(developer)/network-logger");
  }, []);

  return (
    <>
      <HeaderPage title="Developer Menu" />
      <SafeAreaApp
        backgroundColor={Colors.background_white}
        edges={["bottom"]}
        flex={1}
      >
        <ScrollViewApp paddingHorizontal={16}>
          <Container gap={8} marginTop={16}>
            <ButtonApp onPress={handleOpenNetworkLogger}>
              Open Network Logger
            </ButtonApp>
          </Container>
        </ScrollViewApp>
      </SafeAreaApp>
    </>
  );
};

export default DeveloperMenuScreen;

const styles = StyleSheet.create({
  container: {},
});
