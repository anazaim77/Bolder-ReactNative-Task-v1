import { Colors } from "@/constants";
import React from "react";
import { View, StyleSheet, DimensionValue } from "react-native";

interface LineProps {
  orientation: "horizontal" | "vertical";
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  color?: string;
  flex?: number;
}

const Line: React.FC<LineProps> = ({
  orientation,
  width = 10,
  height = 1,
  color = Colors.border,
  flex,
}) => {
  const styles = StyleSheet.create({
    line: {
      backgroundColor: color,
      width: orientation === "horizontal" ? width : 1,
      height: orientation === "vertical" ? height : 1,
      flex,
    },
  });

  return <View style={styles.line} />;
};

export default Line;
