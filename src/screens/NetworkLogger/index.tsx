import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import NetworkLogger from "react-native-network-logger";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderPage } from "@/components";

const NetworkLoggerScreen = () => {
  const [isNetworkLoggerVisible, setIsNetworkLoggerVisible] = useState(false);

  const router = useRouter();

  const handleCloseNetworkLogger = useCallback(() => {
    setIsNetworkLoggerVisible(false);
    setTimeout(() => router.back(), 200);
    return true;
  }, []);

  //   useBackHandler(handleCloseNetworkLogger);

  useEffect(function openNetworkLoggerOnCreate() {
    setIsNetworkLoggerVisible(true);
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <HeaderPage
        title="Network Logger"
        onLeftPress={handleCloseNetworkLogger}
      />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        {isNetworkLoggerVisible && <NetworkLogger />}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NetworkLoggerScreen;
