import { ButtonApp, Container, TextApp } from "@/components";

export default function HomeScreen() {
  return (
    <Container alignItems="center" justifyContent="center" flex={1}>
      <TextApp variant="light" size="xl">
        Welcome Home! Inter
      </TextApp>
      <TextApp variant="medium" size="md">
        This is your first tab screen.
      </TextApp>
      <ButtonApp variant="solid" size="lg">
        Solid
      </ButtonApp>
      <ButtonApp variant="outlined" size="lg">
        Outlined
      </ButtonApp>
    </Container>
  );
}
