import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../style/Stylesheet';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {

    const [bagSize, setBagSize] = useState(0);
    const [carSize, setCarSize] = useState(0);
    const [server, setServer] = useState(0);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            let bag = await AsyncStorage.getItem('@baginv');
            let car = await AsyncStorage.getItem('@carinv');
            setBagSize(bag);
            setCarSize(car);
        } catch (e) {
        }

    }

    const storeData = async (value) => {
        try {
            let serverString = server.toString();
            let bagString = bagSize.toString();
            let carString = carSize.toString();
            await AsyncStorage.setItem('@baginv', bagString)
            await AsyncStorage.setItem('@carinv', carString)
            await AsyncStorage.setItem('@server', serverString)
        } catch (e) {
            // saving error
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTextStyle}>ReallifeRPG - Farmrechner</Text>
            <Text style={{ color: "white", fontSize: 14, marginBottom: "2%" }}>Dies ist keine offizelle App die von Reallife RPG unterstützt wird!</Text>
            <Text style={{ color: "white", fontSize: 20 }}>Serverauswahl:</Text>
            <Picker
                selectedValue={server}
                style={{ height: 50, width: 200, color: "#000", backgroundColor: "#fff" }}
                onValueChange={(itemValue, itemIndex) =>
                    setServer(itemValue)
                }>
                <Picker.Item label="Server 1" value="0" />
                <Picker.Item label="Server 2" value="1" />
            </Picker>
            <Text style={{ color: "white", fontSize: 16, marginTop: "5%" }}>Z-Inventar</Text>
            <TextInput
                label={"Rucksack Größe"}
                keyboardType="numeric"
                style={styles.textInputStyle}
                placeholder="Rucksack Größe"
                placeholderTextColor="#313833"
                onChangeText={text => {
                    setBagSize(text);
                }}
                value={bagSize}
            />
            <Text style={{ color: "white", fontSize: 16 }}>Fahrzeug Inventar</Text>
            <TextInput
                label={"Fahrzeug Größe"}
                keyboardType="numeric"
                style={styles.textInputStyle}
                placeholder="Fahrzeug Inventar"
                placeholderTextColor="#313833"
                onChangeText={text => {
                    setCarSize(text);
                }}
                value={carSize}
            />
            <View style={{ alignItems: 'center', backgroundColor: "#fff", marginTop: '8%',margin: "2%", padding: "2%", borderRadius: 20 }}>
                <Text style={{ color: "#435a64" }}>Z-Inventar: {parseInt(bagSize)} kg</Text>
                <Text style={{ color: "#435a64", marginTop: "3%" }}>Fahrzeug Inventar: {parseInt(carSize)} kg</Text>
                <Text style={{ color: "#435a64", marginTop: "3%" }}>Ausgewählter Server {parseInt(server) + 1}</Text>
            </View>
            <View style={{ alignItems: 'center', backgroundColor: "#fff", marginVertical: "2%", paddingHorizontal: "10%", borderRadius: 60 }}>
                <Text style={{ fontWeight: 'bold', color: "#ff6f00", padding: "3%" }}>Insgesamtes Inventar: {parseInt(carSize) + parseInt(bagSize)} kg</Text>
            </View>
            <TouchableOpacity onPress={() => (storeData())}>
                <Text style={styles.buttonStyle}>Speichern</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;