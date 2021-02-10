import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/Stylesheet';

const Changelog = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTextStyle}>Changelog</Text>

            <View style={styles.changelogCard}>
                <Text style={styles.changelogHead}>Beta 0.2V</Text>
                <Text>- Illegale Farmrouten werden nun mit dem richtigen Multipikator angezeigt</Text>
                <Text>- Design etwas angepasst</Text>
                <Text>- Changelog eingefügt</Text>
            </View>
        </View>

    )
}

export default Changelog;