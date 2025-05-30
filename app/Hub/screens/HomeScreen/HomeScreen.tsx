import { View, Text, Pressable } from "react-native";
import Screen from "../../constants/Screen";
import styles from "./homeScreenStyles";
import { useGlobalGameProvider } from "../../context/GlobalGameProvider";
import { GameEntryMode } from "../../constants/Types";

export const HomeScreen = ({ navigation }: any) => {
  const { setGameEntryMode } = useGlobalGameProvider();

  const handlePress = (gameEntryMode: GameEntryMode, destination: Screen) => {
    setGameEntryMode(gameEntryMode);
    navigation.navigate(destination);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>name</Text>
        <Text style={styles.subHeader}>lorem ipsum dolor amet</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.topLeft }}
          onPress={() => handlePress(GameEntryMode.Creator, Screen.SelectGame)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textTopLeft }}>Lag</Text>
            <Text style={{ ...styles.textBase, ...styles.textTopLeft }}>spill</Text>
          </View>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.bottomLeft }}
          onPress={() => navigation.navigate(Screen.Hub)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textBottomLeft }}>Til</Text>
            <Text style={{ ...styles.textBase, ...styles.textBottomLeft }}>hub</Text>
          </View>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.topRight }}
          onPress={() => handlePress(GameEntryMode.Host, Screen.SelectGame)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textTopRight }}>Velg</Text>
            <Text style={{ ...styles.textBase, ...styles.textTopRight }}>spill</Text>
          </View>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.bottomRight }}
          onPress={() => handlePress(GameEntryMode.Participant, Screen.Join)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textBottomRight }}>Bli</Text>
            <Text style={{ ...styles.textBase, ...styles.textBottomRight }}>med</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
