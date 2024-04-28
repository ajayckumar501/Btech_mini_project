import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import NavBarbottom from '../components/NavBarbottom';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
let user;
const Serviceorganizerreceiver = ({ navigation }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem("@userData");
        if (userData) {
          user = JSON.parse(userData);
          const apiresponse = await axios.post("http://192.168.194.163:8080/api/v1/service/fetch", user.services, {
            headers: {
              "Content-Type": 'application/json'
            }
          });
          // Assuming the API response contains an array of objects with 'name' and 'id' properties
          const updatedServices = apiresponse.data.services.map(service => ({
            name: service.name,
            id: service.id
          }));
          console.log(updatedServices);
          AsyncStorage.setItem("@Services", JSON.stringify(updatedServices));
          setServices(updatedServices);
        } else {
          console.log('No user data found.');
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    getData();
  }, []);

  const handleListItemPress = (item) => {
    // Navigate to the next screen and pass both the service name and ID
    if(user.usertype === "Donor")
       navigation.navigate("Postorganizerdonor", { serviceId: item.id,serviceName:item.name });
    else
       navigation.navigate("Postorganizerreceiver", { serviceId: item.id,serviceName:item.name,username:user.username });
  };

  return (
    <View style={styles.container}>
      <SearchBar style={styles.SearchBartop} />
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleListItemPress(item)}>
            <View style={styles.serviceboxflat}>
              <Text style={styles.servicetext}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatstyle}
        showsVerticalScrollIndicator={false}
      />
      <NavBarbottom />
    </View>
  );
};

export default Serviceorganizerreceiver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  SearchBartop: {
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
});
