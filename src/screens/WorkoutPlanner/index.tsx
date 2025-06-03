import { ButtonApp, Container, TextApp } from "@/components";
import { Colors } from "@/constants";
import { router } from "expo-router";
import * as React from "react";

interface WorkoutPlannerScreenProps {}

const WorkoutPlannerScreen = (props: WorkoutPlannerScreenProps) => {
  return (
    <Container flex={1} backgroundColor={Colors.background_gray}>
      <TextApp>WorkoutPlannerScreen</TextApp>
      <ButtonApp
        onPress={() =>
          router.push({
            pathname: "/(tabs)/workout-session",
            params: {
              workoutId: "123",
            },
          })
        }
      >
        Start session
      </ButtonApp>
    </Container>
  );
};

export default WorkoutPlannerScreen;
