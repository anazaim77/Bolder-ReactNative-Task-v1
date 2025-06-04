import { ButtonApp, Container, SafeAreaApp, TextApp } from "@/components";
import { router } from "expo-router";
import * as React from "react";

interface SignInScreenProps {}

const SignInScreen = (props: SignInScreenProps) => {
  const handleGoToHome = () => {
    router.push("/(tabs)/workout-planner");
  };

  const handleGoToSignUp = () => {
    router.push("/(auth)/sign-up");
  };

  return (
    <SafeAreaApp padding={12}>
      <Container>
        <TextApp>SignInScreen</TextApp>

        <ButtonApp onPress={handleGoToHome}>Go To Home</ButtonApp>
        <ButtonApp variant="outlined" onPress={handleGoToSignUp}>
          Sign Up
        </ButtonApp>
      </Container>
    </SafeAreaApp>
  );
};

export default SignInScreen;
