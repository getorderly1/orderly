import { router } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const steps = ["Project", "Order", "Artwork", "Shipping", "Budget", "Review"];

export default function NewOrderScreen() {
  const [step, setStep] = useState(0);

  const [projectName, setProjectName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [collaborators, setCollaborators] = useState<string[]>([]);

  const [garmentType, setGarmentType] = useState("");
  const [brandPreference, setBrandPreference] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");

  const [youthXS, setYouthXS] = useState("");
  const [youthS, setYouthS] = useState("");
  const [youthM, setYouthM] = useState("");
  const [youthL, setYouthL] = useState("");
  const [youthXL, setYouthXL] = useState("");

  const [adultXS, setAdultXS] = useState("");
  const [adultS, setAdultS] = useState("");
  const [adultM, setAdultM] = useState("");
  const [adultL, setAdultL] = useState("");
  const [adultXL, setAdultXL] = useState("");
  const [adult2XL, setAdult2XL] = useState("");
  const [adult3XL, setAdult3XL] = useState("");
  const [adult4XL, setAdult4XL] = useState("");
  const [adult5XL, setAdult5XL] = useState("");
  const [sizeNotes, setSizeNotes] = useState("");

  const [printType, setPrintType] = useState("");
  const [printLocations, setPrintLocations] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [rushOrder, setRushOrder] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  const [hasArtwork, setHasArtwork] = useState(false);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);
  const [artworkNotes, setArtworkNotes] = useState("");
  const [designConcept, setDesignConcept] = useState("");
  const [preferredColors, setPreferredColors] = useState("");
  const [designText, setDesignText] = useState("");
  const [placementNotes, setPlacementNotes] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState("Shipping");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [cityStateZip, setCityStateZip] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const [budget, setBudget] = useState("");
  const [budgetNotes, setBudgetNotes] = useState("");
  const [questions, setQuestions] = useState("");

  const sizeTotal =
    numberValue(youthXS) +
    numberValue(youthS) +
    numberValue(youthM) +
    numberValue(youthL) +
    numberValue(youthXL) +
    numberValue(adultXS) +
    numberValue(adultS) +
    numberValue(adultM) +
    numberValue(adultL) +
    numberValue(adultXL) +
    numberValue(adult2XL) +
    numberValue(adult3XL) +
    numberValue(adult4XL) +
    numberValue(adult5XL);

  const enteredQuantity = numberValue(quantity);
  const sizeWarning =
    enteredQuantity > 0 && sizeTotal > 0 && enteredQuantity !== sizeTotal;

  const sizeSummary = buildSizeSummary([
    ["YXS", youthXS],
    ["YS", youthS],
    ["YM", youthM],
    ["YL", youthL],
    ["YXL", youthXL],
    ["XS", adultXS],
    ["S", adultS],
    ["M", adultM],
    ["L", adultL],
    ["XL", adultXL],
    ["2XL", adult2XL],
    ["3XL", adult3XL],
    ["4XL", adult4XL],
    ["5XL", adult5XL],
  ]);

  const addCollaborator = () => {
    const email = collaboratorEmail.trim();
    if (!email) return;

    setCollaborators([...collaborators, email]);
    setCollaboratorEmail("");
  };

  const removeCollaborator = (emailToRemove: string) => {
    setCollaborators(collaborators.filter((email) => email !== emailToRemove));
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const previousStep = () => {
    if (step === 0) {
      router.back();
      return;
    }

    setStep(step - 1);
  };

  const submitOrder = () => {
    alert(
      "Order request submitted. Katelyn will review your project details and follow up from katelyn@blackcatmerch.com."
    );
    router.back();
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <TouchableOpacity onPress={previousStep} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>START NEW ORDER</Text>
          </View>

          <Text style={styles.title}>{steps[step]}</Text>
          <Text style={styles.subtitle}>{getStepSubtitle(step)}</Text>

          <View style={styles.stepTrack}>
            {steps.map((item, index) => (
              <View key={item} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepDot,
                    index <= step && styles.stepDotActive,
                  ]}
                />
                <Text
                  style={[
                    styles.stepText,
                    index === step && styles.stepTextActive,
                  ]}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.contentWrap}>
          <View style={styles.formCard}>
            {step === 0 && (
              <>
                <SectionIntro
                  eyebrow="PROJECT SETUP"
                  title="Start with the basics."
                  text="Add the project name, main contact, and anyone who should stay connected to this order."
                />

                <View style={styles.fieldGroup}>
                  <Text style={styles.groupTitle}>Project Information</Text>

                  <Input
                    label="Project Name"
                    placeholder="Example: Spring Team Merch"
                    value={projectName}
                    onChangeText={setProjectName}
                  />

                  <Input
                    label="Company / Team Name"
                    placeholder="Example: North Atlanta FC"
                    value={companyName}
                    onChangeText={setCompanyName}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.groupTitle}>Primary Contact</Text>

                  <Input
                    label="Primary Contact Name"
                    placeholder="Full name"
                    value={contactName}
                    onChangeText={setContactName}
                  />

                  <Input
                    label="Primary Contact Email"
                    placeholder="name@email.com"
                    value={contactEmail}
                    onChangeText={setContactEmail}
                    keyboardType="email-address"
                  />

                  <Input
                    label="Phone Number"
                    placeholder="(000) 000-0000"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.groupTitle}>Team Optional</Text>
                  <Text style={styles.helperText}>
                    Add anyone who should stay connected to the project journey.
                  </Text>

                  <View style={styles.collaboratorRow}>
                    <TextInput
                      style={styles.collaboratorInput}
                      placeholder="collaborator@email.com"
                      placeholderTextColor="#9b968c"
                      value={collaboratorEmail}
                      onChangeText={setCollaboratorEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />

                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={addCollaborator}
                    >
                      <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {collaborators.length > 0 && (
                    <View style={styles.collaboratorList}>
                      {collaborators.map((email) => (
                        <View key={email} style={styles.collaboratorPill}>
                          <Text style={styles.collaboratorText}>{email}</Text>

                          <TouchableOpacity
                            onPress={() => removeCollaborator(email)}
                          >
                            <Text style={styles.removeText}>Remove</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </>
            )}

            {step === 1 && (
              <>
                <SectionIntro
                  eyebrow="ORDER DETAILS"
                  title="Tell us what you need."
                  text="Add garment details, quantities, size breakdown, print information, and deadline notes."
                />

                <View style={styles.fieldGroup}>
                  <Text style={styles.groupTitle}>Garment Details</Text>

                  <Input
                    label="Garment Type"
                    placeholder="T-shirts, hoodies, polos, jerseys, hats..."
                    value={garmentType}
                    onChangeText={setGarmentType}
                  />

                  <Input
                    label="Brand Preference"
                    placeholder="Nike, Bella Canvas, Comfort Colors, Gildan..."
                    value={brandPreference}
                    onChangeText={setBrandPreference}
                  />

                  <Input
                    label="Color"
                    placeholder="Black, white, navy, forest green..."
                    value={color}
                    onChangeText={setColor}
                  />

                  <Input
                    label="Total Quantity"
                    placeholder="Example: 60"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="number-pad"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <View style={styles.sizeHeaderRow}>
                    <View style={styles.sizeHeaderText}>
                      <Text style={styles.groupTitle}>Size Breakdown</Text>
                      <Text style={styles.helperText}>
                        Enter quantities by size. Leave sizes blank if not
                        needed.
                      </Text>
                    </View>

                    <View style={styles.sizeTotalBox}>
                      <Text style={styles.sizeTotalLabel}>Total</Text>
                      <Text style={styles.sizeTotalNumber}>{sizeTotal}</Text>
                    </View>
                  </View>

                  {sizeWarning && (
                    <View style={styles.warningBox}>
                      <Text style={styles.warningTitle}>Quantity mismatch</Text>
                      <Text style={styles.warningText}>
                        Your total quantity is {enteredQuantity}, but your size
                        breakdown adds up to {sizeTotal}.
                      </Text>
                    </View>
                  )}

                  <Text style={styles.sizeGroupTitle}>Youth Sizes</Text>
                  <View style={styles.sizeGrid}>
                    <SizeInput label="YXS" value={youthXS} onChangeText={setYouthXS} />
                    <SizeInput label="YS" value={youthS} onChangeText={setYouthS} />
                    <SizeInput label="YM" value={youthM} onChangeText={setYouthM} />
                    <SizeInput label="YL" value={youthL} onChangeText={setYouthL} />
                    <SizeInput label="YXL" value={youthXL} onChangeText={setYouthXL} />
                  </View>

                  <Text style={styles.sizeGroupTitle}>Adult Sizes</Text>
                  <View style={styles.sizeGrid}>
                    <SizeInput label="XS" value={adultXS} onChangeText={setAdultXS} />
                    <SizeInput label="S" value={adultS} onChangeText={setAdultS} />
                    <SizeInput label="M" value={adultM} onChangeText={setAdultM} />
                    <SizeInput label="L" value={adultL} onChangeText={setAdultL} />
                    <SizeInput label="XL" value={adultXL} onChangeText={setAdultXL} />
                    <SizeInput label="2XL" value={adult2XL} onChangeText={setAdult2XL} />
                    <SizeInput label="3XL" value={adult3XL} onChangeText={setAdult3XL} />
                    <SizeInput label="4XL" value={adult4XL} onChangeText={setAdult4XL} />
                    <SizeInput label="5XL" value={adult5XL} onChangeText={setAdult5XL} />
                  </View>

                  <BigInput
                    label="Size Notes Optional"
                    placeholder="Add special sizing notes, tall sizes, fit preferences, or youth/adult details."
                    value={sizeNotes}
                    onChangeText={setSizeNotes}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.groupTitle}>Print Details</Text>

                  <Input
                    label="Print Type"
                    placeholder="Screen print, embroidery, DTF, DTG..."
                    value={printType}
                    onChangeText={setPrintType}
                  />

                  <Input
                    label="Print Locations"
                    placeholder="Front chest, full back, sleeve..."
                    value={printLocations}
                    onChangeText={setPrintLocations}
                  />

                  <Input
                    label="Due Date"
                    placeholder="MM/DD/YYYY"
                    value={dueDate}
                    onChangeText={setDueDate}
                  />

                  <ToggleCard
                    title="Rush Order?"
                    text="Turn this on if this project has a tight deadline."
                    value={rushOrder}
                    onValueChange={setRushOrder}
                  />

                  <BigInput
                    label="Order Notes"
                    placeholder="Add any important details about the order."
                    value={orderNotes}
                    onChangeText={setOrderNotes}
                  />
                </View>
              </>
            )}

            {step === 2 && (
              <>
                <SectionIntro
                  eyebrow="ARTWORK / DESIGN"
                  title="Add the creative direction."
                  text="Upload existing artwork or request design support so the project has everything needed to move forward."
                />

                <ToggleCard
                  title="I already have artwork"
                  text="Uploads will connect here once file storage is added."
                  value={hasArtwork}
                  onValueChange={setHasArtwork}
                />

                {hasArtwork && (
                  <View style={styles.uploadBox}>
                    <Text style={styles.uploadTitle}>Artwork Upload</Text>
                    <Text style={styles.uploadText}>
                      File upload will be connected to Supabase Storage next.
                    </Text>
                    <Text style={styles.uploadHint}>PNG • PDF • AI • EPS • JPG</Text>
                  </View>
                )}

                <ToggleCard
                  title="Need design help?"
                  text="Turn this on if this project needs creative support."
                  value={needsDesignHelp}
                  onValueChange={setNeedsDesignHelp}
                />

                {needsDesignHelp && (
                  <View style={styles.fieldGroup}>
                    <Text style={styles.groupTitle}>Design Request</Text>

                    <Input
                      label="Design Concept"
                      placeholder="Describe the idea or direction."
                      value={designConcept}
                      onChangeText={setDesignConcept}
                    />

                    <Input
                      label="Preferred Colors"
                      placeholder="Black, gold, cream, team colors..."
                      value={preferredColors}
                      onChangeText={setPreferredColors}
                    />

                    <Input
                      label="Text Needed"
                      placeholder="Words, names, slogans, or numbers."
                      value={designText}
                      onChangeText={setDesignText}
                    />

                    <BigInput
                      label="Placement Requests"
                      placeholder="Where should the design go?"
                      value={placementNotes}
                      onChangeText={setPlacementNotes}
                    />
                  </View>
                )}

                <BigInput
                  label="Artwork Notes"
                  placeholder="Add artwork notes, file instructions, or reference details."
                  value={artworkNotes}
                  onChangeText={setArtworkNotes}
                />
              </>
            )}

            {step === 3 && (
              <>
                <SectionIntro
                  eyebrow="SHIPPING / PICKUP"
                  title="Where should it go?"
                  text="Choose shipping or pickup and add any delivery details needed for the order."
                />

                <View style={styles.choiceRow}>
                  <TouchableOpacity
                    style={[
                      styles.choiceButton,
                      deliveryMethod === "Shipping" && styles.choiceButtonActive,
                    ]}
                    onPress={() => setDeliveryMethod("Shipping")}
                  >
                    <Text
                      style={[
                        styles.choiceText,
                        deliveryMethod === "Shipping" && styles.choiceTextActive,
                      ]}
                    >
                      Shipping
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.choiceButton,
                      deliveryMethod === "Pickup" && styles.choiceButtonActive,
                    ]}
                    onPress={() => setDeliveryMethod("Pickup")}
                  >
                    <Text
                      style={[
                        styles.choiceText,
                        deliveryMethod === "Pickup" && styles.choiceTextActive,
                      ]}
                    >
                      Pickup
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.groupTitle}>Delivery Contact</Text>

                  <Input
                    label="Recipient Name"
                    placeholder="Who should receive the order?"
                    value={recipientName}
                    onChangeText={setRecipientName}
                  />

                  <Input
                    label="Recipient Phone"
                    placeholder="(000) 000-0000"
                    value={recipientPhone}
                    onChangeText={setRecipientPhone}
                    keyboardType="phone-pad"
                  />
                </View>

                {deliveryMethod === "Shipping" && (
                  <View style={styles.fieldGroup}>
                    <Text style={styles.groupTitle}>Shipping Address</Text>

                    <Input
                      label="Street Address"
                      placeholder="Street address"
                      value={shippingAddress}
                      onChangeText={setShippingAddress}
                    />

                    <Input
                      label="City / State / ZIP"
                      placeholder="Atlanta, GA 30301"
                      value={cityStateZip}
                      onChangeText={setCityStateZip}
                    />
                  </View>
                )}

                <BigInput
                  label="Delivery Notes"
                  placeholder="Gate code, pickup preference, delivery instructions..."
                  value={deliveryNotes}
                  onChangeText={setDeliveryNotes}
                />
              </>
            )}

            {step === 4 && (
              <>
                <SectionIntro
                  eyebrow="BUDGET + QUESTIONS"
                  title="Share goals and questions."
                  text="Add a project budget if you have one, plus any questions about garments, sizing, design, or print direction."
                />

                <Input
                  label="Project Budget Optional"
                  placeholder="$"
                  value={budget}
                  onChangeText={setBudget}
                  keyboardType="decimal-pad"
                />

                <BigInput
                  label="Budget Notes Optional"
                  placeholder="Example: We are flexible depending on garment quality."
                  value={budgetNotes}
                  onChangeText={setBudgetNotes}
                />

                <BigInput
                  label="Questions / Recommendations"
                  placeholder="Need garment ideas, sizing help, design support, or print guidance?"
                  value={questions}
                  onChangeText={setQuestions}
                />
              </>
            )}

            {step === 5 && (
              <>
                <SectionIntro
                  eyebrow="REVIEW + SUBMIT"
                  title="Check everything before sending."
                  text="Review the project details below. You can go back and adjust anything before submitting."
                />

                <View style={styles.reviewGrid}>
                  <ReviewItem label="Project" value={projectName || "Not added"} />
                  <ReviewItem label="Company / Team" value={companyName || "Not added"} />
                  <ReviewItem label="Primary Contact" value={contactName || "Not added"} />
                  <ReviewItem label="Email" value={contactEmail || "Not added"} />
                  <ReviewItem label="Phone" value={phoneNumber || "Not added"} />
                  <ReviewItem
                    label="Team"
                    value={collaborators.length ? collaborators.join(", ") : "None added"}
                  />
                  <ReviewItem label="Garment Type" value={garmentType || "Not added"} />
                  <ReviewItem label="Total Quantity" value={quantity || "Not added"} />
                  <ReviewItem label="Size Breakdown" value={sizeSummary || "No sizes added"} />
                  <ReviewItem label="Size Total" value={`${sizeTotal}`} />
                  <ReviewItem label="Print Type" value={printType || "Not added"} />
                  <ReviewItem label="Due Date" value={dueDate || "Not added"} />
                  <ReviewItem label="Delivery Method" value={deliveryMethod} />
                  <ReviewItem label="Budget" value={budget ? `$${budget}` : "Not added"} />
                </View>

                {sizeWarning && (
                  <View style={styles.warningBox}>
                    <Text style={styles.warningTitle}>Check size totals</Text>
                    <Text style={styles.warningText}>
                      Total quantity is {enteredQuantity}, but your size breakdown
                      adds up to {sizeTotal}.
                    </Text>
                  </View>
                )}

                <View style={styles.confirmBox}>
                  <Text style={styles.confirmTitle}>After you submit</Text>
                  <Text style={styles.confirmText}>
                    Katelyn and the team will review your project details and
                    follow up with next steps from katelyn@blackcatmerch.com.
                  </Text>
                </View>
              </>
            )}
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={step === steps.length - 1 ? submitOrder : nextStep}
          >
            <Text style={styles.continueText}>
              {step === steps.length - 1 ? "Submit Order Request" : "Continue"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            {step < steps.length - 1
              ? `Next: ${steps[step + 1]}`
              : "Ready to submit"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.sectionIntro}>
      <Text style={styles.sectionEyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionText}>{text}</Text>
    </View>
  );
}

function ToggleCard({
  title,
  text,
  value,
  onValueChange,
}: {
  title: string;
  text: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.toggleCard}>
      <View style={styles.toggleTextWrap}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleSubtext}>{text}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#ddd6c7", true: "#d6c7a1" }}
        thumbColor={value ? "#111111" : "#ffffff"}
      />
    </View>
  );
}

