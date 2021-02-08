import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from '../style/Stylesheet';

const getMarktPreise = () => {

    fetch('https://api.realliferpg.de/v1/market_all', {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var count = Object.keys(responseJson).length;

            marktArray = [];
            for (i = 0; i < count; i++) {
                marktArray.push({
                    price: responseJson[0].market[i].price,
                    name: responseJson[0].market[i].localized,
                });
            }

            this.setState({
                markt: marktArray,
            })
        })
        .catch((error) => {
            console.log(error + "::: Error Message");
        });

}

const Rechner = () => {

    state = {

        markt: [],

    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTextStyle}>Rechner</Text>
        </View>
    )
}

export default Rechner;