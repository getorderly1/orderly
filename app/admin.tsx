import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { supabase } from "../lib/supabase";

export default function AdminScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error fetching orders:", error.message);
      return;
    }

    setOrders(data || []);

    if (data && data.length > 0) {
      setSelectedOrder(data[0]);
    }
  };

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login" as any);
  }

  const openProject = () => {
    if (!selectedOrder) return;

    router.push({
      pathname: "/project",
      params: { id: selectedOrder.id },
    });
  };

  const newSubmissions = orders.filter(
    (order) => order.status === "New Submission"
  ).length;

  const quotesPending = orders.filter(
    (order) =>
      order.status === "New Submission" || order.status === "Reviewing"
  ).length;

  const activeOrders = orders.filter(
    (order) => order.status !== "Completed"
  ).length;

  const rushOrders = orders.filter((order) => order.rush_order).length;

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      <View style={[styles.sidebar, isMobile && styles.sidebarMobile]}>
        <Text style={styles.sidebarLogo}>Orderly</Text>
        <Text style={styles.sidebarSubtext}>Admin Workspace</Text>

        <TouchableOpacity style={styles.sidebarLogout} onPress={handleLogout}>
          <Text style={styles.sidebarLogoutText}>Logout</Text>
        </TouchableOpacity>

        <ScrollView horizontal={isMobile} showsHorizontalScrollIndicator={false}>
          <View style={[styles.sidebarMenu, isMobile && styles.sidebarMenuMobile]}>
            <SidebarItem label="Dashboard" active />
            <SidebarItem label="Orders" />
            <SidebarItem label="Quotes" />
            <SidebarItem label="Reorders" />
            <SidebarItem label="Rush Orders" />
            <SidebarItem label="File Center" />
            <SidebarItem label="Customers" />
            <SidebarItem label="Settings" />
          </View>
        </ScrollView>
      </View>

      <ScrollView
        style={[styles.main, isMobile && styles.mainMobile]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, isMobile && styles.headerMobile]}>
          <View style={styles.headerTextWrap}>
            <Text style={[styles.welcome, isMobile && styles.welcomeMobile]}>
              Welcome back, Katelyn
            </Text>

            <Text style={styles.subheader}>
              Review submissions, manage quotes, organize files, and move
              projects forward.
            </Text>
          </View>

          <View style={[styles.headerActions, isMobile && styles.headerActionsMobile]}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerButton} onPress={fetchOrders}>
              <Text style={styles.headerButtonText}>Refresh Orders</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.statsRow, isMobile && styles.statsRowMobile]}>
          <StatCard number={`${newSubmissions}`} label="New Submissions" />
          <StatCard number={`${quotesPending}`} label="Quotes Pending" />
          <StatCard number={`${activeOrders}`} label="Active Orders" />
          <StatCard number={`${rushOrders}`} label="Rush Orders" />
        </View>

        <View style={[styles.workspaceGrid, isMobile && styles.workspaceGridMobile]}>
          <View style={[styles.leftColumn, isMobile && styles.fullWidth]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Order Queue</Text>
              <Text style={styles.sectionHint}>Newest projects first</Text>
            </View>

            {orders.length === 0 && (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No submissions yet</Text>
                <Text style={styles.emptyText}>
                  New customer orders will appear here automatically.
                </Text>
              </View>
            )}

            {orders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={[
                  styles.orderCard,
                  selectedOrder?.id === order.id && styles.orderCardActive,
                ]}
                onPress={() => setSelectedOrder(order)}
              >
                <View style={styles.orderTopRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.projectName}>
                      {order.project_name || "Untitled Project"}
                    </Text>

                    <Text style={styles.customerName}>
                      {order.company_name || "No company added"}
                    </Text>
                  </View>

                  {order.rush_order && (
                    <View style={styles.rushBadge}>
                      <Text style={styles.rushText}>RUSH</Text>
                    </View>
                  )}
                </View>

                <View style={styles.metaRow}>
                  <StatusBadge status={order.status || "New Submission"} />

                  <Text style={styles.metaText}>
                    Due {order.due_date || "Not added"}
                  </Text>

                  <Text style={styles.metaText}>
                    {order.print_type || "Print TBD"}
                  </Text>
                </View>

                <View style={styles.orderBottomRow}>
                  <Text style={styles.orderType}>
                    {order.rush_order ? "Rush Order" : "New Order"}
                  </Text>

                  <Text style={styles.updatedText}>
                    {formatDate(order.created_at)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.previewPanel, isMobile && styles.fullWidth]}>
            {!selectedOrder ? (
              <View style={styles.emptyPreview}>
                <Text style={styles.emptyTitle}>Select an order</Text>
                <Text style={styles.emptyText}>
                  Once a customer submits an order, you’ll be able to review the
                  project details here.
                </Text>
              </View>
            ) : (
              <>
                <View
                  style={[
                    styles.previewHeader,
                    isMobile && styles.previewHeaderMobile,
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.previewLabel}>Project Workspace</Text>

                    <Text style={styles.previewTitle}>
                      {selectedOrder.project_name || "Untitled Project"}
                    </Text>

                    <Text style={styles.previewCustomer}>
                      {selectedOrder.company_name || "No company added"}
                    </Text>
                  </View>

                  <StatusBadge status={selectedOrder.status || "New Submission"} />
                </View>

                <View style={[styles.actionRow, isMobile && styles.actionRowMobile]}>
                  <TouchableOpacity
                    style={styles.primaryAction}
                    onPress={openProject}
                  >
                    <Text style={styles.primaryActionText}>Open Project</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.secondaryAction}>
                    <Text style={styles.secondaryActionText}>Send Quote</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.detailGrid}>
                  <DetailBlock
                    label="Contact"
                    value={selectedOrder.primary_contact || "Not added"}
                  />

                  <DetailBlock
                    label="Email"
                    value={selectedOrder.primary_email || "Not added"}
                  />

                  <DetailBlock
                    label="Phone"
                    value={selectedOrder.phone_number || "Not added"}
                  />

                  <DetailBlock
                    label="Due Date"
                    value={selectedOrder.due_date || "Not added"}
                  />

                  <DetailBlock
                    label="Quantity"
                    value={
                      selectedOrder.quantity
                        ? `${selectedOrder.quantity}`
                        : "Not added"
                    }
                  />

                  <DetailBlock
                    label="Budget"
                    value={selectedOrder.budget || "Not added"}
                  />
                </View>

                <View style={styles.notesBox}>
                  <Text style={styles.notesLabel}>Submission Notes</Text>

                  <Text style={styles.notesText}>
                    {selectedOrder.order_notes || "No notes added yet."}
                  </Text>
                </View>

                <View style={styles.quickTools}>
                  <Text style={styles.quickToolsTitle}>Quick Tools</Text>

                  <ToolRow
                    title="View Files"
                    subtitle="Open artwork and references"
                  />

                  <ToolRow
                    title="Add Internal Note"
                    subtitle="Keep private project notes"
                  />

                  <ToolRow
                    title="Duplicate Reorder"
                    subtitle="Create a reorder from this project"
                  />

                  <ToolRow
                    title="Update Status"
                    subtitle="Move this project forward"
                  />
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            {orders.length === 0 ? (
              <ActivityItem
                title="No activity yet"
                subtitle="Activity will appear here once customers submit orders."
              />
            ) : (
              <>
                <ActivityItem
                  title="Latest submission received"
                  subtitle={`${
                    orders[0]?.company_name || "A customer"
                  } submitted ${
                    orders[0]?.project_name || "a new project"
                  }.`}
                />

                <ActivityItem
                  title="Order queue updated"
                  subtitle={`${orders.length} total order request${
                    orders.length === 1 ? "" : "s"
                  } currently in the workspace.`}
                />

                <ActivityItem
                  title="Rush order check"
                  subtitle={`${rushOrders} rush order${
                    rushOrders === 1 ? "" : "s"
                  } currently flagged.`}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <TouchableOpacity
      style={[styles.sidebarItem, active && styles.sidebarItemActive]}
    >
      <Text style={[styles.sidebarText, active && styles.sidebarTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <View style={styles.statusBadge}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailBlock}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function ToolRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <TouchableOpacity style={styles.toolRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.toolTitle}>{title}</Text>
        <Text style={styles.toolSubtitle}>{subtitle}</Text>
      </View>

      <Text style={styles.toolArrow}>→</Text>
    </TouchableOpacity>
  );
}

function ActivityItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.activityItem}>
      <View style={styles.activityDot} />

      <View style={{ flex: 1 }}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activitySubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

function formatDate(date: string | null) {
  if (!date) return "Recently";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently";
  }

  return parsedDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f3ee",
  },

  containerMobile: {
    flexDirection: "column",
  },

  sidebar: {
    width: 255,
    backgroundColor: "#0f0f0d",
    paddingTop: 64,
    paddingHorizontal: 22,
  },

  sidebarMobile: {
    width: "100%",
    paddingTop: 34,
    paddingBottom: 18,
  },

  sidebarLogo: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -1.2,
    marginBottom: 4,
  },

  sidebarSubtext: {
    color: "#d6c7a1",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 14,
  },

  sidebarLogout: {
    backgroundColor: "#1f1f1b",
    borderWidth: 1,
    borderColor: "#33332e",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 22,
    alignItems: "center",
  },

  sidebarLogoutText: {
    color: "#d6c7a1",
    fontSize: 13,
    fontWeight: "900",
  },

  sidebarMenu: {
    gap: 9,
  },

  sidebarMenuMobile: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 24,
  },

  sidebarItem: {
    paddingVertical: 14,
    paddingHorizontal: 17,
    borderRadius: 17,
  },

  sidebarItemActive: {
    backgroundColor: "#d6c7a1",
  },

  sidebarText: {
    color: "#9c9991",
    fontSize: 15,
    fontWeight: "800",
  },

  sidebarTextActive: {
    color: "#111111",
    fontWeight: "900",
  },

  main: {
    flex: 1,
    padding: 28,
  },

  mainMobile: {
    padding: 16,
    width: "100%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 26,
    gap: 18,
  },

  headerMobile: {
    flexDirection: "column",
  },

  headerTextWrap: {
    flex: 1,
    minWidth: 0,
  },

  welcome: {
    fontSize: 38,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: -1.1,
    marginBottom: 8,
  },

  welcomeMobile: {
    fontSize: 28,
  },

  subheader: {
    fontSize: 15,
    color: "#6f6c64",
    lineHeight: 24,
    maxWidth: 560,
  },

  headerActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  headerActionsMobile: {
    width: "100%",
    justifyContent: "space-between",
  },

  logoutButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e6dfcf",
  },

  logoutButtonText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "900",
  },

  headerButton: {
    backgroundColor: "#111111",
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 18,
  },

  headerButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  statsRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 26,
  },

  statsRowMobile: {
    flexDirection: "column",
  },

  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 26,
    padding: 22,
    borderWidth: 1,
    borderColor: "#ebe7dc",
  },

  statNumber: {
    fontSize: 34,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 7,
  },

  statLabel: {
    fontSize: 13.5,
    color: "#6f6c64",
    fontWeight: "800",
  },

  workspaceGrid: {
    flexDirection: "row",
    gap: 18,
    alignItems: "flex-start",
    width: "100%",
  },

  workspaceGridMobile: {
    flexDirection: "column",
  },

  leftColumn: {
    flex: 1.1,
    minWidth: 0,
  },

  fullWidth: {
    width: "100%",
  },

  sectionHeader: {
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: -0.5,
  },

  sectionHint: {
    color: "#807d75",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },

  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#ebe7dc",
    alignItems: "center",
  },

  emptyPreview: {
    backgroundColor: "#fbfaf7",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#ebe7dc",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 8,
  },

  emptyText: {
    color: "#6f6c64",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },

  orderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ebe7dc",
    marginBottom: 13,
  },

  orderCardActive: {
    borderColor: "#d6c7a1",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  orderTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 15,
  },

  projectName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 5,
  },

  customerName: {
    fontSize: 14,
    color: "#6f6c64",
    fontWeight: "700",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },

  statusBadge: {
    backgroundColor: "#f5f3ee",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e6dfcf",
    alignSelf: "flex-start",
  },

  statusText: {
    color: "#111111",
    fontWeight: "900",
    fontSize: 12,
  },

  metaText: {
    color: "#6f6c64",
    fontSize: 13,
    fontWeight: "700",
  },

  orderBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  orderType: {
    color: "#8a6f2a",
    fontSize: 13,
    fontWeight: "900",
  },

  updatedText: {
    color: "#8d8b84",
    fontSize: 12,
    fontWeight: "700",
  },

  rushBadge: {
    backgroundColor: "#fce7e7",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    alignSelf: "flex-start",
  },

  rushText: {
    color: "#b42318",
    fontWeight: "900",
    fontSize: 11,
  },

  previewPanel: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: "#ebe7dc",
  },

  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20,
  },

  previewHeaderMobile: {
    flexDirection: "column",
  },

  previewLabel: {
    color: "#d6c7a1",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    marginBottom: 8,
  },

  previewTitle: {
    fontSize: 27,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: -0.7,
    marginBottom: 6,
  },

  previewCustomer: {
    color: "#6f6c64",
    fontSize: 14,
    fontWeight: "800",
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  actionRowMobile: {
    flexDirection: "column",
  },

  primaryAction: {
    flex: 1,
    backgroundColor: "#111111",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },

  primaryActionText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 14,
  },

  secondaryAction: {
    flex: 1,
    backgroundColor: "#f5f3ee",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e6dfcf",
  },

  secondaryActionText: {
    color: "#111111",
    fontWeight: "900",
    fontSize: 14,
  },

  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },

  detailBlock: {
    flexGrow: 1,
    flexBasis: 150,
    backgroundColor: "#fbfaf7",
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee9df",
  },

  detailLabel: {
    color: "#8a867c",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },

  detailValue: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
  },

  notesBox: {
    backgroundColor: "#111111",
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
  },

  notesLabel: {
    color: "#d6c7a1",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  notesText: {
    color: "#e7e5df",
    fontSize: 14,
    lineHeight: 22,
  },

  quickTools: {
    gap: 10,
  },

  quickToolsTitle: {
    color: "#111111",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 4,
  },

  toolRow: {
    backgroundColor: "#fbfaf7",
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee9df",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  toolTitle: {
    color: "#111111",
    fontSize: 14.5,
    fontWeight: "900",
    marginBottom: 3,
  },

  toolSubtitle: {
    color: "#6f6c64",
    fontSize: 12.5,
    fontWeight: "700",
  },

  toolArrow: {
    color: "#111111",
    fontSize: 21,
    fontWeight: "900",
  },

  activitySection: {
    marginTop: 28,
    marginBottom: 40,
  },

  activityCard: {
    backgroundColor: "#ffffff",
    borderRadius: 26,
    padding: 22,
    borderWidth: 1,
    borderColor: "#ebe7dc",
    marginTop: 14,
  },

  activityItem: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
  },

  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: "#d6c7a1",
    marginTop: 7,
  },

  activityTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 4,
  },

  activitySubtitle: {
    color: "#6f6c64",
    fontSize: 13.5,
    lineHeight: 20,
  },
});