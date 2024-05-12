import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useState,useEffect } from 'react';
import React from 'react'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
let userData,userdata,payload;
const PostCreate = ({route}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [count,setCount] = useState(0)
    const [serviceId, setServiceId] = useState(null);
    const navigation = useNavigation();
  
    useEffect(() => {
       let serviceid  = route.params.serviceId;
       setServiceId(serviceid);

    }, [route.params]);

    useEffect(() => {
        const getData = async () => {
                try{ 
                    const apiresponse =  await axios.get("http://192.168.43.175:8080/api/v1/postdesc/count",{
                    headers:{
                            "Content-Type":'application/json'
                    }
                    })
                                  if(apiresponse){  
                                        console.log(apiresponse.data.count);
                                        setCount(apiresponse.data.count);
                                  }
        }
        catch (error) {
            console.log('Error retrieving data:', error);
        }
    };
    if (!count) {
        getData();
    }
  }, [count]);

      const handlePublish = async() =>{
        try{  
                  userData = await AsyncStorage.getItem("@userData");
                  userdata = JSON.parse(userData);
                  payload = {
                     username: userdata.username,
                     id: count, 
                     serviceid: serviceId,
                     title: title,
                     desc: content,
                  };
            apiresponse = await axios.post("http://192.168.43.175:8080/api/v1/postdesc/create",payload,{
              headers:{
                "Content-Type":'application/json'
              }
            })
            console.log(apiresponse.data.message);
            alert(apiresponse.data.message);

            
          }
          catch (error) {
            if(error.response){
               alert(error.response.data.message);
               console.log(error.response.data.message);
            }
            else{
                alert(error);
                console.log(error);
             }
          }
    };


    return (
        <View style={styles.maincontainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <Text style={{ textAlign: "center", marginTop: "15%", fontSize: 24, fontWeight: "bold", marginBottom: "10%" }}>Create Post</Text>
                <View style={styles.box}>
                    <View style={{ width: "100%", alignItems: "center", marginBottom: "5%" }}>
                        <Text style={{ textAlign: "center", marginTop: "5%", fontSize: 16, fontWeight: "400", marginBottom: -15, }}>Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter the title of post"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>



                    {/* <View style={{ width: "100%", alignItems: "center", marginBottom: "5%" }}>
                        <Text style={{ textAlign: "center", marginTop: "5%", fontSize: 16, fontWeight: "400", marginBottom: 15, }}>Description</Text>
                        <TextInput
                            style={styles.biginput2}
                            placeholder="Write a small description of post"
                        />
                    </View> */}

                    <View style={{ width: "100%", alignItems: "center", marginBottom: "10%" }}>
                        <Text style={{ textAlign: "center", marginTop: "5%", fontSize: 16, fontWeight: "400",marginBottom:15 }}>Content</Text>
                        <TextInput
                            style={styles.biginput}
                            placeholder="Wrtie your post here....."
                            multiline={true}
                            value={content}
                            onChangeText={setContent}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.tbutton} onPress={handlePublish}>
                    <Text style={styles.tbuttontext}>Publish</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>

    )
}

export default PostCreate

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white"
    },

    scrollViewContent: {

        alignItems: "center",


    },

    box: {
        width: 345,
        backgroundColor: "#DDEEEB",
        borderRadius: 26,
    },
    input: {
        width: "90%",
        height: 48,
        marginTop: "8%",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 10,

    },

    biginput: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 10,
        minHeight: 300,
        textAlignVertical: 'top',

    },

    biginput2: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 10,
        minHeight: 100,
        textAlignVertical: 'top',

    },

    tbutton: {
        marginTop: "5%",
        marginBottom:"15%",
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

})