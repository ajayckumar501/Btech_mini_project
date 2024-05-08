

import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, Pressable,Modal } from 'react-native';
import React, { useState,useEffect } from 'react';
import ServiceList from "../data/ServiceList.json";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

  const ProfilePublicScreen = ({ route }) => {

    let [services, setServices] = useState([]);
    let [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [location, setLocation] = useState(null);
    const [phoneno, setPhoneno] = useState(null);

    useEffect(() => {
        const user = route.params.username;
        
        const fetchData = async () => {
            try {
                const resp = await axios.get("http://192.168.92.163:8080/api/v1/auth/fetchUser", { username: user }, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });

                const userData = resp.data.user;
                setUsername(userData.username);
                setEmail(userData.email);
                setPhoneno(userData.phoneno);
                setLocation(userData.location)
  

                const apiresponse = await axios.post("http://192.168.92.163:8080/api/v1/service/fetch", userData.services, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                
                const updatedServices = apiresponse.data.services.map(service => ({
                    name: service.name,
                    id: service.id
                }));
                
                console.log(updatedServices);
                AsyncStorage.setItem("@Services", JSON.stringify(updatedServices));
                setServices(updatedServices);
            } catch (error) {
                console.log('Error retrieving data:', error.message);
            }
        };

        if (user) {
            fetchData();
        }
    }, [route.params]);

  const navigation = useNavigation();


  const [showMenu, setShowMenu] = useState(false); // State for menu visibility

  const menuOptions = [  // Array for menu options
    { text: 'Complaint', onPress: () => { navigation.navigate('GivecomplaintScreen',{username}); setShowMenu(false); } },
    { text: 'Give Feedback', onPress: () => {navigation.navigate('GivefeedbackScreen'); setShowMenu(false); } },
  ];

  return (
    <View style={{ marginTop: -25 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.maincontainer}>
          {/* <Text>ProfileScreen</Text> */}
          <View style={{ alignItems: "center", /*backgroundColor: "red",*/ width: "100%", }}>
          <Pressable
              onPress={() => setShowMenu(!showMenu)}  // Toggle menu visibility on press
              style={{ height: 39, width: 39, top: "25%", zIndex: 5, left: "40%" }}
            >
              <Image source={require("../assets/Menu Vertical(1).png")} style={{ height: 39, width: 39, }} />
              {showMenu && (  // Conditionally render menu items when showMenu is true
                <View style={{ position: 'absolute', top: -5, left: -135, backgroundColor: 'transparent', padding: 10, borderRadius: 5, /*elevation: 5,*/height:142,width:175}}>
                  {menuOptions.map((option, index) => (
                    <View key={index} style={option.text === 'Complaint' ? styles.editOption : styles.logoutOption}>
                      <TouchableOpacity onPress={option.onPress}>
                        <Text style={{fontSize:13,fontWeight:"bold",color:"white"}}>{option.text}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </Pressable>
            <Image source={require("../assets/adminprofile.png")} style={styles.image} />
            <Text style={{ fontSize: 20, fontWeight: "400" }}></Text>
            <Text style={{ fontSize: 14 }}>{username}</Text>
          </View>


          <View style={styles.maindetails}>
            <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>Name</Text>
              <Text style={styles.eachrowdetailtext}>{username}</Text>
            </View>
            {/* <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>Gender</Text>
              <Text style={styles.eachrowdetailtext}>M</Text>
            </View> */}
            <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>Email</Text>
              <Text style={styles.eachrowdetailtext}>{email}</Text>
            </View>
            <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>Ph-no</Text>
              <Text style={styles.eachrowdetailtext}>{phoneno}</Text>
            </View>
            {/* <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>Country</Text>
              <Text style={styles.eachrowdetailtext}>India</Text>
            </View>
            <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>State</Text>
              <Text style={styles.eachrowdetailtext}>Kerala</Text>
            </View> */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", /*backgroundColor:"blue",*/ marginTop: 15, }}>
              <Text style={styles.subtext}>Location</Text>
              <Text style={{ height: 119.42, width: 247, backgroundColor: "white", padding: 5, borderRadius: 8, }}>{location}</Text>
            </View>
          </View>


          {/*need to use flatlist here */}

          <View style={styles.intrestedservices}>
            <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10,textAlign:"center",color:"black"}}>Interested services</Text>
            {services.map((service, index) => (
              <View key={index} style={styles.serviceboxflat}>
                <Text style={styles.servicetext}>{service.name}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={{ /*backgroundColor:"red",*/ marginBottom: 120, marginTop: 30 }}>
            <Image source={require("../assets/messageroundicon.png")} style={{ height: 39, width: 39,  }} />
          </TouchableOpacity>


        </View>
      </ScrollView>

     
       
    </View>
  )
}


export default ProfilePublicScreen

const styles = StyleSheet.create({


    editOption: {
        backgroundColor: '#FF4444',
        padding: 10,
        width:150,
        height:59,
        borderRadius: 5,
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 10,
      },
      logoutOption: {
        backgroundColor: '#575757',
        padding: 10,
        width:150,
        height:59,
        borderRadius: 5,
        justifyContent:"center",
        alignItems:"center",
      },

    maincontainer: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white"
    },

    image: {
        width: 174.3,
        height: 174.3,
        marginTop: "12%",
    },

    maindetails: {
        marginTop: "8%",
        backgroundColor: "#DDEEEB",
        height: 507,
        width: 345,
        borderRadius: 26,
        paddingTop: 25,
    },

    subtext: {
        fontSize: 16,
        width: 61,


    },

    eachrowdetail: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        /*backgroundColor:"blue",*/
        marginTop: 15,
    },

    eachrowdetailtext: {
        backgroundColor: "white",
        borderRadius: 8,
        height: 33.52,
        width: 247,
        padding: 5,
    },

    intrestedservices: {
        width: 345,
        backgroundColor: "#DDEEEB",
        borderRadius: 26,
        marginTop: 25,
        padding: 15,
    },

    servicetext: {
        fontSize: 15,
        fontWeight: "400",
        marginBottom: 3,
        marginLeft: 10,
        // backgroundColor:"red"
    }


})

