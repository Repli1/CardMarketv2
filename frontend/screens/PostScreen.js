import { Text, View, Pressable, StyleSheet, FlatList, Image, Modal, TextInput, useWindowDimensions } from "react-native";
import { CardAddMenu } from "../components/CardAddMenu.js";
import { PostButton } from "../components/PostButton.js";
import { SaleAuctionSlider } from "../components/SaleAuctionSlider.js";
import { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { PrivateValueStore } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export function PostScreen() {
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState();
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const handleContentSizeChange = (event) => {
    const { contentSize } = event.nativeEvent;
    const offsetX = (contentSize.width - event.target.clientWidth) / 2;
    event.target.setNativeProps({
      contentOffset: { x: offsetX, y: 0 },
    });
  };
  const [cardDisplayArray, setCardDisplayArray] = useState([])
  const [cardsToPostByImage, setCardsToPostByImage] = useState({});
  const [cardsToPostByName, setCardsToPostByName] = useState({});

  const updateCurrentCards = (byName, byImage) => {
    // Remove entries with value 0 from cardsToPostByName
    const updatedCardsByName = Object.fromEntries(
      Object.entries(byName).filter(([key, value]) => value !== "0")
    );
    setCardsToPostByName(updatedCardsByName);
  
    // Remove entries with value 0 from cardsToPostByImage and cardDisplayArray
    const updatedCardsByImage = {};
    const updatedCardDisplayArray = [];
  
    Object.entries(byImage).forEach(([key, value]) => {
      if (value !== "0") {
        updatedCardsByImage[key] = value;
        updatedCardDisplayArray.push({ key, value });
      }
    });
  
    setCardsToPostByImage(updatedCardsByImage);
    setCardDisplayArray(updatedCardDisplayArray);
  
    console.log('Cards rendered as an array (What we pass to the FlatList): ');
    console.log(updatedCardsByImage);
    console.log(updatedCardDisplayArray);
    console.log('Cards dictionary (What we save with the post info): ');
    console.log(updatedCardsByName);
  };
  

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [1440, 2560],
      quality: 1
    })
    setImages(result.assets);
    console.log(images);
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'purple' }}>
      <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#252525' }}>
        <View style={styles.container}>
          <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.container3}>
                  <Image source={{ uri: item.uri }} style={{ width: 72, height: 128}}/>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.uri}
          contentContainerStyle={{ marginVertical: 0, paddingBottom: 10}}
          />
        </View>
        <View style={styles.container2}>
          <Pressable onPress={pickImages}>
            <View style={{ backgroundColor: "#11A88E", width: 80, height: 80, borderRadius: 90, justifyContent: "center", alignItems: "center" }}>
              <View style={{ backgroundColor: "#DEDEDE", width: 50, height: 10, borderRadius: 90, justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "#DEDEDE", width: 10, height: 50, borderRadius: 90 }}>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#252525' }}>
      <View style={styles.container}>
        <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={cardDisplayArray}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.container3}>
                <Image source={{ uri: item.key }} style={styles.image}/>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center"}}>
                <Text>
                  { item.value }
                </Text>
              </View>
            </View>
          );
        }}/>
      </View>
      <View style={styles.container2}>
        <Pressable onPress={() => {setShowModal(true)}}>
          <View style={{ backgroundColor: "#11A88E", width: 80, height: 80, borderRadius: 90, justifyContent: "center", alignItems: "center" }}>
            <View style={{ backgroundColor: "#DEDEDE", width: 50, height: 10, borderRadius: 90, justifyContent: "center", alignItems: "center" }}>
              <View style={{ backgroundColor: "#DEDEDE", width: 10, height: 50, borderRadius: 90 }}>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
        <CardAddMenu showModal={showModal} handleContentSizeChange={handleContentSizeChange} setShowModal={setShowModal} updateCurrentCards={updateCurrentCards} cardsToPostByName={cardsToPostByName} setCardsToPostByName={setCardsToPostByName} cardsToPostByImage={cardsToPostByImage} setCardsToPostByImage={setCardsToPostByImage}/>
      </View>
      <View style={{ backgroundColor: '#252525', flex: 1 }}>
        <View style= {{ flex: 2, backgroundColor: '#252525', flexDirection: "row" }}>
          <View style={{ flex: 1, backgroundColor: '#3F3F3F', borderRadius: 15, margin: 10, alignItems: "center", justifyContent: "center"}}>
            <TextInput placeholder="Price" style={{ margin: 5 }}
              value={price}
              onChangeText={setPrice}
              multiline={true}
              onContentSizeChange={handleContentSizeChange}
            >
            </TextInput>
          </View>
          <View style={{ flex: 3, backgroundColor: '#3F3F3F', borderRadius: 15, margin: 10, alignItems: "center", justifyContent: "center" }}>
            <TextInput placeholder="Description" style={{ margin: 5 }}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              onContentSizeChange={handleContentSizeChange}
            >
            </TextInput>
          </View>
        </View>
        <View style= {{ flex: 1, backgroundColor: '#252525' }}>
          <SaleAuctionSlider/>
        </View>
        <View style= {{ flex: 1, backgroundColor: '#252525', justifyContent: "center", alignItems: 'center' }}>
          <PostButton/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 4,
    backgroundColor: '#3F3F3F',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: '2%',
    marginRight: '2%',
    height: '80%',
    borderRadius: 20,
  },
  container2: {
    flexDirection: 'row',
    flex: 1.5,
    backgroundColor: '#3F3F3F',
    height: '45%',
    marginRight: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 180,
  },
  image: {
    width: 80,
    height: 112,
    borderWidth: 1,
    padding: 1,
  },
  container3: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  container5: {
    alignItems: "center",
    justifyContenr: "center",
  },
})