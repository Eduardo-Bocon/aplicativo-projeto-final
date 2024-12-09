import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface ChartProps {
  data: {
    labels: string[];
    datasets: { data: number[]; strokeWidth: number }[];
  };
}

export default function Chart({ data }: ChartProps) {
  return (
    <LineChart
    
      data={data}
      fromZero={true}
      width={Dimensions.get("window").width - 20}
      height={500}
      xLabelsOffset={10}
      yLabelsOffset={5}
      verticalLabelRotation={20}
      yAxisSuffix="cm"
      chartConfig={{
        backgroundColor: "#f0f0f0",
        backgroundGradientFrom: "#f7f7f7",
        backgroundGradientTo: "#f7f7f7",
        decimalPlaces: 2,
        propsForBackgroundLines: { strokeDasharray: "4" },
        color: (opacity = 1) => `rgba(34, 128, 230, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      bezier
      style={styles.chart}
    />
  );
}

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
