import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";
import { DataTable } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";

const BACKEND_URL = "http://SEU_BACKEND/api"; // Substitua pelo URL do backend

export default function App() {
  const [targetDist, setTargetDist] = useState(""); // Estado para o limite
  const [sensorData, setSensorData] = useState<{ timestamp: string; distance: number }[]>([]); // Estado para dados do sensor
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[]; strokeWidth: number }[];
  }>({
    labels: [],
    datasets: [{ data: [], strokeWidth: 2 }],
  }); // Dados formatados para o gráfico

  // Função para buscar os dados do sensor do backend
  const fetchSensorData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/sensor-data`);
      setSensorData(response.data); // Assumindo que o backend retorna um array de objetos
      formatChartData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do sensor:", error);
      setSensorData([]);
    }
  };

  // Função para formatar dados do sensor para o gráfico
  const formatChartData = (data: { timestamp: string; distance: number }[]) => {
    const timestamps = data.map((item) => item.timestamp);
    const distances = data.map((item) => item.distance);

    setChartData({
      labels: timestamps.slice(-5), // Mostra os últimos 5 timestamps no eixo X
      datasets: [
        {
          data: distances,
          strokeWidth: 2, // Espessura da linha
        },
      ],
    });
  };

  // Função para atualizar o valor limite no backend
  const updateTargetDist = async () => {
    try {
      await axios.post(`${BACKEND_URL}/update-target`, {
        targetDist: Number(targetDist),
      });
      alert("Valor limite atualizado com sucesso!");
      setTargetDist("");
    } catch (error) {
      console.error("Erro ao atualizar valor limite:", error);
      alert("Erro ao atualizar valor limite.");
    }
  };

  // Busca os dados ao montar o componente
  useEffect(() => {
    //fetchSensorData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Controle de Sensor</Text>

      {/* Formulário para atualizar o valor limite */}
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

      {/* Tabela para exibir os dados antigos do sensor */}
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

      {/* Gráfico para exibir os valores ao longo do tempo */}
      <Text style={styles.subHeader}>Gráfico de Distância</Text>
      {chartData.labels && (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 20} // Largura do gráfico
          height={220}
          yAxisSuffix="cm"
          chartConfig={{
            backgroundColor: "#f0f0f0",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#f7f7f7",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
