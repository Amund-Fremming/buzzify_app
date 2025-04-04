import { Text, TouchableOpacity } from "react-native";
import { styles } from "./mediumButtonStyles";
import { Colors } from "../../assets/constants/Colors";

interface IMediumButton {
  text: string;
  color: string;
  onClick: () => void;
  inverted?: boolean;
}

export const MediumButton = ({
  text,
  color,
  onClick,
  inverted = false,
}: IMediumButton) => {
  const getButtonStyles = () => {
    if (inverted) {
      return {
        ...styles.container,
        backgroundColor: Colors.White,
        borderColor: color,
        borderWidth: 2,
      };
    } else {
      return { ...styles.container, backgroundColor: color };
    }
  };

  const getTextStyles = () => {
    if (inverted) {
      return { ...styles.text, color: color };
    } else {
      return { ...styles.text, color: Colors.White };
    }
  };

  return (
    <TouchableOpacity onPress={onClick} style={getButtonStyles()}>
      <Text style={getTextStyles()}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MediumButton;
