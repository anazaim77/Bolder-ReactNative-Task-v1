import React from 'react';
import { useDummyDataLoader } from '@/hooks/useDummyDataLoader';
import AppNavigator from '@/navigation';
import { NavigationUtils } from '@/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

interface AppWrapperProps {
  initialState?: any;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ initialState }) => {
  // This hook will automatically load dummy data if the state is empty
  const { isDataLoaded, exercisesCount, workoutPlansCount } = useDummyDataLoader();

  // Optional: Log the data loading status for debugging
  React.useEffect(() => {
    if (isDataLoaded) {
      console.log(`App initialized with ${exercisesCount} exercises and ${workoutPlansCount} workout plans`);
    }
  }, [isDataLoaded, exercisesCount, workoutPlansCount]);

  return (
    <AppNavigator
      initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
      ref={NavigationUtils.navigationRef}
    />
  );
};

export default AppWrapper;