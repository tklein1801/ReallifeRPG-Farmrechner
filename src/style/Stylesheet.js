import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: '#435a64',
      alignItems: 'center',
    },

    headerTextStyle: {
        fontSize: 25,
        color: "#ff6f00",
        textAlign: "center",
        padding: "1%",
        paddingTop: "4%",
    },

    buttonStyle: {
      color: "white",
      fontSize: 15,
      fontWeight: "bold",
      backgroundColor: "#ff6f00",
      padding: "2%",
      borderRadius: 20,
      paddingHorizontal: '25%',
      paddingVertical: '5%',
      margin: "2%",
    },

    cardDesign: {
      backgroundColor: "white",
      margin: "4%",
      padding: "2%",
      paddingHorizontal: "20%",
      borderRadius: 20,
      flex: 1,

    },

    changelogCard: {
      backgroundColor: "white",
      margin: "4%",
      padding: "2%",
      paddingHorizontal: "20%",
      borderRadius: 20,

    },

    changelogHead: {
      fontSize: 20,
      marginBottom: "2%",
      color: "#ff6f00"

    },

    textInputStyle: {
      marginTop: "1%",
      height: 40,
      paddingHorizontal:"5%",
      textAlign: "center",
      borderRadius: 30,
      backgroundColor: "#FFFFFF",
      color: "#313833",
      borderColor: "#DEEDF7",
      borderWidth: 1
    },
  });
  
  export default styles;