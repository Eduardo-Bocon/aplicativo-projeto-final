import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import axios from "axios";
import { DataTable } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";

const BACKEND_URL = "https://d6cf-189-4-74-248.ngrok-free.app";

export default function MonitorScreen() {

  const [sensorData, setSensorData] = useState<{ horario: string; valor: number }[] | null>(null);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[]; strokeWidth: number }[];
  }>({
    labels: [],
    datasets: [{ data: [], strokeWidth: 2 }],
  });

  const fetchSensorData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/Logging`);
      setSensorData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do sensor:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Monitoramento</Text>

      <Text style={styles.subHeader}>Valores do Sensor</Text>
      {sensorData == null ? (
        <Text>Carregando dados...</Text>
      ) : (
        <View style={{ height: 400}}>
          <ScrollView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Horário</DataTable.Title>
                <DataTable.Title>Distância</DataTable.Title>
              </DataTable.Header>
              {sensorData.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.horario}</DataTable.Cell>
                  <DataTable.Cell>{item.valor} cm</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        </View>
      )}
      

    </ScrollView>
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
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
  },
});
