import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'
import {useEffect} from  'react'
import NavBarbottom from '../components/NavBarbottom'
import Login,{username} from './LoginScreen';
import axios from "axios";
let services;
const Serviceorganizerdonor = () => {

  useEffect(() => {
    fetchUserDetails(username);
  }, []);

  const fetchUserDetails = async (username) => {
      axios.post("http://192.168.43.175:8080/api/v1/service/fetch",username,{
        headers:{
           "Content-Type":'application/json'
        }
     })
     .then((response) => {
       services = response.data.services;
     })
     .catch((error) =>{
       console.error(error.response.data.message);
     });
  };

  return (
    <View style={styles.container}>
      <SearchBar style={styles.SearchBartop} />
      {/* <Text>Serviceorganizerdonor</Text> */}

      {/* <FlatList data={data} renderItem={() => <View><View /></View>} /> */}

      <FlatList data={services}
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

export default Serviceorganizerdonor;

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