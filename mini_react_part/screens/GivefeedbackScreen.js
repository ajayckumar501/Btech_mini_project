import { StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView } from 'react-native';
import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
let apiresponse;
import axios from 'axios';


const GivefeedbackScreen = ({route}) => {

  const [feedback,setfeedback] = useState('');
  const [taker,setTaker] = useState(null); 
  const [giver,setGiver] = useState(null); 
  const [count,setCount] = useState(null);

  const navigation = useNavigation();



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
                } else {
                   
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
              apiresponse =  await axios.get("http://192.168.218.163:8080/api/v1/feedback/count",{
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
       if (!feedback) {
         Alert.alert("Please write feedback");
         return;
       }

       if (count === null) {
        // If count is null, set it to 1 as the initial feedback ID
        setCount(1);
      }

       payload = {
         feedbackid:count,
         feedback:feedback,
         giver:giver,
         taker:taker,
       };
       apiresponse = await axios.post("http://192.168.218.163:8080/api/v1/feedback/create",payload,{
        headers:{
          "Content-Type":'application/json'
        }
      })
        alert(apiresponse.data.message);
        navigation.navigate("ProfilePublicScreen",{ username: taker }); 
    }
    catch (error) {
      if(error.response.status === 400){
        alert(error.response.data.message);
        try{ 
         apiresponse =  await axios.get("http://192.168.218.163:8080/api/v1/feedback/count",{
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
     }
    }
  };

  return (
    <View style={styles.maincontainer}>
      <Text style={{fontSize:24,fontWeight:"500",marginTop:30,color:"#575757"}}>Feedback</Text>
        <TextInput
                style={styles.input}
                placeholder="Give your feedback"
                multiline={true}
                value={feedback}
                onChangeText={(text) => setfeedback(text)}
                // placeholderTextColor="blue"
                // textAlignVertical="top"  // either place this here or in stylesheet

            />      


<TouchableOpacity style={styles.tbutton} onPress = {handleSubmit}>
            <Text style={styles.tbuttontext}>Submit</Text>
          </TouchableOpacity>
          
      
    </View>
  )
}

export default GivefeedbackScreen

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