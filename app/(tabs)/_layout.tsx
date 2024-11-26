import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Controle de Sensor" }} />
      <Tabs.Screen name="explore" options={{ title: "Dados do Sensor" }} />
    </Tabs>
  );
}
