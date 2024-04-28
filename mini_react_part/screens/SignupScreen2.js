import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import {payload} from './SignupScreen';
import ServiceSelectbox from '../components/ServiceSelectbox';
import SelectServicelist, { selectedServices } from '../components/SelectServicelist'; // Import SelectServicelist and selectedServices
import axios from "axios";
let apiresponse;
const SignupScreen2 = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

    const handleUserTypeSelect = (userType) => {
        setSelectedUserType(userType);
    };

    const handleUserServiceSelect = (index) => {
        const newSelectedServices = [...selectedServices];
        const itemIndex = newSelectedServices.indexOf(index);

        if (itemIndex !== -1) {
        // Remove item if already selected
          newSelectedServices.splice(itemIndex, 1);
        } else {
        // Add item if not selected
         newSelectedServices.push(index);
        }
        setSelectedServices(newSelectedServices);
    };

    const handleSubmit = async() =>{
        try{
            payload.usertype = selectedUserType;
            payload.services = selectedServices;
            payload.flag = 1;
            setLoading(true);
            if (selectedServices.length == 0 || !selectedUserType ) {
              alert("Please select atleast one of both");
              setLoading(false);
              return;
            }
            setLoading(false);
            apiresponse = await axios.post("http://192.168.194.163:8080/api/v1/auth/register2",payload,{
              headers:{
                "Content-Type":'application/json'
              }
            });
            //.then((response) => {
              alert(apiresponse.data.message);
              navigation.navigate("LoginScreen");
              console.log("Register Data==> ", {payload});
            //})
            //.catch((error) =>{
               // console.error(error.response.data.message);
            //});
            
          }
          catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
          }
    };
    return (

        <View style={styles.maincontainer}>
            {/* <View> */}
                {/*</View><View contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>*/}

                    <ServiceSelectbox onUserTypeSelect={handleUserTypeSelect} style={{ marginRight: 15 }} />

                    {/* <View style={styles.uploadview}>
                        <Text style={{ fontSize: 16, fontWeight: "700", color: "#8A8888" }}>Upload valid documnets</Text>
                        <Pressable>
                            <Image source={require("../assets/Upload.png")} style={styles.image} />
                        </Pressable>

                    </View> */}


                    <SelectServicelist onUserServiceSelect={handleUserServiceSelect} style={{ marginRight: 15 }} />

                    {/* <Pressable style={styles.tbutton} >
                        <Text style={styles.tbuttontext}>next</Text>
                    </Pressable>
                </View> */}
            {/* </View> */}


            {/* <View>
                <View style={styles.bottombuttonfield}>
                    {/* <Pressable style={styles.tbutton} >
                        <Text style={styles.tbuttontext}>Sign up</Text>
                    </Pressable> */}
                    {/*<Pressable
                        style={styles.tbutton}
                        onPress={handleSubmit}
                        disabled={loading} // Disable if loading is true
                    >
                    <Text style={styles.tbuttontext}>
                    {loading ? 'Loading...' : 'Sign up'} // Adapt text based on loading state
                    </Text>
                    </Pressable>

                </View>
            </View>
        </View> */}

        <View>
        <View style={styles.bottombuttonfield}>
            <Pressable 
                style={styles.tbutton} 
                onPress={handleSubmit}
                disabled={loading}>
                   <Text style={styles.tbuttontext}>{loading ? 'Loading...' : 'Sign up'}</Text>
            </Pressable>
        </View>
    </View>
</View>


 );
};

export default SignupScreen2;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "lightgreen",
        marginTop: 40,
        textAlign: "center"
    },
    tbutton: {
        width: 216,
        height: 51,
        backgroundColor: "#02BF9D",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 61,
    },

    tbuttontext: {
        color: "white",
        fontWeight: "900"
    },

    bottombuttonfield: {
        width: 360,
        height: 92,
        backgroundColor: "white",
        zIndex: 5,
        bottom: 0,  // BY USING THIS ONLY THAT BAR APPEARS
        // position: "absolute", // this also
        justifyContent: "center",
        alignItems: "center",

    }
})


// const styles = StyleSheet.create({

//     // maincontainer: {
//     //     flex: 1,
//     //     justifyContent: "center",
//     //     alignItems: "center",
//     //     // backgroundColor:"red",
//     //     marginTop: 150,
//     // },

//     scrollViewContent: {
//         // backgroundColor:"blue",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 50,
//         // flex:1,

//     },

//     image: {
//         height: 58,
//         width: 58,
//         marginTop: 5,

//     },

//     uploadview: {
//         marginTop: 45,
//         marginBottom: 45,
//         width: 314,
//         borderRadius: 11,
//         backgroundColor: "#DDEEEB",
//         height: 213,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     selectserviceview: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         // backgroundColor:'red',
//     },

//     textinput: {
//         width: 282,
//         height: 48,
//         marginTop: "8",
//         backgroundColor: "#E6FBF7",
//         borderRadius: 8,
//         padding: 10,
//     },


//     tbutton: {
//         width: 216,
//         height: 51,
//         backgroundColor: "#02BF9D",
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 61,


//     },

//     tbuttontext: {
//         color: "white",
//         fontWeight: "900"
//     },

//     bottombuttonfield: {
//         width: 360,
//         height: 92,
//         backgroundColor: "white",
//         zIndex:5,
//         bottom:0,  // BY USING THIS ONLY THAT BAR APPEARS
//         position:"absolute", // this also
//         justifyContent:"center",
//         alignItems:"center",
        
//     }


// })