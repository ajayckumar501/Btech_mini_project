import { StyleSheet, TouchableWithoutFeedback, Text, View, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [location, setLocation] = useState(null);
  const [phoneno, setPhoneno] = useState(null);
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const usrData = await AsyncStorage.getItem("@userData");
        //const userData = JSON.parse(usrData);
        const servicenames = await AsyncStorage.getItem("@Services");
        if (usrData !== null) {
          const detail = JSON.parse(usrData);
          setUser(detail);
          setUsername(detail.username);
          setEmail(detail.email);
          setPhoneno(detail.phoneno);
          setLocation(detail.location);
          setServices(JSON.parse(servicenames));
        } 
      } catch (error) {
        
      }
    };
    getData();
  }, []);

  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false); // State for menu visibility

  const menuOptions = [  // Array for menu options
    { text: 'Edit', onPress: () => { navigation.navigate('ProfileEdit1',{user:user}); setShowMenu(false); } },
    { text: 'Logout', onPress: () => { navigation.navigate('LoginScreen'); setShowMenu(false); } },
  ];
  const hideMenu = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={hideMenu}>
    <View style={{ marginTop: -25 }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <View style={styles.maincontainer}>
          <Pressable
            onPress={() => setShowMenu(!showMenu)}  // Toggle menu visibility on press
            style={{ height: 39, width: 39, marginTop: "25%", zIndex: 5, left: "40%" }}
          >
            <Image source={require("../assets/Menu Vertical(1).png")} style={{ height: 39, width: 39 }} />
            {showMenu && (
              <View style={{ position: 'absolute', top: -5, left: -135, backgroundColor: 'transparent', padding: 10, borderRadius: 5, height: 142, width: 175 }}>
                {menuOptions.map((option, index) => (                 
                  <View key={index} style={option.text === 'Edit' ? styles.editOption : styles.logoutOption}>
                    <TouchableOpacity onPress={option.onPress}>
                      <Text style={{ fontSize: 13, fontWeight: "bold", color: "white" }}>{option.text}</Text>
                    </TouchableOpacity>
                  </View>                 
                ))}
              </View>
            )}
          </Pressable>
          <Image source={require("../assets/adminprofile.png")} style={styles.image} />
          <Text style={{ fontSize: 20, fontWeight: "400" }}>{username}</Text>
          <View style={styles.maindetails}>
            <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>Name</Text>
              <Text style={styles.eachrowdetailtext}>{username}</Text>
            </View>
            <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>Email</Text>
              <Text style={styles.eachrowdetailtext}>{email}</Text>
            </View>
            <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>Ph-no</Text>
              <Text style={styles.eachrowdetailtext}>{phoneno}</Text>
            </View>
            <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>Loc</Text>
              <Text style={styles.eachrowdetailtext}>{location}</Text>
            </View>
          </View>
          <View style={styles.intrestedservices}>
            <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10,textAlign:"center",color:"black"}}>Interested services</Text>
            {services.map((service, index) => (
              <View key={service.id || index} style={styles.serviceboxflat}>
                <Text style={styles.servicetext}>{service.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  editOption: {
    backgroundColor: '#02BF9D',
    padding: 10,
    width: 150,
    height: 59,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  logoutOption: {
    backgroundColor: '#575757',
    padding: 10,
    width: 150,
    height: 59,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  maincontainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  image: {
    width: 174.3,
    height: 174.3,
    marginTop: "-3%",
  },
  maindetails: {
    marginTop: "8%",
    backgroundColor: "#DDEEEB",
    width: "90%",
    borderRadius: 26,
    padding:"5%"
  },
  subtext: {
    fontSize: 16,
    width: 75,
  },
  eachrowdetail: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    width: "90%",
    backgroundColor: "#DDEEEB",
    // backgroundColor:"red",
    borderRadius: 26,
    marginTop: 25,
    padding: "5%",
    marginBottom:20,
  },
  serviceboxflat: {
    width: "100%",
    height: 50,
    backgroundColor: '#02BF9D', // Initial color
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
  },
  servicetext: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    // marginRight: '60%',
  },
});