import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface WorkoutHistoryScreenProps {}

const WorkoutHistoryScreen = (props: WorkoutHistoryScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>WorkoutHistoryScreen</Text>
    </View>
  );
};

export default WorkoutHistoryScreen;

const styles = StyleSheet.create({
  container: {},
});
