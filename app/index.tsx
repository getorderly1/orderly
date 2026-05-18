import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";
type Order = {
  id: string;
  project_name?: string | null;
  customer_name?: string | null;
  status?: string | null;
  created_at?: string | null;
};

export default function HomeScreen() {
  const [showAbout, setShowAbout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const { width } = useWindowDimensions();

  const isWide = width >= 800;

  useEffect(() => {
    checkUserAndLoadOrders();
  }, []);

 async function checkUserAndLoadOrders() {
  setLoading(true);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    router.replace("/login" as any);
    return;
  }

 const userEmail = session.user.email?.toLowerCase();

const { data: profile } = await supabase
  .from("profiles")
  .select("role, email")
  .eq("id", session.user.id)
  .maybeSingle();

const profileEmail = profile?.email?.toLowerCase();

const isKatelynAdmin =
  profile?.role === "admin" ||
  userEmail === "katelyn@blackcatmerch.com" ||
  profileEmail === "katelyn@blackcatmerch.com";

if (isKatelynAdmin) {
  router.replace("/admin" as any);
  return;
}

router.replace("/" as any);

  const { data, error } = await supabase
    .from("orders")
    .select("id, project_name, customer_name, status, created_at")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  if (!error && data) {
    setOrders(data);
  }

  setLoading(false);
}

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login" as any);
  }

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#111111" />
        <Text style={styles.loadingText}>Loading Orderly...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <View style={styles.topRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>YOUR MERCH WORKSPACE</Text>
            </View>

            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            delayLongPress={700}
            onLongPress={() => router.push("/admin" as any)}
          >
            <Text style={styles.logo}>Orderly</Text>
          </TouchableOpacity>

          <Text style={styles.slogan}>Merch ordering made simple.</Text>
        </View>
      </View>

      <View style={styles.shell}>
        <View style={styles.mainPanel}>
          <TouchableOpacity
            style={styles.startCard}
            activeOpacity={0.85}
            onPress={() => router.push("/new-order" as any)}
          >
            <View>
              <Text style={styles.startTitle}>Start New Order</Text>
            </View>

            <View style={styles.arrowCircleGold}>
              <Text style={styles.arrowTextDark}>➜</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reorderCard}
            activeOpacity={0.85}
            onPress={() => router.push("/reorder" as any)}
          >
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Reorder</Text>

              <Text style={styles.cardText}>
                Update quantities, artwork, shipping details, and other changes
                for repeat orders.
              </Text>
            </View>

            <View style={styles.arrowCircleDark}>
              <Text style={styles.arrowTextLight}>➜</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.smallGrid, isWide && styles.smallGridWide]}>
          <TouchableOpacity
            style={[styles.smallCard, isWide && styles.smallCardWide]}
            activeOpacity={0.85}
            onPress={() => router.push("/file-center" as any)}
          >
            <Text style={styles.eyebrow}>FILES</Text>
            <Text style={styles.smallTitle}>File Center</Text>
            <Text style={styles.smallText}>
              Access artwork, design files, references, and project documents.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallCard, isWide && styles.smallCardWide]}
            activeOpacity={0.85}
            onPress={() => router.push("/track-order" as any)}
          >
            <Text style={styles.eyebrow}>STATUS</Text>
            <Text style={styles.smallTitle}>Track Order</Text>
            <Text style={styles.smallText}>
              Follow your order from submission to completion.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallCard, isWide && styles.smallCardWide]}
            activeOpacity={0.85}
            onPress={() => router.push("/ask-question" as any)}
          >
            <Text style={styles.eyebrow}>SUPPORT</Text>
            <Text style={styles.smallTitle}>Ask a Question</Text>
            <Text style={styles.smallText}>
              Get help with garments, sizing, design, print guidance, or
              recommendations.
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ordersCard}>
          <Text style={styles.ordersTitle}>Recent Orders</Text>

          {orders.length === 0 ? (
            <Text style={styles.emptyOrdersText}>
              No orders submitted yet. Start a new order to begin.
            </Text>
          ) : (
            orders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderRow}
                onPress={() => router.push(`/project/${order.id}` as any)}
              >
                <View>
                  <Text style={styles.orderName}>
                    {order.project_name || "Untitled Project"}
                  </Text>
                  <Text style={styles.orderCustomer}>
                    {order.customer_name || "Customer"}
                  </Text>
                </View>

                <Text style={styles.orderStatus}>
                  {order.status || "Submitted"}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <TouchableOpacity
          style={styles.aboutButton}
          activeOpacity={0.85}
          onPress={() => setShowAbout(!showAbout)}
        >
          <View>
            <Text style={styles.aboutTitle}>What is Orderly?</Text>
            <Text style={styles.aboutSubtext}>Tap to learn more</Text>
          </View>

          <View style={styles.plusCircle}>
            <Text style={styles.plusText}>{showAbout ? "−" : "+"}</Text>
          </View>
        </TouchableOpacity>

        {showAbout && (
          <View style={styles.aboutCard}>
            <Text style={styles.aboutHeadline}>
              Orderly is built to simplify merch ordering.
            </Text>

            <Text style={styles.aboutText}>
              Submit merch projects, upload artwork, request design help,
              organize shipping details, add project collaborators, and reorder
              past projects all in one place.
            </Text>

            <Text style={styles.aboutText}>
              Orderly creates a cleaner and more organized experience for
              customers, brands, teams, and account managers by keeping every
              project connected from the first request to the final order.
            </Text>

            <Text style={styles.aboutTagline}>
              Less chaos. Better workflows. Smarter ordering.
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Clean workflows. Seamless ordering.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f1eb",
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: "#f4f1eb",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#111111",
    fontWeight: "900",
  },

  hero: {
    backgroundColor: "#0f0f0d",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  heroInner: {
    paddingTop: 42,
    paddingBottom: 34,
    paddingHorizontal: 28,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#1c1b18",
    borderColor: "#d6c7a1",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 999,
  },

  badgeText: {
    color: "#d6c7a1",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  logoutText: {
    color: "#d6c7a1",
    fontSize: 13,
    fontWeight: "900",
  },

  logo: {
    fontSize: 38,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -1.2,
    marginBottom: 12,
  },

  slogan: {
    fontSize: 12,
    fontWeight: "900",
    color: "#d6c7a1",
    lineHeight: 30,
    maxWidth: 290,
  },

  shell: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },

  mainPanel: {
    marginTop: -10,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: "#e5dfd2",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  startCard: {
    minHeight: 64,
    backgroundColor: "#0f0f0d",
    borderRadius: 17,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  startTitle: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
  },

  reorderCard: {
    minHeight: 78,
    backgroundColor: "#f7f5f0",
    borderRadius: 17,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#ebe5d8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardTextWrap: {
    flex: 1,
    paddingRight: 14,
  },

  cardTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },

  cardText: {
    color: "#6c675e",
    fontSize: 13,
    lineHeight: 19,
  },

  arrowCircleGold: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#d6c7a1",
    alignItems: "center",
    justifyContent: "center",
  },

  arrowCircleDark: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  arrowTextDark: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "900",
  },

  arrowTextLight: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  smallGrid: {
    marginTop: 14,
    gap: 12,
  },

  smallGridWide: {
    flexDirection: "row",
  },

  smallCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5dfd2",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },

  smallCardWide: {
    flex: 1,
  },

  eyebrow: {
    color: "#d6c7a1",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 9,
  },

  smallTitle: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 8,
  },

  smallText: {
    color: "#6c675e",
    fontSize: 13,
    lineHeight: 19,
  },

  ordersCard: {
    marginTop: 14,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5dfd2",
  },

  ordersTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
  },

  emptyOrdersText: {
    color: "#6c675e",
    fontSize: 14,
    lineHeight: 20,
  },

  orderRow: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee7dc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderName: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "900",
  },

  orderCustomer: {
    color: "#6c675e",
    fontSize: 13,
    marginTop: 3,
  },

  orderStatus: {
    backgroundColor: "#f4f1eb",
    color: "#111111",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "900",
  },

  aboutButton: {
    marginTop: 14,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingVertical: 17,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#e5dfd2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  aboutTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },

  aboutSubtext: {
    color: "#77736b",
    fontSize: 13,
  },

  plusCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  plusText: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "900",
    marginTop: -2,
  },

  aboutCard: {
    marginTop: 12,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "#e5dfd2",
  },

  aboutHeadline: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111111",
    lineHeight: 28,
    marginBottom: 14,
  },

  aboutText: {
    fontSize: 14.5,
    color: "#504f4a",
    lineHeight: 23,
    marginBottom: 12,
  },

  aboutTagline: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
    lineHeight: 22,
  },

  footer: {
    paddingTop: 16,
    paddingBottom: 20,
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#8a867c",
    fontWeight: "900",
  },
});