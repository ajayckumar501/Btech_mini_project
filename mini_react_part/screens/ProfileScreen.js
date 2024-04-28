// import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
// import React from 'react'
// import ServiceList from "../data/ServiceList.json"
// import NavBarbottom from '../components/NavBarbottom'

// import { useNavigation } from '@react-navigation/native';


// const ProfileScreen = () => {


//     const navigation = useNavigation();


//     return (
//         <View style={{marginTop: -25 }}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <View style={styles.maincontainer}>
//                     {/* <Text>ProfileScreen</Text> */}
//                     <View style={{ alignItems: "center", /*backgroundColor: "red",*/ width: "100%", }}>
//                         <TouchableOpacity style={{ height: 39, width: 39, top: "25%", zIndex: 5, left: "40%" }}>
//                             <Image source={require("../assets/Menu Vertical(1).png")} style={{ height: 39, width: 39, }} />
//                         </TouchableOpacity>
//                         <Image source={require("../assets/adminprofile.png")} style={styles.image} />
//                         <Text style={{ fontSize: 20, fontWeight: "400" }}>Your Name</Text>
//                         <Text style={{ fontSize: 14 }}>Username</Text>
//                     </View>


//                     <View style={styles.maindetails}>
//                         <View style={styles.eachrowdetail}>
//                             <Text style={styles.subtext}>Name</Text>
//                             <Text style={styles.eachrowdetailtext}>leo</Text>
//                         </View>
//                         <View style={styles.eachrowdetail}>
//                             <Text style={styles.subtext}>Gender</Text>
//                             <Text style={styles.eachrowdetailtext}>M</Text>
//                         </View>
//                         <View style={styles.eachrowdetail}>
//                             <Text style={styles.subtext}>Email</Text>
//                             <Text style={styles.eachrowdetailtext}>leo@gmail.com</Text>
//                         </View>
//                         <View style={styles.eachrowdetail}>
//                             <Text style={styles.subtext}>Ph-no</Text>
//                             <Text style={styles.eachrowdetailtext}>6786886096</Text>
//                         </View>
//                         <View style={styles.eachrowdetail}>
//                             <Text style={styles.subtext}>Country</Text>
//                             <Text style={styles.eachrowdetailtext}>India</Text>
//                         </View>
//                         <View style={styles.eachrowdetail}>
//                             <Text style={styles.subtext}>State</Text>
//                             <Text style={styles.eachrowdetailtext}>Kerala</Text>
//                         </View>
//                         <View style={{ flexDirection: "row", justifyContent: "space-around",/*backgroundColor:"blue",*/marginTop: 15, }}>
//                             <Text style={styles.subtext}>Address</Text>
//                             <Text style={{ height: 119.42, width: 247, backgroundColor: "white", padding: 5, borderRadius: 8, }}>Big palace House, Kannur</Text>
//                         </View>
//                     </View>


//                     {/*need to use flatlist here */}

//                     <View style={styles.intrestedservices}>

//                         <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Interested services</Text>

//                         <FlatList data={ServiceList.diffservices}
//                             renderItem={({ index, item }) =>
//                                 <View style={styles.serviceboxflat}>
//                                     <Text style={styles.servicetext}>{item.name}</Text>
//                                 </View>
//                             }

//                             contentContainerStyle={styles.flatstyle}
//                             showsVerticalScrollIndicator={false}
//                         />
//                     </View>

//                     <TouchableOpacity style={{/*backgroundColor:"red",*/marginBottom:120,marginTop: 30}}>
//                         <Image source={require("../assets/messageroundicon.png")} style={{ height: 39, width: 39,  }} />
//                     </TouchableOpacity>


//                 </View>
//             </ScrollView>

//             <NavBarbottom/>
//          </View>


//     )
// }

// export default ProfileScreen

// const styles = StyleSheet.create({
//     maincontainer: {
//         flex: 1,
//         // justifyContent: "center",
//         alignItems: "center",
//         backgroundColor:"white"
//     },

//     image: {
//         width: 174.3,
//         height: 174.3,
//         marginTop: "12%",
//     },

//     maindetails: {
//         marginTop: "8%",
//         backgroundColor: "#DDEEEB",
//         height: 507,
//         width: 345,
//         borderRadius: 26,
//         paddingTop: 25,
//     },

//     subtext: {
//         fontSize: 16,
//         width: 61,


//     },

//     eachrowdetail: {
//         flexDirection: "row",
//         justifyContent: "space-around",
//         alignItems: "center",
//         /*backgroundColor:"blue",*/
//         marginTop: 15,
//     },

