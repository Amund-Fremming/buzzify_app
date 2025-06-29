import { Pressable, Text, View } from "react-native";
import styles from "./chooseScreenStyles";
import VerticalScroll from "@/app/Hub/wrappers/VerticalScroll";
import AbsoluteHomeButton from "@/app/Hub/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { GameEntryMode, PagedRequest, PagedResponse } from "@/app/Hub/constants/Types";
import { SpinGameCard } from "../../components/SpinGameCard/SpinGameCard";
import { useEffect, useState } from "react";
import { getGame, getGamesPage } from "../../services/spinGameApi";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import SpinGame from "../../constants/SpinTypes";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import { useUserProvider } from "@/app/Hub/context/UserProvider";
import { useSpinGameProvider } from "../../context/SpinGameProvider";
import SpinScreen from "../../constants/SpinScreen";

const pageSize = 20;

export const ChooseScreen = ({ navigation }: any) => {
  const { userId } = useUserProvider();
  const { setSpinGame } = useSpinGameProvider();
  const { setGameId, setUniversalGameId, setGameEntryMode } = useGlobalGameProvider();

  const [pagedResponse, setPagedResponse] = useState<PagedResponse<SpinGame> | undefined>(undefined);
  const [pagedRequest, setPagedRequest] = useState<PagedRequest>({
    pageNumber: 1,
    pageSize,
  });

  const { displayErrorModal } = useInfoModalProvider();

  const handlePress = async (gameId: number) => {
    if (!gameId) {
      displayErrorModal("Missing game id");
      return;
    }

    var result = await getGame(userId, gameId);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    console.log(result.value);
    setUniversalGameId(result.value.universalId);
    setGameId(result.value.id);
    setSpinGame(result.value);
    setGameEntryMode(GameEntryMode.Host);
    navigation.navigate(SpinScreen.Lobby);
  };

  const handlePaginate = (paginate: -1 | 1) => {
    const request = {
      pageNumber: !pagedResponse ? 1 : pagedResponse?.currentPage + paginate,
      pageSize,
    };
    getGames(request);
    setPagedRequest(request);
  };

  useEffect(() => {
    getGames(pagedRequest);
  }, []);

  const getGames = async (pagedRequest: PagedRequest) => {
    const result = await getGamesPage(pagedRequest);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    setPagedResponse(result.value);
  };

  return (
    <View style={styles.container}>
      <VerticalScroll key={pagedResponse?.data.length}>
        <Text style={styles.header}>Velg ett spill</Text>
        {pagedResponse?.data.map((item, index) => (
          <SpinGameCard
            name={item.name}
            iterations={item.iterations}
            handlePress={() => handlePress(item.id)}
            key={index}
          />
        ))}
        <View style={styles.navButtons}>
          {pagedResponse?.hasPrevPage && (
            <Pressable style={styles.button} onPress={() => handlePaginate(-1)}>
              <Text style={styles.buttonLabel}>Forrige</Text>
            </Pressable>
          )}
          {!pagedResponse ||
            (pagedResponse.hasNextPage && (
              <Pressable style={styles.button} onPress={() => handlePaginate(+1)}>
                <Text style={styles.buttonLabel}>Neste</Text>
              </Pressable>
            ))}
        </View>
        <View>
          {pagedResponse && (
            <Text style={styles.paragraph}>
              Side {pagedResponse?.currentPage} / {pagedResponse?.pageCount}
            </Text>
          )}
        </View>
      </VerticalScroll>
      <AbsoluteHomeButton />
    </View>
  );
};

export default ChooseScreen;
