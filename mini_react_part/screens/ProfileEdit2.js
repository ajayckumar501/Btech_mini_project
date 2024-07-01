import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import {payload} from './ProfileEdit1';
import ServiceSelectbox from '../components/ServiceSelectbox';
import SelectServicelist, { selectedServices } from '../components/SelectServicelist'; // Import SelectServicelist and selectedServices
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
let apiresponse;
const ProfileEdit2 = ({ route }) => {

    const navigation = useNavigation();

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
            apiresponse = await axios.post("http://192.168.218.163:8080/api/v1/auth/Profile_edit2",payload,{
              headers:{
                "Content-Type":'application/json'
              }
            });
            //.then((response) => {
              alert(apiresponse.data.message);
              navigation.navigate("LoginScreen");
            
          }
          catch (error) {
            alert(error);
            setLoading(false);
          }
    };
    return (

        <View style={styles.maincontainer}>
            <View contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

                    <ServiceSelectbox onUserTypeSelect={handleUserTypeSelect} style={{ marginRight: 15 }} />

                    <SelectServicelist onUserServiceSelect={handleUserServiceSelect} style={{ marginRight: 15 }} />

            </View>
            <View style={styles.bottombuttonfield}>
               <Pressable 
                   style={styles.tbutton} 
                   onPress={handleSubmit}
                   disabled={loading}>
                      <Text style={styles.tbuttontext}>{loading ? 'Loading...' : 'Edit'}</Text>
               </Pressable>
           </View>
        </View>


    );
};

export default ProfileEdit2;

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
        bottom: 90,  // BY USING THIS ONLY THAT BAR APPEARS
        // position: "absolute", // this also
        justifyContent: "center",
        alignItems: "center",

    }
})