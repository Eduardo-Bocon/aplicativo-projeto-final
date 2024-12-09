import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import Chart from "../../components/chart";

const BACKEND_URL = "https://d6cf-189-4-74-248.ngrok-free.app";

export default function ChartScreen() {
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
      formatChartData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do sensor:", error);
    }
  };

  const formatChartData = (data: { horario: string; valor: number }[]) => {
    const horarios = data.map((item) => item.horario);
    const valores = data.map((item) => item.valor);

    setChartData({
      labels: horarios.slice(-5), 
      datasets: [{ data: valores, strokeWidth: 2 }],
    });
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Gráfico de Distância</Text>
      <View style={styles.chartContainer}>{/**/}
        <Chart data={chartData} />
      </View>
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
  chartContainer: {
    marginTop: 20,
  },
});
