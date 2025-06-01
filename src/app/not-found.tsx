import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Not Found Page</Text>
      <Text style={styles.description}>
        The page you are looking for does not exist.
      </Text>
      <Link href="/(tabs)/home" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go Back Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#f4511e",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
