import { useKeyboardAppearance } from "@/hooks";
import { EnvUtils } from "@/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const FabDevButton = () => {
  const { isKeyboardShowing } = useKeyboardAppearance();

  const handlePress = useCallback(() => {
    router.push("/(developer)/developer-menu");
  }, []);

  return EnvUtils.isProductionBuild() || isKeyboardShowing ? (
    <View />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fab} onPress={handlePress}>
        <MaterialCommunityIcons name="dev-to" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  fab: {
    backgroundColor: "black",
    width: 35,
    height: 35,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default FabDevButton;
