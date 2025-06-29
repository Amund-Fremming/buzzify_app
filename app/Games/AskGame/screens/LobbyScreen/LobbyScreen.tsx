import Color from "@/app/Hub/constants/Color";
import MediumButton from "@/app/Hub/components/MediumButton/MediumButton";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./lobbyScreenStyles";
import { useHubConnectionProvider } from "@/app/Hub/context/HubConnectionProvider";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import AbsoluteHomeButton from "@/app/Hub/components/AbsoluteHomeButton/AbsoluteHomeButton";
import Screen from "@/app/Hub/constants/Screen";
import { useAskGameProvider } from "../../context/AskGameProvider";
import { HubChannel } from "@/app/Hub/constants/HubChannel";
import AskScreen from "../../constants/AskScreen";
import AskGame, { AskGameState } from "../../constants/AskTypes";
import { GameEntryMode } from "@/app/Hub/constants/Types";

export const LobbyScreen = ({ navigation }: any) => {
  const [question, setQuestion] = useState<string>("");

  const { gameEntryMode, gameType, gameId, universalGameId } = useGlobalGameProvider();
  const { iterations, setIterations, setAskGame } = useAskGameProvider();
  const { connect, disconnect, setListener, invokeFunction } = useHubConnectionProvider();
  const { displayErrorModal } = useInfoModalProvider();

  useEffect(() => {
    createHubConnection();
    return () => {
      disconnect();
    };
  }, [gameId]);

  const createHubConnection = async () => {
    if (!gameId) return;

    const result = await connect(gameType, gameId);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    setListener(HubChannel.Iterations, (iterations: number) => {
      console.log(`Received: ${iterations}`); // TODO - remove log
      setIterations(iterations);
    });

    setListener(HubChannel.State, (state: AskGameState) => {
      console.log(`Received: ${state}`); // TODO - remove log
      if (state === AskGameState.Closed && gameEntryMode !== GameEntryMode.Creator) {
        navigation.navigate(AskScreen.Started);
      }
    });

    setListener(HubChannel.Error, (message: string) => {
      console.log(`Received: ${message}`); // TODO - remove log
      disconnect();
      displayErrorModal(message, () => navigation.navigate(Screen.Home));
    });

    setListener(HubChannel.Game, async (game: AskGame) => {
      setAskGame(game);
      await disconnect();
      await navigation.navigate(AskScreen.Game);
    });
  };

  const handleAddQuestion = async () => {
    setQuestion("");
    const result = await invokeFunction("AddQuestion", gameId, question);
    if (result.isError()) {
      displayErrorModal(result.error);
    }
  };

  const handleStartGame = async () => {
    try {
      if (!gameId) return;
      invokeFunction("StartGame", gameId);
    } catch (error) {
      displayErrorModal("En feil skjedde når spillet skulle starte.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Universal game id: {universalGameId}</Text>
      <Text style={styles.header}>Legg til spørsmål</Text>
      <Text style={styles.paragraph}>Antall spørsmål: {iterations}</Text>
      <TextInput style={styles.input} value={question} onChangeText={(input) => setQuestion(input)} />
      <MediumButton text="Legg til" color={Color.Beige} onClick={handleAddQuestion} />
      {gameEntryMode === GameEntryMode.Creator && (
        <MediumButton text="Start" color={Color.Beige} onClick={handleStartGame} inverted />
      )}
      <AbsoluteHomeButton />
    </View>
  );
};

export default LobbyScreen;
