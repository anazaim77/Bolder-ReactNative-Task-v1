import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutSessionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Session</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
  },
});

export default WorkoutSessionScreen;