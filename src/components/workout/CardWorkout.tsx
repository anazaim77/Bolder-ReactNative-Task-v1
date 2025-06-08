import React, { memo } from "react";
import { StyleProp, ViewProps, ViewStyle } from "react-native";
import { CommonStyle, getCommonStyle } from "../common/styles/style";
import TextApp from "../common/TextApp";

export interface CardWorkoutProps extends CommonStyle, ViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CardWorkout = memo(({ children, style, ...props }: CardWorkoutProps) => {
  const _style = getCommonStyle(props);
  return (
    <CardWorkout style={[_style, style]} {...props}>
      <TextApp>WorkoutPlannerScreen</TextApp>
    </CardWorkout>
  );
});

export default CardWorkout;
