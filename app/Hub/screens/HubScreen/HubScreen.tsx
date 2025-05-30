import { View, Text, Button } from "react-native";
import styles from "./hubScreenStyles";
import { AbsoluteHomeButton } from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import Screen from "../../constants/Screen";

export const HubScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hub</Text>

      <Button title="Admin dashboard" onPress={() => navigation.navigate(Screen.Admin)} />

      <AbsoluteHomeButton />
    </View>
  );
};

export default HubScreen;
