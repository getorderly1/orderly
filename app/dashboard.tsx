import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function Index() {
  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login" as any);
    } else {
      router.replace("/dashboard" as any);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f2eb",
      }}
    >
      <ActivityIndicator size="large" color="#111" />
    </View>
  );
}