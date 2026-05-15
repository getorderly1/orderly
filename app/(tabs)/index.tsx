import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>MERCH WORKFLOW SYSTEM</Text>
        </View>

        <TouchableOpacity onLongPress={() => router.push("/admin")}>
  <Text style={styles.logo}>Orderly</Text>
</TouchableOpacity>

        <Text style={styles.slogan}>Merch ordering made simple.</Text>
      </View>

      <View style={styles.workflowPanel}>
        <TouchableOpacity
          style={styles.startCard}
          onPress={() => router.push("/new-order")}
        >
          <View style={styles.cardContent}>
            <Text style={styles.startTitle}>Start New Order</Text>
            <Text style={styles.startText}></Text>
          </View>

          <View style={styles.arrowCircleGold}>
            <Text style={styles.arrowDark}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reorderCard}>
          <View style={styles.cardContent}>
            <Text style={styles.reorderTitle}>Reorder</Text>
            <Text style={styles.reorderText}>
              Update quantities, artwork, shipping details, and other changes
              for repeat orders.
            </Text>
          </View>

          <View style={styles.arrowCircleDark}>
            <Text style={styles.arrowLight}>→</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.utilityGrid}>
        <TouchableOpacity style={styles.utilityCard}>
          <Text style={styles.utilityLabel}>FILES</Text>
          <Text style={styles.utilityTitle}>File Center</Text>
          <Text style={styles.utilityText}>
            Access artwork, design files, references, and project documents.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.utilityCard}>
          <Text style={styles.utilityLabel}>STATUS</Text>
          <Text style={styles.utilityTitle}>Track Order</Text>
          <Text style={styles.utilityText}>
            Follow your order from submission to completion.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.utilityCard}>
          <Text style={styles.utilityLabel}>SUPPORT</Text>
          <Text style={styles.utilityTitle}>Ask a Question</Text>
          <Text style={styles.utilityText}>
            Get help with garments, sizing, design, print guidance, or
            recommendations.
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => setShowAbout(!showAbout)}
      >
        <View>
          <Text style={styles.aboutButtonTitle}>What is Orderly?</Text>
          <Text style={styles.aboutButtonSubtext}>Tap to learn more</Text>
        </View>

        <View style={styles.circleButton}>
          <Text style={styles.chevron}>{showAbout ? "−" : "+"}</Text>
        </View>
      </TouchableOpacity>

      {showAbout && (
        <View style={styles.aboutCard}>
          <Text style={styles.aboutHeadline}>
            Orderly is built to simplify merch ordering.
          </Text>

          <Text style={styles.aboutText}>
            It streamlines merch intake, reorders, and communication from
            request to production by helping customers submit project details,
            upload artwork, request design help, organize shipping information,
            and reorder past projects all in one place.
          </Text>

          <Text style={styles.aboutText}>
            Orderly creates a cleaner and more organized experience for
            customers, brands, teams, and account managers by keeping every
            project connected from the first request to the final order.
          </Text>

          <Text style={styles.aboutText}>
            Whether you are placing a new order, requesting a reorder, or
            building out a full merch project, Orderly helps keep communication
            simple, details organized, and projects moving forward.
          </Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Clean workflows. Seamless ordering.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ee",
  },

  hero: {
    paddingTop: 72,
    paddingBottom: 54,
    paddingHorizontal: 24,
    backgroundColor: "#0f0f0d",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#24231f",
    borderColor: "#d6c7a1",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 34,
  },

  badgeText: {
    color: "#d6c7a1",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  logo: {
    fontSize: 56,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -1.8,
    marginBottom: 18,
  },

  slogan: {
    fontSize: 31,
    fontWeight: "900",
    color: "#d6c7a1",
    lineHeight: 39,
    maxWidth: 360,
  },

  workflowPanel: {
    marginTop: -24,
    marginHorizontal: 18,
    padding: 18,
    backgroundColor: "#ffffff",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#ebe7dc",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
    gap: 14,
  },

  startCard: {
    backgroundColor: "#111111",
    borderRadius: 28,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  reorderCard: {
    backgroundColor: "#f5f3ee",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e6dfcf",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardContent: {
    flex: 1,
    paddingRight: 16,
  },

  startTitle: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginBottom: 10,
  },

  startText: {
    color: "#dadad4",
    fontSize: 15.5,
    lineHeight: 23,
  },

  reorderTitle: {
    color: "#111111",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginBottom: 10,
  },

  reorderText: {
    color: "#68655d",
    fontSize: 15.5,
    lineHeight: 23,
  },

  arrowCircleGold: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#d6c7a1",
    alignItems: "center",
    justifyContent: "center",
  },

  arrowCircleDark: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  arrowDark: {
    color: "#111111",
    fontSize: 24,
    fontWeight: "900",
    marginTop: -2,
  },

  arrowLight: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    marginTop: -2,
  },

  utilityGrid: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingTop: 18,
    gap: 12,
  },

  utilityCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ece8dd",
    minHeight: 155,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },

  utilityLabel: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.1,
    color: "#d6c7a1",
    marginBottom: 16,
  },

  utilityTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 8,
    letterSpacing: -0.3,
  },

  utilityText: {
    fontSize: 13.5,
    color: "#68655d",
    lineHeight: 20,
  },

  aboutButton: {
    marginTop: 18,
    marginHorizontal: 18,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ece8dd",
  },

  aboutButtonTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: -0.3,
  },

  aboutButtonSubtext: {
    fontSize: 14,
    color: "#77746c",
    marginTop: 5,
  },

  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  chevron: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: -2,
  },

  aboutCard: {
    marginTop: 12,
    marginHorizontal: 18,
    padding: 28,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#ebe7dc",
  },

  aboutHeadline: {
    fontSize: 34,
    fontWeight: "900",
    color: "#111111",
    lineHeight: 40,
    letterSpacing: -1,
    marginBottom: 24,
    maxWidth: 760,
  },

  aboutText: {
    fontSize: 15.5,
    color: "#504f4a",
    lineHeight: 27,
    marginBottom: 18,
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 42,
    paddingTop: 22,
  },

  footerText: {
    textAlign: "center",
    fontSize: 13,
    color: "#8a867c",
    fontWeight: "800",
  },
});