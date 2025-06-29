import { View, Text } from "react-native";
import styles from "./joinScreenStyles";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { useInfoModalProvider } from "../../context/InfoModalProvider";
import { addPlayerToGame } from "../../services/universalGameApi";
import { useUserProvider } from "../../context/UserProvider";
import { useGlobalGameProvider } from "../../context/GlobalGameProvider";
import MediumButton from "../../components/MediumButton/MediumButton";
import { GameEntryMode } from "../../constants/Types";

export const JoinScreen = ({ navigation }: any) => {
  const [userInput, setUserInput] = useState<string>("");

  const { userId } = useUserProvider();
  const { displayErrorModal } = useInfoModalProvider();
  const { setGameId, setUniversalGameId, setGameType, setGameEntryMode } = useGlobalGameProvider();

  const handleJoinGame = async () => {
    const universalGameId = Number.parseInt(userInput);
    if (isNaN(universalGameId)) {
      displayErrorModal("Spill id må være ett tall");
      return;
    }

    const result = await addPlayerToGame(userId, universalGameId);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    var game = result.value.gameBase;
    setUniversalGameId(game.universalId);
    setGameId(game.id);
    setGameType(result.value.gameType);
    setGameEntryMode(game.isCopy ? GameEntryMode.Member : GameEntryMode.Participant);
    navigation.navigate(result.value.gameType.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bli med</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv inn id"
        value={userInput}
        onChangeText={(input) => setUserInput(input)}
      />
      <MediumButton text="Bli med" color="black" onClick={handleJoinGame} />
      <AbsoluteHomeButton />
    </View>
  );
};

export default JoinScreen;
