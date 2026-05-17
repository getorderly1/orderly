import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { supabase } from "../lib/supabase";

const screenPrintGrid: Record<string, Record<number, number>> = {
  "36-71": { 1: 2.07, 2: 2.47, 3: 2.87, 4: 3.26, 5: 3.66, 6: 4.06 },
  "72-143": { 1: 1.67, 2: 1.93, 3: 2.2, 4: 2.47, 5: 2.73, 6: 3.0 },
  "144-287": { 1: 1.39, 2: 1.58, 3: 1.77, 4: 1.96, 5: 2.14, 6: 2.33 },
  "288-599": { 1: 1.19, 2: 1.39, 3: 1.57, 4: 1.76, 5: 1.94, 6: 2.13 },
  "600-1200": { 1: 0.99, 2: 1.18, 3: 1.34, 4: 1.52, 5: 1.69, 6: 1.87 },
};

export default function ProjectScreen() {
  const { id } = useLocalSearchParams();

  const [project, setProject] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [garmentCost, setGarmentCost] = useState("0");
  const [quantity, setQuantity] = useState("0");

  const [location1Colors, setLocation1Colors] = useState("1");
  const [location2Colors, setLocation2Colors] = useState("0");
  const [location3Colors, setLocation3Colors] = useState("0");

  const [screenPrintOverride, setScreenPrintOverride] = useState("");

  const [embroideryStitchCount, setEmbroideryStitchCount] = useState("0");
  const [embroideryQuantity, setEmbroideryQuantity] = useState("0");
  const [embroideryRate, setEmbroideryRate] = useState("0");
  const [embroideryOverride, setEmbroideryOverride] = useState("");

  const [tagRemovalFee, setTagRemovalFee] = useState("0");
  const [foldingFee, setFoldingFee] = useState("0");
  const [sizeStickerFee, setSizeStickerFee] = useState("0");
  const [hangTagFee, setHangTagFee] = useState("0");
  const [neckLabelFee, setNeckLabelFee] = useState("0");

  const [designFee, setDesignFee] = useState("0");
  const [screenFees, setScreenFees] = useState("0");
  const [digitizingFee, setDigitizingFee] = useState("0");
  const [shippingCost, setShippingCost] = useState("0");
  const [packagingFee, setPackagingFee] = useState("0");
  const [additionalFees, setAdditionalFees] = useState("0");

  const [marginPercent, setMarginPercent] = useState("40");
  const [processingPercent, setProcessingPercent] = useState("3.8");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [pricingOverrideNote, setPricingOverrideNote] = useState("");

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    const projectId = typeof id === "string" ? id : "";

    if (!projectId) return;

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", projectId)
      .single();

    if (error) {
      console.log("Project fetch error:", error.message);
      return;
    }

    setProject(data);

    setGarmentCost(String(data.garment_cost || 0));
    setQuantity(String(data.quantity || 0));

    setLocation1Colors(String(data.print_location_1_colors || 1));
    setLocation2Colors(String(data.print_location_2_colors || 0));
    setLocation3Colors(String(data.print_location_3_colors || 0));

    setEmbroideryStitchCount(String(data.embroidery_stitch_count || 0));
    setEmbroideryQuantity(String(data.embroidery_quantity || data.quantity || 0));
    setEmbroideryRate(String(data.embroidery_rate || 0));
    setEmbroideryOverride(
      data.embroidery_override && Number(data.embroidery_override) > 0
        ? String(data.embroidery_override)
        : ""
    );

    setTagRemovalFee(String(data.tag_removal_fee || 0));
    setFoldingFee(String(data.folding_fee || 0));
    setSizeStickerFee(String(data.size_sticker_fee || 0));
    setHangTagFee(String(data.hang_tag_fee || 0));
    setNeckLabelFee(String(data.neck_label_fee || 0));

    setDesignFee(String(data.design_fee || 0));
    setScreenFees(String(data.screen_fees || 0));
    setDigitizingFee(String(data.digitizing_fee || 0));
    setShippingCost(String(data.shipping_cost || 0));
    setPackagingFee(String(data.packaging_fee || 0));
    setAdditionalFees(String(data.additional_fees || 0));

    setMarginPercent(String(data.margin_percent || 40));
    setProcessingPercent(String(data.processing_percent || 3.8));
    setQuoteNotes(data.quote_notes || "");
    setPricingOverrideNote(data.pricing_override_note || "");
  };

  const numberValue = (value: string) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const getQtyTier = (qty: number) => {
    if (qty >= 600) return "600-1200";
    if (qty >= 288) return "288-599";
    if (qty >= 144) return "144-287";
    if (qty >= 72) return "72-143";
    return "36-71";
  };

  const getScreenPrintRate = (qty: number, colors: number) => {
    if (qty <= 0 || colors <= 0) return 0;

    const tier = getQtyTier(qty);
    const safeColors = Math.min(Math.max(colors, 1), 6);

    return screenPrintGrid[tier]?.[safeColors] || 0;
  };

  const qty = numberValue(quantity);

  const totalGarmentCost = useMemo(() => {
    return numberValue(garmentCost) * qty;
  }, [garmentCost, qty]);

  const location1Rate = useMemo(
    () => getScreenPrintRate(qty, numberValue(location1Colors)),
    [qty, location1Colors]
  );

  const location2Rate = useMemo(
    () => getScreenPrintRate(qty, numberValue(location2Colors)),
    [qty, location2Colors]
  );

  const location3Rate = useMemo(
    () => getScreenPrintRate(qty, numberValue(location3Colors)),
    [qty, location3Colors]
  );

  const location1Cost = useMemo(
    () => location1Rate * qty,
    [location1Rate, qty]
  );

  const location2Cost = useMemo(
    () => location2Rate * qty,
    [location2Rate, qty]
  );

  const location3Cost = useMemo(
    () => location3Rate * qty,
    [location3Rate, qty]
  );

  const autoScreenPrintCost = useMemo(
    () => location1Cost + location2Cost + location3Cost,
    [location1Cost, location2Cost, location3Cost]
  );

  const screenPrintCost = screenPrintOverride.trim()
    ? numberValue(screenPrintOverride)
    : autoScreenPrintCost;

  const autoEmbroideryCost = useMemo(() => {
    return numberValue(embroideryQuantity) * numberValue(embroideryRate);
  }, [embroideryQuantity, embroideryRate]);

  const embroideryCost = embroideryOverride.trim()
    ? numberValue(embroideryOverride)
    : autoEmbroideryCost;

  const finishingFees = useMemo(() => {
    return (
      numberValue(tagRemovalFee) +
      numberValue(foldingFee) +
      numberValue(sizeStickerFee) +
      numberValue(hangTagFee) +
      numberValue(neckLabelFee)
    );
  }, [
    tagRemovalFee,
    foldingFee,
    sizeStickerFee,
    hangTagFee,
    neckLabelFee,
  ]);

  const internalCost = useMemo(() => {
    return (
      totalGarmentCost +
      screenPrintCost +
      embroideryCost +
      finishingFees +
      numberValue(designFee) +
      numberValue(screenFees) +
      numberValue(digitizingFee) +
      numberValue(shippingCost) +
      numberValue(packagingFee) +
      numberValue(additionalFees)
    );
  }, [
    totalGarmentCost,
    screenPrintCost,
    embroideryCost,
    finishingFees,
    designFee,
    screenFees,
    digitizingFee,
    shippingCost,
    packagingFee,
    additionalFees,
  ]);

  const marginAmount = useMemo(() => {
    return internalCost * (numberValue(marginPercent) / 100);
  }, [internalCost, marginPercent]);

  const subtotalWithMargin = useMemo(() => {
    return internalCost + marginAmount;
  }, [internalCost, marginAmount]);

  const processingAmount = useMemo(() => {
    return subtotalWithMargin * (numberValue(processingPercent) / 100);
  }, [subtotalWithMargin, processingPercent]);

  const finalQuote = useMemo(() => {
    return subtotalWithMargin + processingAmount;
  }, [subtotalWithMargin, processingAmount]);

  const saveQuote = async () => {
    if (!project?.id || isSaving) return;

    setIsSaving(true);

    const { error } = await supabase
      .from("orders")
      .update({
        quantity: Math.round(numberValue(quantity)),

        garment_cost: numberValue(garmentCost),

        print_location_1_colors: Math.round(numberValue(location1Colors)),
        print_location_2_colors: Math.round(numberValue(location2Colors)),
        print_location_3_colors: Math.round(numberValue(location3Colors)),

        print_location_1_cost: location1Cost,
        print_location_2_cost: location2Cost,
        print_location_3_cost: location3Cost,

        screen_print_cost: screenPrintCost,

        embroidery_stitch_count: Math.round(numberValue(embroideryStitchCount)),
        embroidery_quantity: Math.round(numberValue(embroideryQuantity)),
        embroidery_rate: numberValue(embroideryRate),
        embroidery_override: embroideryOverride.trim()
          ? numberValue(embroideryOverride)
          : 0,
        embroidery_cost: embroideryCost,

        tag_removal_fee: numberValue(tagRemovalFee),
        folding_fee: numberValue(foldingFee),
        size_sticker_fee: numberValue(sizeStickerFee),
        hang_tag_fee: numberValue(hangTagFee),
        neck_label_fee: numberValue(neckLabelFee),

        finishing_fees: finishingFees,
        design_fee: numberValue(designFee),
        screen_fees: numberValue(screenFees),
        digitizing_fee: numberValue(digitizingFee),
        shipping_cost: numberValue(shippingCost),
        packaging_fee: numberValue(packagingFee),
        additional_fees: numberValue(additionalFees),

        margin_percent: numberValue(marginPercent),
        processing_percent: numberValue(processingPercent),
        final_quote: finalQuote,
        quote_notes: quoteNotes,
        pricing_override_note: pricingOverrideNote,
      })
      .eq("id", project.id);

    setIsSaving(false);

    if (error) {
      alert(`Could not save quote: ${error.message}`);
      return;
    }

    alert("Quote saved.");
    fetchProject();
  };

  if (!project) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Loading project...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back to Admin</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View>
          <Text style={styles.projectLabel}>PROJECT WORKSPACE</Text>
          <Text style={styles.projectTitle}>
            {project.project_name || "Untitled Project"}
          </Text>
          <Text style={styles.customerName}>
            {project.company_name || "No company added"}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {project.status || "New Submission"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Project Overview</Text>

        <View style={styles.grid}>
          <InfoCard label="Primary Contact" value={project.primary_contact || "Not added"} />
          <InfoCard label="Email" value={project.primary_email || "Not added"} />
          <InfoCard label="Phone" value={project.phone_number || "Not added"} />
          <InfoCard label="Due Date" value={project.due_date || "Not added"} />
          <InfoCard label="Rush Order" value={project.rush_order ? "Yes" : "No"} />
          <InfoCard label="Budget" value={project.budget || "Not added"} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Garment Details</Text>

        <View style={styles.detailCard}>
          <DetailRow label="Garment Type" value={project.garment_type || "Not added"} />
          <DetailRow label="Color" value={project.garment_color || "Not added"} />
          <DetailRow label="Quantity" value={project.quantity ? `${project.quantity}` : "Not added"} />
          <DetailRow label="Print Type" value={project.print_type || "Not added"} />
          <DetailRow label="Print Locations" value={project.print_locations || "Not added"} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Submission Notes</Text>

        <View style={styles.notesCard}>
          <Text style={styles.notesText}>
            {project.order_notes || "No notes added yet."}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quote Builder</Text>

        <View style={styles.quoteBuilderCard}>
          <View style={styles.quoteHeader}>
            <View>
              <Text style={styles.quoteLabelTop}>ADMIN ONLY</Text>
              <Text style={styles.quoteTitle}>Pricing Automation</Text>
              <Text style={styles.quoteSubtext}>
                Customer will never see internal costs, fees, margin, or pricing math.
              </Text>
            </View>

            <View style={styles.finalQuoteBox}>
              <Text style={styles.finalQuoteLabel}>Final Quote</Text>
              <Text style={styles.finalQuoteValue}>{money(finalQuote)}</Text>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.groupTitle}>Base Pricing</Text>

            <View style={styles.pricingGrid}>
              <MoneyInput label="Garment Cost Per Piece" value={garmentCost} onChangeText={setGarmentCost} />
              <MoneyInput label="Quantity" value={quantity} onChangeText={setQuantity} />
              <MoneyInput label="Shipping Cost" value={shippingCost} onChangeText={setShippingCost} />
              <MoneyInput label="Packaging / Handling" value={packagingFee} onChangeText={setPackagingFee} />
            </View>

            <View style={styles.quoteSummaryMini}>
              <QuoteSummaryRow label="Total Garment Cost" value={money(totalGarmentCost)} />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.groupTitle}>Screen Print Automation</Text>
            <Text style={styles.helperText}>
              Pricing is calculated per print location using the BCM quantity/color grid. You can override the total if needed.
            </Text>

            <View style={styles.locationGrid}>
              <PrintLocationCard
                title="Location 1"
                colors={location1Colors}
                setColors={setLocation1Colors}
                rate={location1Rate}
                cost={location1Cost}
              />

              <PrintLocationCard
                title="Location 2"
                colors={location2Colors}
                setColors={setLocation2Colors}
                rate={location2Rate}
                cost={location2Cost}
              />

              <PrintLocationCard
                title="Location 3"
                colors={location3Colors}
                setColors={setLocation3Colors}
                rate={location3Rate}
                cost={location3Cost}
              />
            </View>

            <View style={styles.quoteSummaryMini}>
              <QuoteSummaryRow label="Auto Screen Print Total" value={money(autoScreenPrintCost)} />
            </View>

            <MoneyInput
              label="Screen Print Override Optional"
              value={screenPrintOverride}
              onChangeText={setScreenPrintOverride}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.groupTitle}>Embroidery</Text>
            <Text style={styles.helperText}>
              Enter stitch count for reference and set a rate per piece. Use override if this project needs a custom embroidery price.
            </Text>

            <View style={styles.pricingGrid}>
              <MoneyInput label="Stitch Count" value={embroideryStitchCount} onChangeText={setEmbroideryStitchCount} />
              <MoneyInput label="Embroidery Quantity" value={embroideryQuantity} onChangeText={setEmbroideryQuantity} />
              <MoneyInput label="Rate Per Piece" value={embroideryRate} onChangeText={setEmbroideryRate} />
              <MoneyInput label="Embroidery Override Optional" value={embroideryOverride} onChangeText={setEmbroideryOverride} />
            </View>

            <View style={styles.quoteSummaryMini}>
              <QuoteSummaryRow label="Auto Embroidery Total" value={money(autoEmbroideryCost)} />
              <QuoteSummaryRow label="Active Embroidery Cost" value={money(embroideryCost)} />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.groupTitle}>Finishing + Fees</Text>

            <View style={styles.pricingGrid}>
              <MoneyInput label="Tag Removal Fee" value={tagRemovalFee} onChangeText={setTagRemovalFee} />
              <MoneyInput label="Folding Fee" value={foldingFee} onChangeText={setFoldingFee} />
              <MoneyInput label="Size Sticker Fee" value={sizeStickerFee} onChangeText={setSizeStickerFee} />
              <MoneyInput label="Hang Tag Fee" value={hangTagFee} onChangeText={setHangTagFee} />
              <MoneyInput label="Neck Label Fee" value={neckLabelFee} onChangeText={setNeckLabelFee} />
              <MoneyInput label="Design / Art Fee" value={designFee} onChangeText={setDesignFee} />
              <MoneyInput label="Screen Fees" value={screenFees} onChangeText={setScreenFees} />
              <MoneyInput label="Digitizing Fee" value={digitizingFee} onChangeText={setDigitizingFee} />
              <MoneyInput label="Additional Fees" value={additionalFees} onChangeText={setAdditionalFees} />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.groupTitle}>Margin + Processing</Text>

            <View style={styles.marginRow}>
              <PercentInput label="Margin %" value={marginPercent} onChangeText={setMarginPercent} />
              <PercentInput label="Processing %" value={processingPercent} onChangeText={setProcessingPercent} />
            </View>
          </View>

          <Text style={styles.inputLabel}>Pricing Override Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Explain any manual adjustments, exceptions, shipping decisions, or quote assumptions."
            placeholderTextColor="#9b968c"
            multiline
            textAlignVertical="top"
            value={pricingOverrideNote}
            onChangeText={setPricingOverrideNote}
          />

          <Text style={styles.inputLabel}>Quote Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add internal quote notes, vendor notes, or customer-facing quote reminders."
            placeholderTextColor="#9b968c"
            multiline
            textAlignVertical="top"
            value={quoteNotes}
            onChangeText={setQuoteNotes}
          />

          <View style={styles.quoteSummary}>
            <QuoteSummaryRow label="Garment Cost Per Piece" value={money(numberValue(garmentCost))} />
            <QuoteSummaryRow label="Screen Print Cost" value={money(screenPrintCost)} />
            <QuoteSummaryRow label="Embroidery Cost" value={money(embroideryCost)} />
            <QuoteSummaryRow label="Finishing Fees" value={money(finishingFees)} />
            <QuoteSummaryRow label="Shipping" value={money(numberValue(shippingCost))} />

            <View style={styles.quoteDivider} />

            <QuoteSummaryRow label="Internal Cost" value={money(internalCost)} />
            <QuoteSummaryRow label={`Margin (${numberValue(marginPercent)}%)`} value={money(marginAmount)} />
            <QuoteSummaryRow label="Subtotal" value={money(subtotalWithMargin)} />
            <QuoteSummaryRow label={`Processing (${numberValue(processingPercent)}%)`} value={money(processingAmount)} />

            <View style={styles.quoteDivider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Final Customer Quote</Text>
              <Text style={styles.totalValue}>{money(finalQuote)}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.saveQuoteButton} onPress={saveQuote}>
            <Text style={styles.saveQuoteText}>
              {isSaving ? "Saving Quote..." : "Save Quote"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function MoneyInput({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.priceInputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.priceInput}
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        placeholder="0"
        placeholderTextColor="#9b968c"
      />
    </View>
  );
}

