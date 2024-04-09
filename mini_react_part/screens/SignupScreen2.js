import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
//import ServiceSelectbox from '../components/ServiceSelectbox';
import SelectServicelist, { selectedServices } from '../components/SelectServicelist'; // Import SelectServicelist and selectedServices
import ServiceSelectbox, { selectedRadio } from '../components/ServiceSelectbox';

const SignupScreen2 = () => {

    const [loading, setLoading] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState(null);

    const handleUserTypeSelect = (userType) => {
        setSelectedUserType(userType);
    };

    const handleSubmit = () =>{
        console.log(selectedUserType);
        console.log(selectedServices);
    };
    return (

        <ScrollView style={styles.maincontainer}>
            {/* <View> */}
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: "#575757" }}>Select role</Text>
                    <ServiceSelectbox onUserTypeSelect={handleUserTypeSelect} style={{ marginRight: 15 }} />
                    <Text>Selected role:{selectedUserType}</Text>

                    {/* <View style={styles.uploadview}>
                        <Text style={{ fontSize: 16, fontWeight: "700", color: "#8A8888" }}>Upload valid documnets</Text>
                        <Pressable>
                            <Image source={require("../assets/Upload.png")} style={styles.image} />
                        </Pressable>

                    </View> */}


                    <SelectServicelist />
                    <Text>Selected Services:{selectedServices}</Text>

                    <Pressable style={styles.tbutton} >
                        <Text style={styles.tbuttontext}>next</Text>
                    </Pressable>
                </ScrollView>
            {/* </View> */}


            <ScrollView>
                <View style={styles.bottombuttonfield}>
                    {/* <Pressable style={styles.tbutton} >
                        <Text style={styles.tbuttontext}>Sign up</Text>
                    </Pressable> */}
                    <Pressable
                        style={styles.tbutton}
                        onPress={handleSubmit}
                        disabled={loading} // Disable if loading is true
                    >
                    <Text style={styles.tbuttontext}>
                    {loading ? 'Loading...' : 'Sign up'} // Adapt text based on loading state
                    </Text>
                    </Pressable>

                </View>
            </ScrollView>
        </ScrollView>

    )
}

export default SignupScreen2;

const styles = StyleSheet.create({

    // maincontainer: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     // backgroundColor:"red",
    //     marginTop: 150,
    // },

    scrollViewContent: {
        // backgroundColor:"blue",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        // flex:1,

    },

    image: {
        height: 58,
        width: 58,
        marginTop: 5,

    },

    uploadview: {
        marginTop: 45,
        marginBottom: 45,
        width: 314,
        borderRadius: 11,
        backgroundColor: "#DDEEEB",
        height: 213,
        alignItems: 'center',
        justifyContent: 'center',
    },

    selectserviceview: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'red',
    },

    textinput: {
        width: 282,
        height: 48,
        marginTop: "8",
        backgroundColor: "#E6FBF7",
        borderRadius: 8,
        padding: 10,
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
        zIndex:5,
        bottom:0,  // BY USING THIS ONLY THAT BAR APPEARS
        position:"absolute", // this also
        justifyContent:"center",
        alignItems:"center",
        
    }


})