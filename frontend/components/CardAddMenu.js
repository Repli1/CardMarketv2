import { View, FlatList, Image, Pressable, TextInput, Modal, StyleSheet, Text } from "react-native";
import SearchBar from "./SearchBar.js";
import { useState, useEffect } from "react";
import { SingleCardManager } from "./SingleCardManager.js";
import data from "../components/TestDB.js";
import useDebounce from "../hooks/useDebounce";

export function CardAddMenu({ showModal, setShowModal, handleContentSizeChange, updateCurrentCards, cardsToPostByName, setCardsToPostByName, cardsToPostByImage, setCardsToPostByImage }) {
  const [clicked, setClicked] = useState(false);
  const [term, setTerm] = useState("");
  const debouncedSearchValue = useDebounce(term, 1000);

  const retrieveData = (key, value) => {
    setCardsToPostByName(prevDictionary => {
      return {
        ...prevDictionary,
        [key.name]: value,
      };
    });
    setCardsToPostByImage(prevDictionary => {
      return {
        ...prevDictionary,
        [key.image]: value,
      };
    });
  };
  const renderItem = ({ item }) => {
    let savedNumber = "0";
    if (item.name in cardsToPostByName) {
      savedNumber = cardsToPostByName[item.name];
    }
    return (
      <SingleCardManager
        item={item}
        handleContentSizeChange={handleContentSizeChange}
        savedNumber={savedNumber}
        sendData={retrieveData}
      />
    );
  }  

  const closing = () => {
    updateCurrentCards(cardsToPostByName, cardsToPostByImage);
    setShowModal(false);
  };
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    const filtered = data.filter((card) =>
      card.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [term]);

  return (
    <Modal visible={showModal} animationType="slide" transparent={true} style={styles.centeredView}>
      <View style={styles.modalView}>
        <SearchBar
          clicked={clicked}
          setClicked={setClicked}
          searchTerm={term}
          setSearchTerm={(newTerm) => setTerm(newTerm)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredCards}
          contentContainerStyle={styles.container7}
          renderItem={renderItem}/>
          <View style={{ borderRadius: 25, backgroundColor: '#11A88E', padding: 15, marginTop: 5, width: 150, alignItems: "center" }}>
            <Pressable onPress={closing} style={{  }}>
              <Text>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container7: {
    backgroundColor: '#1A1A1A',
    paddingBottom: 0,
    width: 300,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: "25%",
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: "75%",
  },
});