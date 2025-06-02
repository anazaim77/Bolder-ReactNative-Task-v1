import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface WorkoutPlannerScreenProps {}

const WorkoutPlannerScreen = (props: WorkoutPlannerScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>WorkoutPlannerScreen</Text>
    </View>
  );
};

export default WorkoutPlannerScreen;

const styles = StyleSheet.create({
  container: {},
});
