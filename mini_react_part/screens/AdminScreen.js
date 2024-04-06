import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import NavBarbottom from '../components/NavBarbottom'

const AdminScreen = () => {
  return (
    <View style={styles.maincontainer}>
      {/* <Text>AdminScreen</Text> */}
      <View style={styles.adminheader}>
        <Image source={require("../assets/adminprofile.png")} style={styles.image} />
        <View>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "white" }}>Admin name</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>adusername</Text>
        </View>
        <Image source={require("../assets/verti3.png")} style={{ height: 39, width: 39 }} />
      </View>


      <ScrollView style={{ height: "60%" }}>
        <View style={styles.basecontainer}>

          <View style={styles.totaldonrec}>
            <Pressable style={{ width: 151, height: 125, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8, marginRight: 18 }} >
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Total Donors</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>19.3k</Text>
            </Pressable>
            <Pressable style={{ width: 151, height: 125, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8 }} >
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Total Recievers</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>25.6k</Text>
            </Pressable>
          </View>

          <Pressable style={{ width: 324, height: 125, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8, flexDirection: "row" }} >
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", marginRight: 15 }}>Total no of posts</Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>50.7k</Text>
          </Pressable>

          <Pressable style={{ width: 324, height: 66, backgroundColor: "#FF4444", justifyContent: "center", alignItems: "center", borderRadius: 8 }} >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>User complaints</Text>
          </Pressable>

          <Pressable style={{ width: 324, height: 66, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8 }} >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>User Requests</Text>
          </Pressable>

          <Pressable style={{ width: 324, height: 66, backgroundColor: "#656565", justifyContent: "center", alignItems: "center", borderRadius: 8 }} >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Suspended accounts</Text>
          </Pressable>

          <Pressable style={{ width: 324, height: 66, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8 }} >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Add new service</Text>
          </Pressable>



        </View>
      </ScrollView>



      <NavBarbottom />
    </View>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,

    // backgroundColor: "red",
    paddingTop: 40,
  },

  adminheader: {
    width: 360,
    height: 119,
    backgroundColor: "#02BF9D",
    // position:"absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  image: {
    width: 95.26,
    height: 95.26,

  },

  basecontainer: {
    width: "100%",
    height: 604,
    flexDirection: "column",
    // marginTop:15,
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor:"violet"
  },

  totaldonrec: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor:"blue"
  },



})