function PercentInput({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.percentInputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.priceInput}
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        placeholder="0"
        placeholderTextColor="#9b968c"
      />
    </View>
  );
}

function PrintLocationCard({
  title,
  colors,
  setColors,
  rate,
  cost,
}: {
  title: string;
  colors: string;
  setColors: (value: string) => void;
  rate: number;
  cost: number;
}) {
  return (
    <View style={styles.locationCard}>
      <Text style={styles.locationTitle}>{title}</Text>

      <Text style={styles.inputLabel}>Colors</Text>
      <TextInput
        style={styles.priceInput}
        value={colors}
        onChangeText={setColors}
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor="#9b968c"
      />

      <View style={styles.locationResult}>
        <Text style={styles.locationResultLabel}>Rate</Text>
        <Text style={styles.locationResultValue}>{money(rate)}</Text>
      </View>

      <View style={styles.locationResult}>
        <Text style={styles.locationResultLabel}>Total</Text>
        <Text style={styles.locationResultValue}>{money(cost)}</Text>
      </View>
    </View>
  );
}

function QuoteSummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.quoteRow}>
      <Text style={styles.quoteRowLabel}>{label}</Text>
      <Text style={styles.quoteRowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: "#f5f3ee",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: { color: "#111111", fontSize: 18, fontWeight: "900" },
  container: { flex: 1, backgroundColor: "#f5f3ee", padding: 24 },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#111111",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 24,
  },
  backText: { color: "#ffffff", fontWeight: "900" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    gap: 18,
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
  customerName: { color: "#6f6c64", fontSize: 16, fontWeight: "700" },
  statusBadge: {
    backgroundColor: "#111111",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  statusText: { color: "#ffffff", fontWeight: "900", fontSize: 12 },
  section: { marginBottom: 28 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 18,
    letterSpacing: -0.5,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
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
    textTransform: "uppercase",
  },
  infoValue: { color: "#111111", fontSize: 15, fontWeight: "800" },
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
    gap: 18,
  },
  detailLabel: { color: "#6f6c64", fontSize: 14, fontWeight: "700" },
  detailValue: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "right",
    flex: 1,
  },
  notesCard: { backgroundColor: "#111111", borderRadius: 24, padding: 22 },
  notesText: { color: "#ffffff", fontSize: 14, lineHeight: 23 },
  quoteBuilderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#ebe7dc",
  },
  quoteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
    marginBottom: 22,
  },
  quoteLabelTop: {
    color: "#d6c7a1",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  quoteTitle: {
    color: "#111111",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  quoteSubtext: {
    color: "#6f6c64",
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 520,
  },
  finalQuoteBox: {
    backgroundColor: "#111111",
    borderRadius: 22,
    padding: 20,
    minWidth: 180,
    alignItems: "center",
  },
  finalQuoteLabel: {
    color: "#d6c7a1",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 8,
  },
  finalQuoteValue: { color: "#ffffff", fontSize: 28, fontWeight: "900" },
  fieldGroup: {
    backgroundColor: "#fbfaf7",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#eee9df",
    padding: 18,
    marginBottom: 16,
  },
  groupTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
  },
  helperText: {
    color: "#6f6c64",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  pricingGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  priceInputWrap: { flexGrow: 1, flexBasis: 190 },
  percentInputWrap: { flex: 1 },
  marginRow: { flexDirection: "row", gap: 12 },
  inputLabel: {
    color: "#504f4a",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
  },
  priceInput: {
    backgroundColor: "#f5f3ee",
    borderWidth: 1,
    borderColor: "#e4ddcf",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: "#111111",
    fontWeight: "800",
  },
  locationGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  locationCard: {
    flexGrow: 1,
    flexBasis: 190,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e4ddcf",
  },
  locationTitle: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 12,
  },
  locationResult: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  locationResultLabel: { color: "#6f6c64", fontSize: 13, fontWeight: "800" },
  locationResultValue: { color: "#111111", fontSize: 13, fontWeight: "900" },
  quoteSummaryMini: {
    backgroundColor: "#f5f3ee",
    borderRadius: 18,
    padding: 16,
    marginVertical: 14,
    borderWidth: 1,
    borderColor: "#e4ddcf",
  },
  notesInput: {
    minHeight: 100,
    backgroundColor: "#f5f3ee",
    borderWidth: 1,
    borderColor: "#e4ddcf",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111111",
    marginBottom: 18,
    lineHeight: 22,
  },
  quoteSummary: {
    backgroundColor: "#fbfaf7",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#eee9df",
    marginTop: 4,
  },
  quoteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
    gap: 16,
  },
  quoteRowLabel: { color: "#6f6c64", fontSize: 14, fontWeight: "700" },
  quoteRowValue: { color: "#111111", fontSize: 14, fontWeight: "900" },
  quoteDivider: { height: 1, backgroundColor: "#e6dfcf", marginVertical: 14 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 18, fontWeight: "900", color: "#111111" },
  totalValue: { fontSize: 28, fontWeight: "900", color: "#111111" },
  saveQuoteButton: {
    backgroundColor: "#111111",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 18,
  },
  saveQuoteText: { color: "#ffffff", fontSize: 16, fontWeight: "900" },
});