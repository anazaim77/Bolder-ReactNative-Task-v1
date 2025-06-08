import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0d0d0',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
  },
});

export default WorkoutHistoryScreen;