function numberValue(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildSizeSummary(items: string[][]) {
  return items
    .filter(([, value]) => numberValue(value) > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join(" • ");
}

function getStepSubtitle(step: number) {
  if (step === 0) return "Let’s start with the basics of your project.";
  if (step === 1) return "Tell us what you are looking to order.";
  if (step === 2) return "Add artwork details or request design support.";
  if (step === 3) return "Tell us how this order should be delivered.";
  if (step === 4) return "Share your budget, questions, and project goals.";
  return "Review everything before submitting your request.";
}

function Input(props: any) {
  return (
    <>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor="#9b968c"
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        autoCapitalize={
          props.keyboardType === "email-address" ? "none" : "sentences"
        }
      />
    </>
  );
}

function BigInput(props: any) {
  return (
    <>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <TextInput
        style={styles.bigInput}
        placeholder={props.placeholder}
        placeholderTextColor="#9b968c"
        value={props.value}
        onChangeText={props.onChangeText}
        multiline
        textAlignVertical="top"
      />
    </>
  );
}

function SizeInput({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.sizeInputBox}>
      <Text style={styles.sizeInputLabel}>{label}</Text>
      <TextInput
        style={styles.sizeInput}
        placeholder="0"
        placeholderTextColor="#9b968c"
        value={value}
        onChangeText={onChangeText}
        keyboardType="number-pad"
      />
    </View>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f3ee",
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f3ee",
  },

  hero: {
    backgroundColor: "#0f0f0d",
    paddingTop: 58,
    paddingHorizontal: 22,
    paddingBottom: 38,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1f1f1b",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  backText: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "900",
    marginTop: -2,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#24231f",
    borderColor: "#d6c7a1",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 18,
  },

  badgeText: {
    color: "#d6c7a1",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  title: {
    color: "#ffffff",
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: -1.4,
    marginBottom: 10,
  },

  subtitle: {
    color: "#d9d9d4",
    fontSize: 16,
    lineHeight: 25,
    maxWidth: 420,
  },

  stepTrack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 26,
  },

  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b1b18",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 11,
  },

  stepDot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: "#4a4944",
    marginRight: 7,
  },

  stepDotActive: {
    backgroundColor: "#d6c7a1",
  },

  stepText: {
    color: "#8d8b84",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  stepTextActive: {
    color: "#ffffff",
  },

  contentWrap: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    paddingHorizontal: 16,
    marginTop: -22,
  },

  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 32,
    padding: 22,
    borderWidth: 1,
    borderColor: "#ebe7dc",
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },

  sectionIntro: {
    backgroundColor: "#111111",
    borderRadius: 26,
    padding: 22,
    marginBottom: 18,
  },

  sectionEyebrow: {
    color: "#d6c7a1",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  sectionTitle: {
    color: "#ffffff",
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: -0.7,
    marginBottom: 10,
  },

  sectionText: {
    color: "#dadad4",
    fontSize: 15,
    lineHeight: 23,
  },

  fieldGroup: {
    backgroundColor: "#fbfaf7",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#eee9df",
    padding: 18,
    marginBottom: 16,
  },

  groupTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 14,
    letterSpacing: -0.3,
  },

  helperText: {
    color: "#68655d",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },

  inputLabel: {
    color: "#504f4a",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
    marginTop: 4,
  },

  input: {
    backgroundColor: "#f5f3ee",
    borderWidth: 1,
    borderColor: "#e4ddcf",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: "#111111",
    marginBottom: 12,
  },

  bigInput: {
    minHeight: 112,
    backgroundColor: "#f5f3ee",
    borderWidth: 1,
    borderColor: "#e4ddcf",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: "#111111",
    marginBottom: 12,
    lineHeight: 22,
  },

  collaboratorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  collaboratorInput: {
    flex: 1,
    backgroundColor: "#f5f3ee",
    borderWidth: 1,
    borderColor: "#e4ddcf",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: "#111111",
  },

  addButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonText: {
    color: "#d6c7a1",
    fontSize: 28,
    fontWeight: "900",
    marginTop: -2,
  },

  collaboratorList: {
    marginTop: 14,
    gap: 10,
  },

  collaboratorPill: {
    backgroundColor: "#f5f3ee",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#e4ddcf",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  collaboratorText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    paddingRight: 10,
  },

  removeText: {
    color: "#8a6f2a",
    fontSize: 12,
    fontWeight: "900",
  },

  sizeHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    marginBottom: 12,
  },

  sizeHeaderText: {
    flex: 1,
  },

  sizeTotalBox: {
    minWidth: 82,
    backgroundColor: "#111111",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
  },

  sizeTotalLabel: {
    color: "#d6c7a1",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  sizeTotalNumber: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
  },

  warningBox: {
    backgroundColor: "#fff7df",
    borderWidth: 1,
    borderColor: "#e8c768",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },

  warningTitle: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 6,
  },

  warningText: {
    color: "#665522",
    fontSize: 13.5,
    lineHeight: 20,
  },

  sizeGroupTitle: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 14,
    marginBottom: 10,
  },

  sizeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },

  sizeInputBox: {
    width: 82,
    backgroundColor: "#f5f3ee",
    borderWidth: 1,
    borderColor: "#e4ddcf",
    borderRadius: 18,
    padding: 10,
  },

  sizeInputLabel: {
    color: "#504f4a",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 6,
    textAlign: "center",
  },

  sizeInput: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 15,
    color: "#111111",
    textAlign: "center",
    fontWeight: "800",
  },

  toggleCard: {
    backgroundColor: "#fbfaf7",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#e4ddcf",
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
  },

  toggleTextWrap: {
    flex: 1,
  },

  toggleTitle: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 5,
  },

  toggleSubtext: {
    color: "#68655d",
    fontSize: 13.5,
    lineHeight: 20,
  },

  uploadBox: {
    backgroundColor: "#111111",
    borderRadius: 24,
    padding: 22,
    marginBottom: 14,
  },

  uploadTitle: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 8,
  },

  uploadText: {
    color: "#dadad4",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 10,
  },

  uploadHint: {
    color: "#d6c7a1",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.1,
  },

  choiceRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  choiceButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e4ddcf",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
  },

  choiceButtonActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },

  choiceText: {
    color: "#68655d",
    fontSize: 15,
    fontWeight: "900",
  },

  choiceTextActive: {
    color: "#ffffff",
  },

  reviewGrid: {
    gap: 10,
  },

  reviewItem: {
    backgroundColor: "#fbfaf7",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e4ddcf",
    padding: 16,
  },

  reviewLabel: {
    color: "#8a867c",
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 7,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  reviewValue: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
  },

  confirmBox: {
    backgroundColor: "#111111",
    borderRadius: 24,
    padding: 22,
    marginTop: 16,
  },

  confirmTitle: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 8,
  },

  confirmText: {
    color: "#dadad4",
    fontSize: 14,
    lineHeight: 22,
  },

  continueButton: {
    marginTop: 20,
    backgroundColor: "#111111",
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  continueText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },

  footerText: {
    textAlign: "center",
    color: "#8a867c",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 38,
  },
});