//     eachrowdetailtext: {
//         backgroundColor: "white",
//         borderRadius: 8,
//         height: 33.52,
//         width: 247,
//         padding: 5,
//     },

//     intrestedservices: {
//         width: 345,
//         backgroundColor: "#DDEEEB",
//         borderRadius: 26,
//         marginTop: 25,
//         padding: 15,
//     },

//     servicetext: {
//         fontSize: 15,
//         fontWeight: "400",
//         marginBottom: 3,
//         marginLeft: 10,
//         // backgroundColor:"red"
//     }


// })












import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, Pressable,Modal } from 'react-native'
import React, { useState,useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
let detail,servicenames;

import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {


    const [username,setusername] = useState(null);
    const [email,setemail] = useState(null);
    const [location,setlocation] = useState(null);
    const [phoneno,setphoneno] = useState(null);
    const [services,setService] = useState(null);
    // console.log(JSON.stringify(userData));
    useEffect(() => {
      const getData = async (services) => {
        try {
          userData = await AsyncStorage.getItem("@userData");
          servicenames = await AsyncStorage.getItem("@Services");
          if (userData !== null) {
            detail = JSON.parse(userData);
            setusername(detail.username);
            setemail(detail.email);
            setphoneno(detail.phoneno);
            setlocation(detail.location);
            setService(JSON.parse(servicenames));
          } else {
            console.log('No data found for key:', services);
          }
        } catch (error) {
          console.log('Error retrieving data:', error);
        }
      };
  
      // Call getData function here with the appropriate service
      getData("services"); // Example key, replace it with your actual key
    }, []);

  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false); // State for menu visibility

  const menuOptions = [  // Array for menu options
    { text: 'Edit', onPress: () => { navigation.navigate('ProfileeditScreen'); setShowMenu(false); } },
    { text: 'Logout', onPress: () => {navigation.navigate('LoginScreen'); setShowMenu(false); } },
  ];

  return (
    <View style={{ marginTop: -25 }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
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
                    <View key={index} style={option.text === 'Edit' ? styles.editOption : styles.logoutOption}>
                      <TouchableOpacity onPress={option.onPress}>
                        <Text style={{fontSize:13,fontWeight:"bold",color:"white"}}>{option.text}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </Pressable>
            <Image source={require("../assets/adminprofile.png")} style={styles.image} />
            <Text style={{ fontSize: 20, fontWeight: "400" }}>{username}</Text>
            {/* <Text style={{ fontSize: 14 }}>Username</Text> */}
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
            <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>Location</Text>
              <Text style={styles.eachrowdetailtext}>{location}</Text>
            </View>
            {/* <View style={styles.eachrowdetail}>
              <Text style={styles.subtext}>State</Text>
              <Text style={styles.eachrowdetailtext}>Kerala</Text>
            </View> */}
            {/* <View style={{ flexDirection: "row", justifyContent: "space-around", /*backgroundColor:"blue",*/ /*marginTop: 15, }}>
              {/* <Text style={styles.subtext}>Address</Text>
              <Text style={{ height: 119.42, width: 247, backgroundColor: "white", padding: 5, borderRadius: 8, }}>Big palace House, Kannur</Text>
            </View> */} 
          </View>


          {/*need to use flatlist here */}

          <View style={styles.intrestedservices}>

            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Interested services</Text>

            <FlatList data={services}
              renderItem={({ item }) =>(
                <View style={styles.serviceboxflat}>
                  <Text style={styles.servicetext}>{item}</Text>
                </View>
              )}

              contentContainerStyle={styles.flatstyle}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <TouchableOpacity style={{ /*backgroundColor:"red",*/ marginBottom: 120, marginTop: 30 }}>
            <Image source={require("../assets/messageroundicon.png")} style={{ height: 39, width: 39,  }} />
          </TouchableOpacity>


        </View>
      </ScrollView>

     
       
    </View>
  )
}


export default ProfileScreen

const styles = StyleSheet.create({


    editOption: {
        backgroundColor: '#02BF9D',
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

    serviceboxflat: {
      width: 325,
      height: 50,
      backgroundColor: '#A0A0A0', // Initial color
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 15,
      flexDirection: "row",
    },

    // servicetext: {
    //     fontSize: 15,
    //     fontWeight: "400",
    //     marginBottom: 3,
    //     marginLeft: 10,
    //     // backgroundColor:"red"
    // }
    servicetext: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
      marginRight: '60%',
    },


})

