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
import { useBackhandlerAndExit } from "@/hooks";
import { authService } from "@/services/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { showMessage } from "react-native-flash-message";
import { z } from "zod";

const resetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordScreenProps {}

const ResetPasswordScreen = (props: ResetPasswordScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback((data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      authService.resetPassword(
        {
          email: data.email,
        },
        {
          onSuccess: () => {
            showMessage({
              message: "Password reset instructions sent to your email",
              type: "success",
            });
            router.back();
            setIsLoading(false);
          },
          onError: (error) => {
            showMessage({
              message: error.msg,
              type: "danger",
            });
            setIsLoading(false);
          },
        }
      );
    } catch (error: any) {
      showMessage({
        message: error?.msg || "Failed to reset password",
        type: "danger",
      });
    }
  }, []);

  useBackhandlerAndExit();

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
            Reset Password
          </TextApp>
          <TextApp size={"xl"} variant="medium" marginTop={16}>
            Enter your email address and we'll send you instructions to reset
            your password.
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
          disabled
        >
          Coming Soon
        </ButtonApp>
      </SafeAreaApp>
    </>
  );
};

export default ResetPasswordScreen;
