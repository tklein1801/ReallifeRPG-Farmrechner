import React from "react";
import { changelogs } from "../data/changelogs.json";
import { Text, View } from "react-native";
import styles from "../style/Stylesheet";

const Changelog = () => {
  const reversedChangelog = changelogs.reverse(); // Now they should be sort by release date
  return (
    <View style={styles.container}>
      <Text style={styles.headerTextStyle}>Changelog</Text>
      {reversedChangelog.map((changelog, index) => {
        return (
          <View kex={index} style={styles.changelogCard}>
            <Text style={styles.changelogHead}>{changelog.version}</Text>
            {changelog.changes.map((change, changeIndex) => {
              return <Text key={changeIndex}>{change}</Text>;
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Changelog;
