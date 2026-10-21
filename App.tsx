import React, { useState } from "react";
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const contacts = [
  { name: "Carabineros", number: "133", detail: "Emergencias policiales" },
  { name: "SAMU", number: "131", detail: "Ambulancia y emergencias médicas" },
  { name: "PDI", number: "134", detail: "Policía de Investigaciones" },
  { name: "Orientación", number: "1455", detail: "Orientación por violencia contra las mujeres" },
];

export default function App() {
  const [demoShown, setDemoShown] = useState(false);

  const callNumber = (number: string, name: string) => {
    Alert.alert(
      `Llamar a ${name}`,
      `Se abrirá la aplicación de teléfono para llamar al ${number}. Continúa solo si es seguro hacerlo.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Continuar",
          onPress: () => {
            Linking.openURL(`tel:${number}`).catch(() =>
              Alert.alert("No se pudo abrir el teléfono", "Marca el número desde la aplicación de teléfono si es seguro.")
            );
          },
        },
      ]
    );
  };

  const showDemo = () => {
    setDemoShown(true);
    Alert.alert(
      "Prototipo de demostración",
      "Este botón todavía no envía alertas ni comparte tu ubicación. No reemplaza los servicios oficiales de emergencia. Si estás en peligro inmediato, contacta a los servicios de emergencia cuando sea seguro.",
      [{ text: "Entendido" }]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>APOYO Y ORIENTACIÓN</Text>
          <Text style={styles.title}>Red de Apoyo</Text>
          <Text style={styles.subtitle}>
            Un espacio para encontrar opciones de ayuda y tener a mano contactos importantes.
          </Text>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Tu seguridad es lo primero</Text>
          <Text style={styles.noticeText}>
            Si alguien revisa tu teléfono, el uso de esta app podría ser visible. Piensa si es seguro abrirla.
            No podemos garantizar que el dispositivo o su historial sean privados.
          </Text>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Pedir ayuda, demostración"
          style={styles.helpButton}
          onPress={showDemo}
          activeOpacity={0.85}
        >
          <Text style={styles.helpButtonTitle}>PEDIR AYUDA</Text>
          <Text style={styles.helpButtonText}>Botón de demostración</Text>
        </TouchableOpacity>

        {demoShown ? (
          <Text style={styles.demoNote}>
            Recuerda: esta versión no envía avisos, no comparte ubicación ni contacta automáticamente a nadie.
          </Text>
        ) : null}

        <Text style={styles.sectionTitle}>Contactos útiles en Chile</Text>
        <Text style={styles.sectionIntro}>
          Al tocar un contacto, podrás confirmar antes de abrir la llamada. Verifica los canales oficiales antes de usar o publicar esta app.
        </Text>

        {contacts.map((contact) => (
          <TouchableOpacity
            key={contact.number}
            style={styles.contactCard}
            onPress={() => callNumber(contact.number, contact.name)}
            accessibilityRole="button"
            accessibilityLabel={`${contact.name}, ${contact.number}. ${contact.detail}`}
          >
            <View style={styles.contactCopy}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactDetail}>{contact.detail}</Text>
            </View>
            <Text style={styles.contactNumber}>{contact.number}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Importante</Text>
          <Text style={styles.footerText}>
            Prototipo inicial. No cuenta con integración con autoridades ni con un servicio de monitoreo.
            No ingreses datos personales sensibles en esta versión.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8F5F2" },
  container: { padding: 22, paddingBottom: 36 },
  header: { marginTop: 18, marginBottom: 22 },
  eyebrow: { color: "#8B4D55", fontSize: 12, fontWeight: "800", letterSpacing: 1.8, marginBottom: 10 },
  title: { color: "#25252B", fontSize: 34, fontWeight: "800", letterSpacing: -0.8 },
  subtitle: { color: "#5D5B62", fontSize: 16, lineHeight: 23, marginTop: 10 },
  notice: { backgroundColor: "#FFF0D8", borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: "#EBD4AF" },
  noticeTitle: { color: "#67451B", fontSize: 15, fontWeight: "800", marginBottom: 6 },
  noticeText: { color: "#674F31", fontSize: 14, lineHeight: 20 },
  helpButton: { backgroundColor: "#9E3549", borderRadius: 18, paddingVertical: 22, alignItems: "center", justifyContent: "center", marginBottom: 10, shadowColor: "#652332", shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  helpButtonTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", letterSpacing: 1 },
  helpButtonText: { color: "#FCE9ED", fontSize: 13, marginTop: 5 },
  demoNote: { color: "#7C2638", fontSize: 13, lineHeight: 19, marginBottom: 16, marginTop: 2 },
  sectionTitle: { color: "#25252B", fontSize: 21, fontWeight: "800", marginTop: 22, marginBottom: 6 },
  sectionIntro: { color: "#66636A", fontSize: 14, lineHeight: 20, marginBottom: 12 },
  contactCard: { backgroundColor: "#FFFFFF", borderRadius: 14, padding: 16, marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#E9E3DF" },
  contactCopy: { flex: 1, paddingRight: 12 },
  contactName: { color: "#28262C", fontSize: 16, fontWeight: "800" },
  contactDetail: { color: "#77717A", fontSize: 13, marginTop: 4 },
  contactNumber: { color: "#9E3549", fontSize: 21, fontWeight: "900" },
  footer: { backgroundColor: "#EFEBE7", borderRadius: 14, padding: 16, marginTop: 14 },
  footerTitle: { color: "#373239", fontWeight: "800", fontSize: 14, marginBottom: 5 },
  footerText: { color: "#615B62", fontSize: 13, lineHeight: 19 },
});
