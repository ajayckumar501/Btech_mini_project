import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import React, { useState,useEffect } from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let apiresponse;
import axios from 'axios';


const GivecomplaintScreen = ({route}) => {

  const [complaint,setComplaint] = useState('');
  const [taker,setTaker] = useState(null); 
  const [giver,setGiver] = useState(null); 
  const [count,setCount] = useState(null);



  useEffect(() => {
    const user = route.params.username;

    const fetchData = async () => {
        setTaker(user);
        try {
            const Data = await AsyncStorage.getItem("@userData");
            if (Data) {
                const data = JSON.parse(Data);
                const username = data.username;
                if (username) {
                    setGiver(username);
                } 
            }
        } catch (error) {
            
        }
    };

    if (route.params) {
        fetchData();
    }

}, [route.params]);

useEffect(() => {
  const getData = async () => {
          try{ 
              apiresponse =  await axios.get("http://192.168.218.163:8080/api/v1/complaint/count",{
              headers:{
                      "Content-Type":'application/json'
              }
              })
              if(apiresponse){  
                 setCount(apiresponse.data.count);
              }
           }
           catch (error) {
          }
};
if (apiresponse === undefined) {
  getData();
}
}, [apiresponse]);



  const handleSubmit = async() => {
    try{
       if (!complaint) {
         Alert.alert("Please write complaint");
         return;
       }

       if (count === null) {
        // If count is null, set it to 1 as the initial complaint ID
        setCount(1);
      }

       payload = {
         complaintid:count,
         complaint:complaint,
         giver:giver,
         taker:taker,
       };
       apiresponse = await axios.post("http://192.168.218.163:8080/api/v1/complaint/create",payload,{
        headers:{
          "Content-Type":'application/json'
        }
      })
        alert(apiresponse.data.message);
        setComplaint('');
    }
    catch (error) {
      if(error.response){
         alert(error.response.data.message);
      }
    }
  };

  return (
    <View style={styles.maincontainer}>
      <Text style={{fontSize:24,fontWeight:"500",marginTop:30,color:"#575757"}}>Complaint</Text>
        <TextInput
                style={styles.input}
                placeholder="Give your complaint"
                multiline={true}
                value={complaint}
                onChangeText={(text) => setComplaint(text)}
                // placeholderTextColor="blue"
                // textAlignVertical="top"  // either place this here or in stylesheet

            />      


<TouchableOpacity style={styles.tbutton} onPress = {handleSubmit}>
            <Text style={styles.tbuttontext}>Submit</Text>
          </TouchableOpacity>
          
      
    </View>
  )
}

export default GivecomplaintScreen

const styles = StyleSheet.create({
    maincontainer:{
        flex:1,
        alignItems:"center",
        backgroundColor:"white"
    },
    input: {
        width: 320,
        // height: 48,
        marginTop: "8%",
        backgroundColor: "#E6FBF7",
        borderRadius: 8,
        padding: 20,
        minHeight:255,
        textAlignVertical: 'top',  // to keep the placeholder at top and not at middle
        

      },

      tbutton: {
        marginTop: "15%",
        width: 136,
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
    
})