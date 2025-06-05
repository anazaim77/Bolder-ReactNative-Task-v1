import {
  ButtonApp,
  Container,
  HeaderPage,
  SafeAreaApp,
  ScrollViewApp,
  TextApp,
  TextInputApp,
} from "@/components";
import { Colors } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInScreenProps {}

const SignInScreen = (props: SignInScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    router.push("/(tabs)/workout-planner");
  };

  return (
    <>
      <HeaderPage />
      <SafeAreaApp
        backgroundColor={Colors.background_white}
        edges={["bottom"]}
        flex={1}
      >
        <ScrollViewApp paddingHorizontal={16}>
          <TextApp size={"3xl"} variant="bold" marginTop={34}>
            Lets Sign you in
          </TextApp>
          <TextApp size={"xl"} variant="medium" marginTop={16}>
            Welcome back! Please enter your details.
          </TextApp>
          <Container marginTop={81} gap={16}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInputApp
                  label="Email"
                  placeholder="john.doe@mail.com"
                  keyboardType="email-address"
                  errorText={errors.email?.message}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInputApp
                  label="Password"
                  placeholder="********"
                  keyboardType="visible-password"
                  errorText={errors.password?.message}
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Container>
        </ScrollViewApp>
      </SafeAreaApp>
      <SafeAreaApp
        edges={["bottom"]}
        flexDirection="row"
        backgroundColor={Colors.background_white}
        padding={16}
        paddingBottom={0}
      >
        <ButtonApp onPress={handleSubmit(onSubmit)} flex={1}>
          Sign In
        </ButtonApp>
      </SafeAreaApp>
    </>
  );
};

export default SignInScreen;
