import { StyleSheet, Text, View, TextInput, Image, SafeAreaView } from 'react-native'
import React from 'react'

const SearchBar = () => {
  return (

    
       <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#969191" // to change place holder color its not in styles sheet
      />
      <Image source={require("../assets/Search.png")} style={styles.image} />
    </SafeAreaView>
    
   
  )
}

export default SearchBar

const styles = StyleSheet.create({

 container:{
  alignItems:'center',
  justifyContent:"center",
  backgroundColor:"#FFFFFF",
  width:"100%",
  height:75,
  marginTop:"11%"
  
 },

  input: {
    width: "91.1%",
    height: 45,
    backgroundColor: "#DDEEEB",
    borderRadius: 60,
    paddingLeft: 25,
    position:'absolute',

  },

  image:{
    height:25,
    width:25,
    marginLeft:"75%",
    // zIndex:5,
    padding:10,
    // backgroundColor:'red',
  },







})