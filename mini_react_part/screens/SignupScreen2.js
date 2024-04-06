import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Image } from 'react-native'
import React from 'react'
import ServiceSelectbox from '../components/ServiceSelectbox'
import SelectServicelist from '../components/SelectServicelist'

const SignupScreen2 = () => {
    return (

        <View style={styles.maincontainer}>
            <View>
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: "#575757" }}>Select role</Text>
                    <ServiceSelectbox style={{ marginRight: 15 }} />


                    <View style={styles.uploadview}>
                        <Text style={{ fontSize: 16, fontWeight: "700", color: "#8A8888" }}>Upload valid documnets</Text>
                        <Pressable>
                            <Image source={require("../assets/Upload.png")} style={styles.image} />
                        </Pressable>

                    </View>


                    <SelectServicelist />

                    <Pressable style={styles.tbutton} >
                        <Text style={styles.tbuttontext}>next</Text>
                    </Pressable>
                </ScrollView>
            </View>


            <View>
                <View style={styles.bottombuttonfield}>
                    <Pressable style={styles.tbutton} >
                        <Text style={styles.tbuttontext}>Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </View>

    )
}

export default SignupScreen2

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