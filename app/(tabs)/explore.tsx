import { StyleSheet, Image, Platform, View, Text } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.stepContainer}>
      <Text>Step 3: Get a fresh start</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
