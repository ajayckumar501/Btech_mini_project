import { StyleSheet, Text, View, FlatList,  } from 'react-native';
import React, { useState } from 'react';
import { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import NavBarbottom from '../components/NavBarbottom';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';
import axios from "axios";
let userData,service,apiresponse;
//import {UserProvider,UserContext} from '../context/userdataContext';
const Serviceorganizerreceiver = () => {

  // const userData  = useContext(UserContext);
   const [services,setService] = useState(null)
  // console.log(JSON.stringify(userData));
  useEffect(() => {
    const getData = async (services) => {
      try {
        userData = await AsyncStorage.getItem("@userData");
        if (userData !== null) {
          console.log('Data retrieved successfully:', userData);
          service = JSON.parse(userData);
          // setService(service.services);
          apiresponse =  await axios.post("http://192.168.43.175:8080/api/v1/service/fetch", service.services,{
            headers:{
               "Content-Type":'application/json'
            }
          });
          AsyncStorage.setItem("@Services", JSON.stringify(apiresponse.data.services));
          setService(apiresponse.data.services);
        }
          
        else {
          console.log('No data found for key:', services);
        }
       }catch (error) {
        console.log('Error retrieving data:', error);
       }
    };

    // Call getData function here with the appropriate service
    getData("services"); // Example key, replace it with your actual key
  }, []);
  
  

  return (
    <View style={styles.container}>
      <SearchBar style={styles.SearchBartop} />
      {/* <Text>Serviceorganizerdonor</Text> */}

      {/* <FlatList data={data} renderItem={() => <View><View /></View>} /> */}
      <FlatList data={services}
        renderItem={({ item }) =>

          <View style={styles.serviceboxflat}>
            <Text style={styles.servicetext}>{item}</Text>
          </View>


        }

        contentContainerStyle={styles.flatstyle}
        showsVerticalScrollIndicator={false}
      />

        <NavBarbottom/>
    </View>
  )
}

export default Serviceorganizerreceiver;

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