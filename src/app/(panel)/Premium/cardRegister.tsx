import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { router } from "expo-router";

export default function PagamentoScreen() {
  const [paymentMethod, setPaymentMethod] = useState<string>("creditCard");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Métodos de pagamento disponíveis
  const paymentMethods = [
    { id: "creditCard", name: "Cartão de Crédito" },
    { id: "paypal", name: "PayPal" },
    { id: "pix", name: "PIX" },
  ];

  // Função para processar o pagamento (simulação)
  const handlePayment = () => {
    setIsProcessing(true);

    // Simulação de processamento de pagamento (aqui você integraria com a API de pagamento)
    setTimeout(() => {
      setIsProcessing(false);
      router.push(""); // Redireciona para a tela de sucesso após o pagamento
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o Método de Pagamento</Text>

      {/* SELECT PARA MÉTODO DE PAGAMENTO */}
      <View style={styles.paymentRow}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentButton,
              paymentMethod === method.id && styles.paymentButtonActive,
            ]}
            onPress={() => setPaymentMethod(method.id)}
          >
            <Text
              style={[
                styles.paymentButtonText,
                paymentMethod === method.id && styles.paymentButtonTextActive,
              ]}
            >
              {method.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FORMULÁRIO PARA CARTÃO DE CRÉDITO (apenas visível se o método for cartão de crédito) */}
      {paymentMethod === "creditCard" && (
        <View style={styles.cardForm}>
          <TextInput
            style={styles.input}
            placeholder="Número do Cartão"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Validade (MM/AA)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            keyboardType="numeric"
          />
        </View>
      )}

      {/* BOTÃO DE PAGAMENTO */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePayment}
        disabled={isProcessing}
      >
        <Text style={styles.payButtonText}>
          {isProcessing ? "Processando..." : "Pagar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  paymentRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
  },
  paymentButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    marginRight: 8,
  },
  paymentButtonActive: {
    backgroundColor: "#4B70F5",
  },
  paymentButtonText: {
    fontWeight: "600",
    color: "#555",
  },
  paymentButtonTextActive: {
    color: "#fff",
  },
  cardForm: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  payButton: {
    marginTop: 20,
    backgroundColor: "#4B70F5",
    padding: 15,
    borderRadius: 10,
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
});
