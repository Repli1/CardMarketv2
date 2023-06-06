import { View, FlatList, Image, Pressable, TextInput, Modal, StyleSheet, Text } from "react-native";
import SearchBar from "./SearchBar.js";
import { useState, useEffect } from "react";
import { SingleCardManager } from "./SingleCardManager.js";
import data from "../components/TestDB.js";

export function CardAddMenu({ showModal, setShowModal, searchPhrase, setSearchPhrase, displayCards, setDisplayCards, handleContentSizeChange, updateCurrentCards, currentCardDict, setCurrentCardDict }) {
  const [clicked, setClicked] = useState(false);


  const retrieveData = (key, value) => {
    setDisplayCards(prevDictionary => {
      return {
        ...prevDictionary,
        [key.image]: value,
      };
    });
  
    setCurrentCardDict(prevDictionary => {
      return {
        ...prevDictionary,
        [key.name]: value,
      };
    });
  };
  
  const filteredCards = data.filter((card) =>
    card.name.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  const closing = () => {
    updateCurrentCards(displayCards);
    setShowModal(false);
  };

  return (
    <Modal visible={showModal} animationType="slide" transparent={true} style={styles.centeredView}>
      <View style={styles.modalView}>
        <SearchBar
          clicked={clicked}
          setClicked={setClicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredCards}
          contentContainerStyle={styles.container7}
          renderItem={({ item }) => {
          let savedNumber;
          item.name in currentCardDict ? savedNumber = currentCardDict[item.name] : savedNumber = "0";
          return (
            <SingleCardManager item={item} handleContentSizeChange={handleContentSizeChange} sendData={retrieveData} savedNumber={savedNumber}/>
            );
          }}/>
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