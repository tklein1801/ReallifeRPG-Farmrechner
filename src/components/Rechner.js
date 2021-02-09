import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from '../style/Stylesheet';
import weightList from '../data/weightList';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Rechner = () => {

    const [marktArray, setMarkt] = useState(0);
    const [bagSize, setBagSize] = useState(0);
    const [carSize, setCarSize] = useState(0);
    const [server, setServer] = useState(0);
    const [inv, setInv] = useState(0);

    const getData = async () => {
        try {
            let bag = await AsyncStorage.getItem('@baginv');
            let car = await AsyncStorage.getItem('@carinv');
            let server = await AsyncStorage.getItem('@server');
            setBagSize(parseInt(bag));
            setCarSize(parseInt(car));
            setServer(parseInt(server))
            setInv(bagSize + carSize);
        } catch (e) {
        }

        getMarktPreise();

    }


    useEffect(() => {
        getData();
        getMarktPreise();
    }, []);

    function getMarktPreise() {

        fetch('https://api.realliferpg.de/v1/market_all', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let blockData = ['white_widow', 'white_russian', 'purple_haze', 'fentanyl_r', 'fish_feed']
                let marktArray = [];
                let itemWeight;


                for (let i = 0; i < 45; i++) {
                    if (blockData.includes(responseJson.data[server].market[i].item) == false) {

                        for (let j = 0; j < 39; j++) {
                            if (weightList.weightList[0].item[j].name == responseJson.data[server].market[i].item) {
                                itemWeight = weightList.weightList[0].item[j].weight
                            }
                        }


                        marktArray.push({
                            price: responseJson.data[server].market[i].price,
                            name: responseJson.data[server].market[i].localized,
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
            <Text style={{ color: "#fff", marginTop: "3%" }}>Z-Inventar: {parseInt(bagSize)} kg</Text>
            <Text style={{ color: "#fff", marginTop: "3%" }}>Fahrzeug Inventar: {parseInt(carSize)} kg</Text>
            <Text style={{ color: "#fff", marginTop: "3%" }}>Ausgewählter Server {parseInt(server) + 1}</Text>
            <Text style={{ color: "#fff", marginTop: "6%", marginBottom: "2%" }}>Insgesamtes Inventar: {parseInt(carSize) + parseInt(bagSize)} kg</Text>
            <FlatList
                data={marktArray}
                keyExtractor={item => item.key}
                renderItem={({ item }) => {
                    return <View style={styles.cardDesign}>
                        <Text style={{ flex: 1, fontWeight: 'bold', textTransform: 'capitalize', fontSize: 16, alignContent: "center", textAlign: 'center', padding: '1%', color: '#ff6f00' }}>{(inv / item.weight).toFixed(0)} {item.name}</Text>
                        <Text style={{ flex: 1, fontWeight: 'bold', textTransform: 'capitalize', fontSize: 16, alignContent: "center", textAlign: 'center' }}>Preis pro Stück: {item.price} $</Text>
                        <Text style={{ flex: 1, fontWeight: 'bold', textTransform: 'capitalize', fontSize: 16, alignContent: "center", textAlign: 'center' }}>Ertrag: {((inv / item.weight) * item.price).toFixed(0)} $ </Text>

                    </View>;

                }}
            />
            <TouchableOpacity onPress={() => getData()}>
                <Text style={styles.buttonStyle}>Einstellungen aktualisieren</Text>
            </TouchableOpacity>
        </View>

    )
}

export default Rechner;