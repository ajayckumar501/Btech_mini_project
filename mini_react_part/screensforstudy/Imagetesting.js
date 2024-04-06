import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Imagetesting = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/signupLogo.png")} style={styles.image} />
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container take up the whole screen
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  image: {
    
    width: 200,
    height: 150,
  },
});

export default Imagetesting

