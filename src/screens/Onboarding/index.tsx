import { appImages } from "@/assets";
import {
  ButtonApp,
  ImageApp,
  SafeAreaApp,
  ScrollViewApp,
  TextApp,
} from "@/components";
import { Colors, Styles } from "@/constants";
import { router } from "expo-router";
import { useCallback } from "react";

interface OnboardingScreenProps {}

const OnboardingScreen = ({}: OnboardingScreenProps) => {
  const handleGoToSignUp = useCallback(() => {
    router.push("/(auth)/sign-up");
  }, []);

  const handleGoToLogin = useCallback(() => {
    router.push("/(auth)/sign-in");
  }, []);

  return (
    <SafeAreaApp
      padding={12}
      backgroundColor={Colors.background_white}
      edges={["top"]}
      flex={1}
    >
      <ScrollViewApp>
        <ImageApp
          source={appImages.illustrationOnboarding}
          width={Styles.screen_width}
          height={200}
          marginVertical={81}
          alignSelf="center"
        />

        <TextApp size={28} variant="bold" textAlign="center" marginTop={21}>
          Welcome to Bolder!
        </TextApp>
        <TextApp
          size={"lg"}
          variant="medium"
          textAlign="center"
          paddingHorizontal={16}
          marginTop={16}
        >
          The best way to track your workouts and progress.
        </TextApp>
      </ScrollViewApp>
      <SafeAreaApp
        edges={["bottom"]}
        flexDirection="row"
        marginTop={54}
        gap={16}
      >
        <ButtonApp onPress={handleGoToLogin} flex={1}>
          Sign In
        </ButtonApp>
        <ButtonApp variant="outlined" onPress={handleGoToSignUp} flex={1}>
          Register
        </ButtonApp>
      </SafeAreaApp>
    </SafeAreaApp>
  );
};

export default OnboardingScreen;
