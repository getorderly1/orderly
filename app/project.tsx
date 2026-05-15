import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProjectScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.projectLabel}>PROJECT WORKSPACE</Text>

          <Text style={styles.projectTitle}>
            Spring Merch Drop
          </Text>

          <Text style={styles.customerName}>
            North Atlanta FC
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Reviewing</Text>
        </View>
      </View>

      {/* ACTIONS */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            Send Quote
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>
            Update Status
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>
            Duplicate Reorder
          </Text>
        </TouchableOpacity>
      </View>

      {/* OVERVIEW */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Project Overview
        </Text>

        <View style={styles.grid}>
          <InfoCard
            label="Primary Contact"
            value="Maya Thompson"
          />

          <InfoCard
            label="Email"
            value="maya@northernfc.com"
          />

          <InfoCard
            label="Due Date"
            value="May 30"
          />

          <InfoCard
            label="Order Type"
            value="New Order"
          />

          <InfoCard
            label="Rush Order"
            value="Yes"
          />

          <InfoCard
            label="Files Uploaded"
            value="4 Files"
          />
        </View>
      </View>

      {/* GARMENTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Garment Details
        </Text>

        <View style={styles.detailCard}>
          <DetailRow
            label="Garment Type"
            value="Heavyweight T-Shirts"
          />

          <DetailRow
            label="Brand Preference"
            value="Comfort Colors"
          />

          <DetailRow
            label="Color"
            value="Black"
          />

          <DetailRow
            label="Quantity"
            value="120"
          />

          <DetailRow
            label="Print Type"
            value="Screen Print"
          />

          <DetailRow
            label="Print Locations"
            value="Front Chest + Full Back"
          />
        </View>
      </View>

      {/* SIZES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Size Breakdown
        </Text>

        <View style={styles.sizeGrid}>
          <SizeCard size="S" qty="20" />
          <SizeCard size="M" qty="40" />
          <SizeCard size="L" qty="35" />
          <SizeCard size="XL" qty="20" />
          <SizeCard size="2XL" qty="5" />
        </View>
      </View>

      {/* ARTWORK */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Artwork & Files
        </Text>

        <View style={styles.filesCard}>
          <FileRow file="front-logo.ai" />
          <FileRow file="back-design.png" />
          <FileRow file="mockup-v2.jpg" />
          <FileRow file="brand-guide.pdf" />
        </View>
      </View>

      {/* SHIPPING */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Shipping Information
        </Text>

        <View style={styles.detailCard}>
          <DetailRow
            label="Recipient"
            value="North Atlanta FC"
          />

          <DetailRow
            label="Delivery Method"
            value="Shipping"
          />

          <DetailRow
            label="Address"
            value="Atlanta, GA 30328"
          />
        </View>
      </View>

      {/* NOTES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Internal Notes
        </Text>

        <View style={styles.notesCard}>
          <TimelineItem
            date="May 20"
            text="Customer requested heavyweight options."
          />

          <TimelineItem
            date="May 21"
            text="Waiting on final sleeve placement approval."
          />

          <TimelineItem
            date="May 22"
            text="Need quote from SanMar."
          />
        </View>
      </View>

      {/* QUOTE BUILDER */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Quote Builder
        </Text>

        <View style={styles.quoteCard}>
          <QuoteRow label="Garment Cost" value="$680" />
          <QuoteRow label="Print Cost" value="$320" />
          <QuoteRow label="Screen Fees" value="$45" />
          <QuoteRow label="Shipping" value="$70" />

          <View style={styles.quoteDivider} />

          <QuoteRow label="Margin" value="40%" />
          <QuoteRow label="Processing Fee" value="3.8%" />

          <View style={styles.quoteDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Final Quote
            </Text>

            <Text style={styles.totalValue}>
              $1,598
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function SizeCard({
  size,
  qty,
}: {
  size: string;
  qty: string;
}) {
  return (
    <View style={styles.sizeCard}>
      <Text style={styles.sizeLabel}>{size}</Text>
      <Text style={styles.sizeQty}>{qty}</Text>
    </View>
  );
}

function FileRow({
  file,
}: {
  file: string;
}) {
  return (
    <TouchableOpacity style={styles.fileRow}>
      <Text style={styles.fileName}>{file}</Text>

      <Text style={styles.fileArrow}>→</Text>
    </TouchableOpacity>
  );
}

function TimelineItem({
  date,
  text,
}: {
  date: string;
  text: string;
}) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />

      <View style={{ flex: 1 }}>
        <Text style={styles.timelineDate}>{date}</Text>
        <Text style={styles.timelineText}>{text}</Text>
      </View>
    </View>
  );
}

function QuoteRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.quoteRow}>
      <Text style={styles.quoteLabel}>{label}</Text>
      <Text style={styles.quoteValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ee",
    padding: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },

  projectLabel: {
    color: "#d6c7a1",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  projectTitle: {
    fontSize: 40,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: -1.2,
    marginBottom: 6,
  },

  customerName: {
    color: "#6f6c64",
    fontSize: 16,
    fontWeight: "700",
  },

  statusBadge: {
    backgroundColor: "#111111",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },

  statusText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 12,
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },

  primaryButton: {
    backgroundColor: "#111111",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 18,
  },

  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "900",
  },

  secondaryButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e6dfcf",
  },

  secondaryButtonText: {
    color: "#111111",
    fontWeight: "900",
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 18,
    letterSpacing: -0.5,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  infoCard: {
    flexGrow: 1,
    flexBasis: 180,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#ebe7dc",
  },

  infoLabel: {
    color: "#8a867c",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
    marginBottom: 7,
  },

  infoValue: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "800",
  },

  detailCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#ebe7dc",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  detailLabel: {
    color: "#6f6c64",
    fontSize: 14,
    fontWeight: "700",
  },

  detailValue: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "900",
  },

  sizeGrid: {
    flexDirection: "row",
    gap: 12,
  },

  sizeCard: {
    width: 90,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    paddingVertical: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ebe7dc",
  },

  sizeLabel: {
    color: "#6f6c64",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
  },

  sizeQty: {
    color: "#111111",
    fontSize: 28,
    fontWeight: "900",
  },

  filesCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#ebe7dc",
  },

  fileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0ece3",
  },

  fileName: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "800",
  },

  fileArrow: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "900",
  },

  notesCard: {
    backgroundColor: "#111111",
    borderRadius: 24,
    padding: 22,
  },

  timelineItem: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
  },

  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: "#d6c7a1",
    marginTop: 7,
  },

  timelineDate: {
    color: "#d6c7a1",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 5,
  },

  timelineText: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 22,
  },

  quoteCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#ebe7dc",
  },

  quoteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  quoteLabel: {
    color: "#6f6c64",
    fontSize: 14,
    fontWeight: "700",
  },

  quoteValue: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "900",
  },

  quoteDivider: {
    height: 1,
    backgroundColor: "#ece7dc",
    marginVertical: 18,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111111",
  },

  totalValue: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111111",
  },
});