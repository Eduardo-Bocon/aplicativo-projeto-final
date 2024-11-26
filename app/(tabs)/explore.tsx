import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import axios from "axios";
import { DataTable } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";

const BACKEND_URL = "https://768c-189-4-74-248.ngrok-free.app"; // Substitua pelo URL do backend

export default function Explore() {
  const [sensorData, setSensorData] = useState<{ timestamp: string; distance: number }[]>([]);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[]; strokeWidth: number }[];
  }>({
    labels: [],
    datasets: [{ data: [], strokeWidth: 2 }],
  });

  // Busca dados do sensor
  const fetchSensorData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/Logging`);
      setSensorData(response.data);
      formatChartData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do sensor:", error);
    }
  };

  // Formata os dados para o gráfico
  const formatChartData = (data: { timestamp: string; distance: number }[]) => {
    const timestamps = data.map((item) => item.timestamp);
    const distances = data.map((item) => item.distance);

    if (distances.some((d) => !isFinite(d))){
      console.error("Dados invalidos!", distances);
      alert("Erro ao carregar os dados do grafico");
      return;
    }

    setChartData({
      labels: timestamps.slice(-5),
      datasets: [{ data: distances, strokeWidth: 2 }],
    });
  };

  useEffect(() => {
    fetchSensorData();
  }, []);

  return ( 
    <ScrollView style={styles.container}> {/*
      <Text style={styles.subHeader}>Valores do Sensor</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Horário</DataTable.Title>
          <DataTable.Title>Distância</DataTable.Title>
        </DataTable.Header>
        {sensorData.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.timestamp}</DataTable.Cell>
            <DataTable.Cell>{item.distance} cm</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Text style={styles.subHeader}>Gráfico de Distância</Text>
      {chartData.labels && (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 20}
          height={220}
          yAxisSuffix="cm"
          chartConfig={{
            backgroundColor: "#f0f0f0",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#f7f7f7",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      )}*/}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
