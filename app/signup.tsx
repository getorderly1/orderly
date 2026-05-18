import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { supabase } from "../lib/supabase";

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    if (!fullName || !companyName || !email || !password) {
      Alert.alert(
        "Missing info",
        "Please fill out name, company, email, and password."
      );
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Signup failed", error.message);
      return;
    }

    const userId = data.user?.id;

    if (userId) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        full_name: fullName,
        company_name: companyName,
        email,
        phone,
      });

      if (profileError) {
        Alert.alert("Profile error", profileError.message);
        return;
      }
    }

    Alert.alert("Account created", "Now log in with your account.");
    router.replace("/login" as any);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.smallTitle}>ORDERLY</Text>
      <Text style={styles.title}>Create account.</Text>
      <Text style={styles.subtitle}>
        Save your info so future orders are faster.
      </Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#8a8175"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        placeholder="Company / Team Name"
        placeholderTextColor="#8a8175"
        style={styles.input}
        value={companyName}
        onChangeText={setCompanyName}
      />

      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#8a8175"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

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

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login" as any)}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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