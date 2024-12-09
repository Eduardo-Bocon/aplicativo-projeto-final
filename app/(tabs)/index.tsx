import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";

const BACKEND_URL = "https://d6cf-189-4-74-248.ngrok-free.app";

export default function Index() {
  const [targetDist, setTargetDist] = useState("");

  const updateTargetDist = async () => {
    try {
      await axios.patch(`${BACKEND_URL}/Controle`, {
        distancia: Number(targetDist),
      });
      alert("Valor limite atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar valor limite:", error);
      alert("Erro ao atualizar valor limite.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuração de Limite</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Alterar valor limite:</Text>
        <TextInput
          style={styles.input}
          placeholder="Novo limite"
          keyboardType="numeric"
          value={targetDist}
          onChangeText={setTargetDist}
        />
        <Button title="Atualizar" onPress={updateTargetDist} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
