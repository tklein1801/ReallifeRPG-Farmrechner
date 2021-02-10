import React from "react";
import { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import styles from "../style/Stylesheet";
import { illegalItems, itemBlacklist } from "../data/config.json";
import weightList from "../data/weightList";
import multiplierBonus from "../data/multiplierBonus";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Rechner = () => {
  const [marktArray, setMarkt] = useState(0);
  const [bagSize, setBagSize] = useState(0);
  const [carSize, setCarSize] = useState(0);
  const [server, setServer] = useState(0);
  const [cops, setCopCount] = useState(0);
  const [inv, setInv] = useState(0);

  const getData = async () => {
    try {
      let bag = await AsyncStorage.getItem("@baginv");
      let car = await AsyncStorage.getItem("@carinv");
      let server = await AsyncStorage.getItem("@server");
      setBagSize(parseInt(bag));
      setCarSize(parseInt(car));
      setServer(parseInt(server));
      setInv(bagSize + carSize);
    } catch (e) {}

    getMarktPreise();
  };

  useEffect(() => {
    getData();
    getMarktPreise();
  }, []);

  function getMarktPreise() {
    fetch("https://api.realliferpg.de/v1/servers", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var temp = responseJson.data[server];
        let copAmount = temp.Side.Cops.filter((player) => player.includes("[C")).length;
        setCopCount(copAmount);
      })
      .catch((error) => {
        console.log(error + "::: Error Message");
      });

    fetch("https://api.realliferpg.de/v1/market_all", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let marktArray = [];
        let itemAmount = responseJson.data[server].market.length;
        // let blockData = ['white_widow', 'white_russian', 'purple_haze', 'fentanyl_r', 'fish_feed']
        // let illegalItems = ['cocaine_r', 'heroin_r', 'fentanyl_r', 'purple_haze', 'white_widow', 'white_russian', 'lsd', 'rum', 'vodka']
        let itemWeight, fullPrice;
        let marketItem = responseJson.data[server].market[i];
        for (let i = 0; i < itemAmount; i++) {
          if (!itemBlacklist.includes(marketItem.item)) {
            for (let j = 0; j < itemAmount - itemBlacklist.length; j++) {
              if (weightList.weightList[0].item[j].name == marketItem.item) {
                itemWeight = weightList.weightList[0].item[j].weight;
              }

              fullPrice = marketItem.price;

              if (illegalItems.includes(marketItem.item)) {
                fullPrice = fullPrice * multiplierBonus.multiplierBonus.bonus[cops].multiplier;
                fullPrice.toFixed(0);
              }
            }

            marktArray.push({
              price: fullPrice,
              name: marketItem.localized,
              weight: itemWeight,
              key: i,
            });
          }
        }

        setMarkt(marktArray);
      })
      .catch((error) => {
        console.log(error + "::: Error Message");
      });
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          margin: "2%",
          padding: "2%",
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "#435a64" }}>Z-Inventar: {parseInt(bagSize)} kg</Text>
        <Text style={{ color: "#435a64", marginTop: "3%" }}>
          Fahrzeug Inventar: {parseInt(carSize)} kg
        </Text>
        <Text style={{ color: "#435a64", marginTop: "3%" }}>
          Ausgewählter Server {parseInt(server) + 1}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          marginVertical: "1%",
          paddingHorizontal: "10%",
          borderRadius: 60,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#ff6f00", padding: "3%" }}>
          Insgesamtes Inventar: {parseInt(carSize) + parseInt(bagSize)} kg
        </Text>
      </View>
      <FlatList
        data={marktArray}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardDesign}>
              <Text
                style={{
                  flex: 1,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: 16,
                  alignContent: "center",
                  textAlign: "center",
                  padding: "1%",
                  color: "#ff6f00",
                }}
              >
                {(inv / item.weight).toFixed(0)} {item.name}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: 16,
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                Preis pro Stück: {item.price} $
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: 16,
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                Ertrag: {((inv / item.weight) * item.price).toFixed(0)} ${" "}
              </Text>
            </View>
          );
        }}
      />
      <TouchableOpacity onPress={() => getData()}>
        <Text style={styles.buttonStyle}>Liste aktualisieren</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Rechner;
