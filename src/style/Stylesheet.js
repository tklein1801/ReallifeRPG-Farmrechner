import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#435a64',
      alignItems: 'center',
    },

    headerTextStyle: {
        fontSize: 25,
        color: "#ff6f00",
        textAlign: "center",
        padding: "2%",
        paddingTop: "5%",
    },
    buttonStyle: {
      color: "white",
      fontSize: 15,
      fontWeight: "bold",
      backgroundColor: "#ff6f00",
      padding: "2%",
      borderRadius: 20,
      margin: "2%",
    },

    cardDesign: {
      backgroundColor: "white",
      margin: "4%",
      padding: "4%",
      borderRadius: 20,
      flex: 1,

    },
    textInputStyle: {
      marginTop: "3%",
      height: 60,
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