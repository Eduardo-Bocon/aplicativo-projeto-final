import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";

const BACKEND_URL = "https://768c-189-4-74-248.ngrok-free.app"; // Substitua pelo URL do backend

export default function Index() {
  const [targetDist, setTargetDist] = useState(""); // Estado para o limite

  const updateTargetDist = async () => {
    try {
      await axios.patch(`${BACKEND_URL}/Controle`, {
        targetDist: Number(targetDist),
      });
      alert("Valor limite atualizado com sucesso!");
      setTargetDist("");
    } catch (error) {
      console.error("Erro ao atualizar valor limite:", error);
      alert("Erro ao atualizar valor limite.");
    }
  };

  return (
    <View style={styles.container}>{/*
      <Text style={styles.header}>Controle de Sensor</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Alterar valor limite:</Text>
        <TextInput style={styles.input} placeholder="Novo limite" />
                  <Button title="Atualizar" onPress={updateTargetDist} />
                </View>*/}
              </View>
            );
          }
          
          const styles = StyleSheet.create({
            container: {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            },
            header: {
              fontSize: 24,
              marginBottom: 16,
            },
            card: {
              width: "100%",
              padding: 16,
              borderRadius: 8,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 5,
            },
            label: {
              fontSize: 18,
              marginBottom: 8,
            },
            input: {
              height: 40,
              borderColor: "#ccc",
              borderWidth: 1,
              marginBottom: 16,
              paddingHorizontal: 8,
            },
          });
