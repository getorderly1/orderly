import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter your email and password.");
      return;
    }

    if (isLoggingIn) return;

    setIsLoggingIn(true);

    const cleanEmail = email.trim().toLowerCase();

    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      setIsLoggingIn(false);
      Alert.alert("Login failed", error.message);
      return;
    }

    if (!session?.user?.id) {
      setIsLoggingIn(false);
      Alert.alert("Login failed", "Could not find user session.");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, email")
      .eq("id", session.user.id)
      .single();

    setIsLoggingIn(false);

    if (profileError) {
      Alert.alert(
        "Profile issue",
        "You are logged in, but your profile could not be loaded."
      );
      router.replace("/" as any);
      return;
    }

    if (profile?.role === "admin") {
      router.replace("/admin" as any);
      return;
    }

    router.replace("/" as any);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.smallTitle}>ORDERLY</Text>
      <Text style={styles.title}>Welcome back.</Text>
      <Text style={styles.subtitle}>Log in to continue your workspace.</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#8a8175"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#8a8175"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, isLoggingIn && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoggingIn}
      >
        <Text style={styles.buttonText}>
          {isLoggingIn ? "Logging in..." : "Log In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup" as any)}>
        <Text style={styles.link}>Need an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f5f2eb",
  },
  smallTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#5a5147",
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#111",
  },
  subtitle: {
    fontSize: 15,
    color: "#5a5147",
    marginTop: 8,
    marginBottom: 28,
  },
  input: {
    backgroundColor: "#fffaf2",
    borderWidth: 1,
    borderColor: "#ded5c8",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  link: {
    marginTop: 22,
    textAlign: "center",
    fontWeight: "700",
    color: "#111",
  },
});