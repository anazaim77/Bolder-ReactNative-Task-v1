import {
  AlertBox,
  CardWorkout,
  Container,
  ScrollViewApp,
  TextApp,
} from "@/components";
import { Colors } from "@/constants";
import * as React from "react";

interface WorkoutPlannerScreenProps {}

const WorkoutPlannerScreen = (props: WorkoutPlannerScreenProps) => {
  return (
    <Container flex={1} backgroundColor={Colors.background_white}>
      <ScrollViewApp padding={16}>
        <AlertBox>
          <TextApp variant="bold" color="text_primary_dark">
            Demo:{" "}
            <TextApp color="text_primary_dark">
              Toggle network to see offline functionality. All actions work
              offline and sync when online.
            </TextApp>
          </TextApp>
        </AlertBox>
        <CardWorkout>
          <TextApp>WorkoutPlannerScreen</TextApp>
        </CardWorkout>
        {/* <TextApp>WorkoutPlannerScreen</TextApp>
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
        </ButtonApp> */}
      </ScrollViewApp>
    </Container>
  );
};

export default WorkoutPlannerScreen;
