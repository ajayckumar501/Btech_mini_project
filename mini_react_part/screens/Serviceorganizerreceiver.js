import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'

import ServiceList from "../data/ServiceList.json"
import NavBarbottom from '../components/NavBarbottom'
const Serviceorganizerdonor = () => {







  return (
    <View style={styles.container}>
      <SearchBar style={styles.SearchBartop} />
      {/* <Text>Serviceorganizerdonor</Text> */}

      {/* <FlatList data={data} renderItem={() => <View><View /></View>} /> */}

      <FlatList data={ServiceList.diffservices}
        renderItem={({ index, item }) =>


          <View style={styles.serviceboxflat}>
            <Text style={styles.servicetext}>{item.name}</Text>
          </View>





        }

        contentContainerStyle={styles.flatstyle}
        showsVerticalScrollIndicator={false}
      />

        <NavBarbottom/>
    </View>
  )
}

export default Serviceorganizerdonor

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",

  },

  SearchBartop: {
    // zIndex:5,
    marginTop: "90%",
  },

  serviceboxflat: {
    width: 343,
    height: 94,
    backgroundColor: "#02BF9D",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginBottom: 15,
    flexDirection: "row",
  },

  flatstyle: {
    alignItems: 'center',
  },

  servicetext: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
  },


})