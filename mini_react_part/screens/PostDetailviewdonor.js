import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import {React,useState,useEffect} from 'react';
import NavBarbottom from '../components/NavBarbottom';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
let userData,apiresp,data;
const PostDetailviewdonor = ({route}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [receiver, setReceiver] = useState('');
    const [donor, setDonor] = useState('');
    const [postid, setPostid] = useState('');
    const [count,setCount] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        const posttitle  = route.params.post_title;
        setTitle(posttitle);
        const desc = route.params.post_desc;
        setContent(desc);
        const receiver = route.params.receiver;
        setReceiver(receiver);
        const postid = route.params.postid;
        setPostid(postid);
     }, [route.params]);

    const displaytitle = () => {
        return title;
    };

    const displayreceiver = () => {
        return receiver;
    };

    const displaycontent = () => {
        return content;
    };


    useEffect(() => {
        const fetchData = async () => {
            try {

                const Data = await AsyncStorage.getItem("@userData");
                if(Data){
                    data = JSON.parse(Data);
                    const donor = data.username;
                    console.log("mail is "+data.email);
                    setDonor(donor);
                }

                apiresp = await axios.get("https://danasetu-backend.onrender.com/api/v1/commitment/count", {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setCount(apiresp.data.count);
            } catch (error) {
                console.error("Error fetching count:", error);
            }
        };

        if (!count) {
            fetchData();
        }
    }, [count]);

    const deleteUserPost = async(postid) => {
        try{
            apiresponse =  await axios.delete("https://danasetu-backend.onrender.com/api/v1/postdesc/delete", {
               headers:{
                "Content-Type":'application/json'
              },
              params:{
                postid:postid
              }
            })
        }
        catch(error)
        {
            if(error.response)
            {
                console.log(error.response.data.message);
            }
            else{
                console.log('Error:', error);
            }
        }
        
    };

    const handlePress = async () => {
        try {

            if (count === null) {
                // Count is not available yet, wait for it
                console.log("Count is not available yet.");
                return;
            }
            const receiver = route.params.receiver;

                const resp = await axios.get("https://danasetu-backend.onrender.com/api/v1/auth/fetchUser", {
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    params:{
                        username:receiver
                    }
                });

                userData = resp.data.user;

               if(userData){
                  const email2 = userData.email;  
            

                const payload = {
                     user1: donor,
                     email: data.email,
                     receiverdata:userData,
                     commitmentid: apiresp.data.count,
                     postid: route.params.postid,
                     posttitle:route.params.post_title,
                };
                

            const createResponse = await axios.post("https://danasetu-backend.onrender.com/api/v1/commitment/create", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setIsButtonDisabled(true);
            deleteUserPost(route.params.postid);

            // Alert and log the response message from the second API call
            alert(createResponse.data.message);
            console.log(createResponse.data.message);
        }
        } catch (error) {
            // Handle errors
            if (error.response) {
                alert(error.response.data.message);
                console.log(error.response.data.message);
            } else {
                alert("An error occurred while processing your request.");
                console.log(error);
            }
        }
    };


    // const handlePress = async() => {
    //     try{

    //         apiresp = await axios.get("https://danasetu-backend.onrender.com/api/v1/commitment/count",{
    //             headers:{
    //                     "Content-Type":'application/json'
    //             }
    //         });

    //         if(apiresp){  
    //             console.log(apiresp.data.count);
    //             setCount(apiresp.data.count);
    //         }

    //         const Data = await AsyncStorage.getItem("@userData");
    //         //const dataa = JSON.parse(Data);
    //         const data = JSON.parse(Data);
    //         const username = data.username;
    //         const payload = {
    //             user1:username,
    //             user2:user,
    //             commitmentid:count,
    //             postid:postid,

    //         }

    //         apiresponse =  await axios.post("https://danasetu-backend.onrender.com/api/v1/commitment/create", payload,{
    //         headers:{
    //           "Content-Type":'application/json'
    //     }
    //   })
    //   alert(apiresponse.data.message);
    //   console.log(apiresponse.data.message);

    //     }
    //     catch (error) {
    //         alert(error.response.data.message);
    //         console.log(error.response);
    //     }
    // };

    const handleProfilePress = () => {
        navigation.navigate("ProfilePublicScreen",{ username: displayreceiver() });
    }

    const navigation = useNavigation();

    return (

        <View style={styles.maincontainer}>
            <View style={styles.scrollcontainer}>
                {/* <Text>PostDetailviewdonor</Text> */}

                <View style={{ paddingHorizontal: 25, paddingTop:"10%" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Pressable onPress = {handleProfilePress}>
                           <Image source={require("../assets/usericongreyback.png")} style={styles.usericongrey} />
                           </Pressable>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>{displayreceiver()}</Text>
                        </View>
                    </View>

                    
                </View>

            </View>


                    <ScrollView style={styles.maincontentbox}>
                        <Text style={{ fontSize: 25, fontWeight: "600",/*padding:20,backgroundColor:"violet"*/ }}>{displaytitle()}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "400", color: "#575757", marginTop: 15, marginBottom:500 }}>{displaycontent()}</Text>
                    </ScrollView>

            
                    <View style={styles.connectbox}>
                    <Pressable style={[styles.tbutton, isButtonDisabled && { backgroundColor: 'grey' }]} onPress={handlePress} disabled={isButtonDisabled}>
                    <Text style={styles.tbuttontext}>{isButtonDisabled ? 'Connected' : 'Connect'}</Text>
                    </Pressable>
                    </View>
            

            <NavBarbottom/>
        </View>


    )
}

export default PostDetailviewdonor

const styles = StyleSheet.create({

    maincontainer:{
        flex:1
    },

    scrollcontainer: {
        backgroundColor:"white",
        flexGrow: 1,
        paddingHorizontal: 5,
        padding:"5%",
        paddingBottom:0,

    },

    usericongrey: {
        height: 38,
        width: 38,
        marginRight: 15,
    },

    maincontentbox: {
        // marginTop: 15,
        backgroundColor: "#F8FEFD",
        paddingHorizontal: 25,
        paddingTop:"-5%"
    },

    connectbox: {
        // height: 53,
        padding:"5%",
        width: "100%",
        backgroundColor: "#DDEEEB",
        // backgroundColor: "red",
        position: "absolute",
        bottom: 60,
        justifyContent: "center",
        alignItems: "center",
    },

    tbutton: {
        width: 216,
        height: 51,
        backgroundColor: "#02BF9D",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 61,
        zIndex: 5,
    },

    tbuttontext: {
        color: "white",
        fontWeight: "900"
    },

    // maincontainer:{
    //     backgroundColor:"green",
    //     paddingBottom:100,
    // }




})