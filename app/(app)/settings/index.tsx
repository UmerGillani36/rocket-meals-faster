import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";

const Settings = () => {
  const { theme, setThemeMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>Select Theme:</Text>
      <Button title="Light" onPress={() => setThemeMode("light")} />
      <Button title="Dark" onPress={() => setThemeMode("dark")} />
      <Button title="Systematic" onPress={() => setThemeMode("systematic")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Settings;
