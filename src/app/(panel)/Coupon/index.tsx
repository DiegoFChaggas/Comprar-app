import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function CuponsScreen() {

  // depois você troca por um estado vindo do banco
  const [isPremium, setIsPremium] = useState(false);
  const [selectedStore, setSelectedStore] = useState("mercado");

  const stores = [
    { id: "mercado", name: "Mercado" },
    { id: "farmacia", name: "Farmácia" },
    { id: "eletronicos", name: "Eletrônicos" },
  ];

  const coupons = [
    { id: "1", type: "free", store: "mercado", title: "10% OFF no Hortifruti", code: "HORT10" },
    { id: "2", type: "free", store: "mercado", title: "R$ 5 OFF no café", code: "CAFE5" },
    { id: "3", type: "premium", store: "farmacia", title: "20% OFF Proteínas", code: "PWR20" },
    { id: "4", type: "premium", store: "eletronicos", title: "40% OFF Fones Bluetooth", code: "FONE40" },
  ];

  const filtered = coupons.filter(c => c.store === selectedStore);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Cupons de Desconto</Text>
      <Text style={styles.subtitle}>Selecione a loja e aproveite!</Text>

      {/* SELECT DA LOJA */}
      <View style={styles.storeRow}>
        {stores.map(store => (
          <TouchableOpacity
            key={store.id}
            style={[
              styles.storeButton,
              selectedStore === store.id && styles.storeButtonActive,
            ]}
            onPress={() => setSelectedStore(store.id)}
          >
            <Text
              style={[
                styles.storeButtonText,
                selectedStore === store.id && styles.storeButtonTextActive,
              ]}
            >
              {store.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BOTÃO DE ASSINAR PREMIUM */}
      {!isPremium && (
        <TouchableOpacity
          style={styles.premiumCard}
          onPress={() => router.replace("./Premium/cardRegister")}
        >
          <Text style={styles.premiumTitle}>⭐ Seja Premium</Text>
          <Text style={styles.premiumText}>
            Tenha acesso aos melhores cupons da loja e descontos exclusivos.
          </Text>

          <View style={styles.premiumButton}>
            <Text style={styles.premiumButtonText}>Assinar Premium</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* LISTA DE CUPONS */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => {

          // Bloquear cupom premium caso não seja premium
          if (item.type === "premium" && !isPremium) {
            return (
              <View style={[styles.card, styles.cardPremiumBlocked]}>
                <Text style={styles.cardBlockedText}>⭐ Cupom Premium</Text>
                <Text style={styles.cardBlockedSub}>
                  Assine para desbloquear este benefício
                </Text>
              </View>
            );
          }

          return (
            <View
              style={[
                styles.card,
                item.type === "premium" && styles.cardPremium,
              ]}
            >
              {item.type === "premium" && (
                <Text style={styles.premiumStar}>⭐ Premium</Text>
              )}

              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardCode}>Código: {item.code}</Text>

              {/* BOTOES */}
              <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Ativar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secButton}>
                  <Text style={styles.secButtonText}>Copiar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secButton}>
                  <Text style={styles.secButtonText}>Regras</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secButton}>
                  <Text style={styles.secButtonText}>Loja</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "700" },
  subtitle: { opacity: 0.6, marginTop: 4 },

  // SELECT LOJA
  storeRow: { flexDirection: "row", marginTop: 20 },
  storeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    marginRight: 8,
  },
  storeButtonActive: { backgroundColor: "#4B70F5" },
  storeButtonText: { fontWeight: "600", color: "#555" },
  storeButtonTextActive: { color: "#fff" },

  // PREMIUM CARD
  premiumCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#FFF7D1",
    borderWidth: 1,
    borderColor: "#D4AF37",
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#C39B2E",
  },
  premiumText: { marginTop: 5, opacity: 0.7 },
  premiumButton: {
    marginTop: 15,
    backgroundColor: "#D4AF37",
    padding: 12,
    borderRadius: 10,
  },
  premiumButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },

  // CUPONS
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardPremium: {
    borderColor: "#D4AF37",
    borderWidth: 2,
  },
  premiumStar: {
    color: "#D4AF37",
    fontWeight: "800",
    marginBottom: 6,
  },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  cardCode: { marginTop: 5, opacity: 0.7 },

  // BLOQUEADO
  cardPremiumBlocked: {
    borderStyle: "dashed",
    borderColor: "#C39B2E",
    backgroundColor: "#FFF9E5",
  },
  cardBlockedText: {
    color: "#C39B2E",
    fontWeight: "700",
    marginBottom: 5,
  },
  cardBlockedSub: {
    opacity: 0.7,
    fontSize: 12,
  },

  // BUTTONS CUPOM
  buttonsRow: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#4B70F5",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 6,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  secButton: {
    backgroundColor: "#EAEAEA",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 6,
  },
  secButtonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#333",
  },
});
