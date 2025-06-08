export type MainTabsParamList = {
  WorkoutPlanner: undefined;
  WorkoutSession: undefined; // Or { planId: string } if you pass params
  WorkoutHistory: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined; // Or { screen: keyof MainTabsParamList }; if you want to deep link
  // Add other stack screens here
};
