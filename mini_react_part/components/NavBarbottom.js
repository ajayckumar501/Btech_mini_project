import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavBarbottom = () => {

  const navigation = useNavigation();
  const handlePress = () => {
    // Navigate to the desired screen
    navigation.navigate('ProfileScreen');
  };
  const handlePress1 = () => {
    // Navigate to the desired screen
    navigation.navigate('Serviceorganizerreceiver');
  };

  const handlePress2 = async() => {
    // Navigate to the desired screen
    const usrData = await AsyncStorage.getItem("@userData");
    const detail = JSON.parse(usrData)
    navigation.navigate('ConnectionManager',{username:detail.username});
  };

  const handlePress3 = async() => {
    navigation.navigate('LoginScreen');
  };


  return (
    <View style={styles.maincontainer}>
      {/* <Text style={{backgroundColor:"green"}}>NavBarbottom</Text> */}

      <View style={styles.navbar}>

        <Pressable onPress={handlePress1}>
          <Image source={require("../assets/homebuttongrey.png")} style = {{ height:35, width:35, marginTop:3}} />
        </Pressable>
        <Pressable onPress={handlePress2}>
          <Image source={require("../assets/community2.png")} style = {{ height:35, width:35, marginTop:4}} />
        </Pressable>
        <Pressable onPress={handlePress}>
          <Image source={require("../assets/usericongrey.png")} style = {{ height:35, width:35, marginTop:5}}/>
        </Pressable>
        <Pressable onPress={handlePress3}>
          <Image source={require("../assets/logout2.png")} style={styles.image} />
        </Pressable>
      </View>
    </View>
  )
}

export default NavBarbottom

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: "center",
  },

  navbar: {
    width: "100%",
    height: 60,
    // backgroundColor: "white",
    backgroundColor: "#DDEEEB",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },

  image:{
    height:35,
    width:35,
  }



})