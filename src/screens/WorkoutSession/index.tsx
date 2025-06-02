import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface WorkoutSessionScreenProps {}

const WorkoutSessionScreen = (props: WorkoutSessionScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>WorkoutSessionScreen</Text>
    </View>
  );
};

export default WorkoutSessionScreen;

const styles = StyleSheet.create({
  container: {},
});
