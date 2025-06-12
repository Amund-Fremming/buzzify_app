import { Pressable, Text, View } from "react-native";
import { styles } from "./actionModalStyles";

interface IActionModal {
  message: string;
  onLeftClick: () => void;
  onRightClick: () => void;
}

export const ActionModal = ({ message, onLeftClick, onRightClick }: IActionModal) => {
  const handleLeftPressed = () => {
    onLeftClick();
  };

  const handleRightPressed = () => {
    onRightClick();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.header}>Hey</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonsWrapper}>
          <Pressable onPress={handleLeftPressed} style={styles.button}>
            <Text style={styles.buttonText}>Nei</Text>
          </Pressable>
          <Pressable onPress={handleRightPressed} style={styles.button}>
            <Text style={styles.buttonText}>Ja</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ActionModal;
