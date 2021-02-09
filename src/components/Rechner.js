import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from '../style/Stylesheet';
import weightList from '../data/weightList';




const Rechner = () => {
    
    state = {

        marktArray: [],

    }

    useEffect(() => {
        getMarktPreise();
    }, []);

    function getMarktPreise() {

        fetch('https://api.realliferpg.de/v1/market_all', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                var count = Object.keys(responseJson).length;

                let marktArray = [];
                for (let i = 0; i < count; i++) {
                    marktArray.push({
                        price: responseJson.data[0].market[i].price,
                        name: responseJson.data[0].market[i].localized,
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



    return (
        <View style={styles.container}>
            <Text style={styles.headerTextStyle}>Rechner</Text>
        </View>
    )
}

export default Rechner;