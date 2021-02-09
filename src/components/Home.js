import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../style/Stylesheet';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {

    const [bagSize, setBagSize] = useState(0);
    const [carSize, setCarSize] = useState(0);
    const [server, setServer] = useState(0);

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
            <Picker
                selectedValue={server}
                style={{ height: 50, width: 200, color: "#000", backgroundColor: "#fff" }}
                onValueChange={(itemValue, itemIndex) =>
                    setServer(itemValue)
                }>
                <Picker.Item label="Server 1" value="0" />
                <Picker.Item label="Server 2" value="1" />
            </Picker>
            <TextInput
                label={"Rucksack Größe"}
                keyboardType="numeric"
                style={styles.textInputStyle}
                placeholder="Rucksack Größe"
                placeholderTextColor="#313833"
                onChangeText={text => {
                    setBagSize(text);
                    
                }}
            />
            <TextInput
                label={"Fahrzeug Größe"}
                keyboardType="numeric"
                style={styles.textInputStyle}
                placeholder="Fahrzeug Inventar"
                placeholderTextColor="#313833"
                onChangeText={text => {
                    setCarSize(text);
                }}
            />
            <Text style={{ color: "#fff", marginTop: "3%" }}>Z-Inventar: {parseInt(bagSize)} kg</Text>
            <Text style={{ color: "#fff", marginTop: "3%" }}>Fahrzeug Inventar: {parseInt(carSize)} kg</Text>
            <Text style={{ color: "#fff", marginTop: "3%" }}>Ausgewählter Server {parseInt(server)+1}</Text>
            <Text style={{ color: "#fff", marginTop: "6%" }}>Insgesamtes Inventar: {parseInt(carSize) + parseInt(bagSize)} kg</Text>

            <TouchableOpacity onPress={() => (storeData())}>
                <Text style={styles.buttonStyle}>Speichern</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;