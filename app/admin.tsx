import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";

const orders = [
  {
    id: "ORD-1001",
    project: "Spring Merch Drop",
    customer: "North Atlanta FC",
    contact: "Maya Thompson",
    email: "maya@northernfc.com",
    status: "New Submission",
    quoteStatus: "Not Started",
    due: "May 30",
    rush: true,
    files: 4,
    type: "New Order",
    updated: "2h ago",
    notes:
      "Needs shirts and hoodies for spring team store. Artwork uploaded but wants design help on sleeve placement.",
  },
  {
    id: "ORD-1002",
    project: "Summer Staff Tees",
    customer: "Solo La Familia",
    contact: "Rey Ortiz",
    email: "hello@sololafamilia.com",
    status: "Reviewing",
    quoteStatus: "In Progress",
    due: "June 8",
    rush: false,
    files: 2,
    type: "Reorder",
    updated: "5h ago",
    notes:
      "Repeat order with quantity changes. Keep same artwork but update shipping address.",
  },
  {
    id: "ORD-1003",
    project: "Tournament Jerseys",
    customer: "Elite FC",
    contact: "Carlos Rivera",
    email: "carlos@elitefc.com",
    status: "Quote Sent",
    quoteStatus: "Sent",
    due: "June 14",
    rush: false,
    files: 6,
    type: "New Order",
    updated: "1d ago",
    notes:
      "Waiting on customer approval. Jerseys need front logo, back numbers, and sponsor mark.",
  },
];

export default function AdminScreen() {
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      <View style={[styles.sidebar, isMobile && styles.sidebarMobile]}>
        <Text style={styles.sidebarLogo}>Orderly</Text>
        <Text style={styles.sidebarSubtext}>Admin Workspace</Text>

        <ScrollView
          horizontal={isMobile}
          showsHorizontalScrollIndicator={false}
        >
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

          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>+ Add Project</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.statsRow, isMobile && styles.statsRowMobile]}>
          <StatCard number="8" label="New Submissions" />
          <StatCard number="5" label="Quotes Pending" />
          <StatCard number="14" label="Active Orders" />
          <StatCard number="3" label="Rush Orders" />
        </View>

        <View style={[styles.workspaceGrid, isMobile && styles.workspaceGridMobile]}>
          <View style={[styles.leftColumn, isMobile && styles.fullWidth]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Order Queue</Text>
              <Text style={styles.sectionHint}>Newest projects first</Text>
            </View>

            {orders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={[
                  styles.orderCard,
                  selectedOrder.id === order.id && styles.orderCardActive,
                ]}
                onPress={() => setSelectedOrder(order)}
              >
                <View style={styles.orderTopRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.projectName}>{order.project}</Text>
                    <Text style={styles.customerName}>{order.customer}</Text>
                  </View>

                  {order.rush && (
                    <View style={styles.rushBadge}>
                      <Text style={styles.rushText}>RUSH</Text>
                    </View>
                  )}
                </View>

                <View style={styles.metaRow}>
                  <StatusBadge status={order.status} />
                  <Text style={styles.metaText}>Due {order.due}</Text>
                  <Text style={styles.metaText}>{order.files} files</Text>
                </View>

                <View style={styles.orderBottomRow}>
                  <Text style={styles.orderType}>{order.type}</Text>
                  <Text style={styles.updatedText}>{order.updated}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.previewPanel, isMobile && styles.fullWidth]}>
            <View style={[styles.previewHeader, isMobile && styles.previewHeaderMobile]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.previewLabel}>Project Workspace</Text>
                <Text style={styles.previewTitle}>{selectedOrder.project}</Text>
                <Text style={styles.previewCustomer}>{selectedOrder.customer}</Text>
              </View>

              <StatusBadge status={selectedOrder.status} />
            </View>

            <View style={[styles.actionRow, isMobile && styles.actionRowMobile]}>
              <TouchableOpacity style={styles.primaryAction}>
                <Text style={styles.primaryActionText}>Open Project</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryAction}>
                <Text style={styles.secondaryActionText}>Send Quote</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.detailGrid}>
              <DetailBlock label="Contact" value={selectedOrder.contact} />
              <DetailBlock label="Email" value={selectedOrder.email} />
              <DetailBlock label="Due Date" value={selectedOrder.due} />
              <DetailBlock label="Quote" value={selectedOrder.quoteStatus} />
              <DetailBlock label="Files" value={`${selectedOrder.files} uploaded`} />
              <DetailBlock label="Type" value={selectedOrder.type} />
            </View>

            <View style={styles.notesBox}>
              <Text style={styles.notesLabel}>Submission Notes</Text>
              <Text style={styles.notesText}>{selectedOrder.notes}</Text>
            </View>

            <View style={styles.quickTools}>
              <Text style={styles.quickToolsTitle}>Quick Tools</Text>

              <ToolRow title="View Files" subtitle="Open artwork and references" />
              <ToolRow title="Add Internal Note" subtitle="Keep private project notes" />
              <ToolRow title="Duplicate Reorder" subtitle="Create a reorder from this project" />
              <ToolRow title="Update Status" subtitle="Move this project forward" />
            </View>
          </View>
        </View>

        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            <ActivityItem
              title="New submission received"
              subtitle="North Atlanta FC submitted Spring Merch Drop."
            />
            <ActivityItem
              title="Artwork uploaded"
              subtitle="Solo La Familia added updated logo files."
            />
            <ActivityItem
              title="Quote sent"
              subtitle="Elite FC received the tournament jersey quote."
            />
            <ActivityItem
              title="Rush order flagged"
              subtitle="A project was marked urgent for May 30."
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <TouchableOpacity style={[styles.sidebarItem, active && styles.sidebarItemActive]}>
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
    marginBottom: 24,
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