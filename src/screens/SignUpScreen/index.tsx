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
import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@/store";
import { signUp, useAuthSelector } from "@/store/slices/authSlice";
import { showMessage } from "react-native-flash-message";
import { Platform } from "react-native";
import { KeyboardAvoidingView } from "react-native";

const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpScreenProps {}

const SignUpScreen = (props: SignUpScreenProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAuthSelector();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = useCallback(
    (data: SignUpFormData) => {
      dispatch(
        signUp({
          params: { email: data.email, password: data.password },
          callbacks: {
            onSuccess: () => {
              router.replace("/(auth)/sign-in");
              showMessage({
                message: "Please confirm your email address",
                type: "success",
              });
            },
            onError: (error) => {
              showMessage({
                message: error.response.data.message,
                type: "danger",
              });
            },
          },
        })
      );
    },
    [dispatch, router]
  );

  return (
    <>
      <HeaderPage />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        accessible={true}
        enabled
        focusable
      >
        <SafeAreaApp
          backgroundColor={Colors.background_white}
          edges={["bottom"]}
          flex={1}
        >
          <ScrollViewApp paddingHorizontal={16}>
            <TextApp size={"3xl"} variant="bold" marginTop={34}>
              Lets Register Account
            </TextApp>
            <TextApp
              size={"xl"}
              variant="medium"
              marginTop={16}
              paddingRight={30}
            >
              Hello user, you have a greatful journey ahead
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
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <TextInputApp
                    label="Confirm Password"
                    placeholder="********"
                    keyboardType="visible-password"
                    errorText={errors.confirmPassword?.message}
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
          <ButtonApp
            onPress={handleSubmit(onSubmit)}
            flex={1}
            isLoading={isLoading}
          >
            Sign Up
          </ButtonApp>
        </SafeAreaApp>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUpScreen;
