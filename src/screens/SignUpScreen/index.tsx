import { Container, SafeAreaApp, TextApp } from "@/components";
import * as React from "react";

interface SignUpScreenProps {}

const SignUpScreen = (props: SignUpScreenProps) => {
  return (
    <SafeAreaApp>
      <Container>
        <TextApp>SignUpScreen</TextApp>
      </Container>
    </SafeAreaApp>
  );
};

export default SignUpScreen;
