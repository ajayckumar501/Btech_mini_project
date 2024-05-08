import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import {React,useState,useEffect} from 'react';
import NavBarbottom from '../components/NavBarbottom';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
let apiresponse,apiresp,username;
const PostDetailviewdonor = ({route}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUsername] = useState('');
    const [postid, setPostid] = useState('');
    const [count,setCount] = useState(0)

    useEffect(() => {
        const posttitle  = route.params.post_title;
        setTitle(posttitle);
        const desc = route.params.post_desc;
        setContent(desc);
        const user = route.params.username;
        setUsername(user);
        const postid = route.params.postid;
        setPostid(postid);
     }, [route.params]);

    const displaytitle = () => {
        return title;
    };

    const displayuser = () => {
        return user;
    };

    const displaycontent = () => {
        return content;
    };


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get("http://192.168.92.163:8080/api/v1/commitment/count", {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setCount(response.data.count);
            } catch (error) {
                console.error("Error fetching count:", error);
            }
        };

        fetchData();
    }, []);

    const handlePress = async () => {
        try {

            if (count === null) {
                // Count is not available yet, wait for it
                console.log("Count is not available yet.");
                return;
            }

            try {
                const user = displayuser();
                console.log(user);
                apiresponse = await axios.get("http://192.168.92.163:8080/api/v1/auth/fetchUser", { username:user }, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                
            } catch (error) {
                console.error("Error fetching receiver data:", error);
            }
            const email2 = apiresponse.data.user.email;

            const Data = await AsyncStorage.getItem("@userData");
            const data = JSON.parse(Data);
            username = data.username;
            

            const payload = {
                user1: username,
                email: data.email,
                receiveremail:email2,
                user2: user,
                commitmentid: count,
                postid: postid,
            };

            const createResponse = await axios.post("http://192.168.92.163:8080/api/v1/commitment/create", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Alert and log the response message from the second API call
            alert(createResponse.data.message);
            console.log(createResponse.data.message);
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

    //         apiresp = await axios.get("http://192.168.92.163:8080/api/v1/commitment/count",{
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

    //         apiresponse =  await axios.post("http://192.168.92.163:8080/api/v1/commitment/create", payload,{
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
        navigation.navigate("ProfilePublicScreen",{ username: displayuser() });
    }

    const navigation = useNavigation();

    return (

        <View style={styles.maincontainer}>
            <View style={styles.scrollcontainer}>
                {/* <Text>PostDetailviewdonor</Text> */}

                <View style={{ paddingHorizontal: 25 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Pressable onPress = {handleProfilePress}>
                           <Image source={require("../assets/usericongreyback.png")} style={styles.usericongrey} />
                           </Pressable>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>{displayuser()}</Text>
                        </View>
                    </View>

                    
                </View>

            </View>


                    <ScrollView style={styles.maincontentbox}>
                        <Text style={{ fontSize: 36, fontWeight: "800",/*padding:20,backgroundColor:"violet"*/ }}>{displaytitle()}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "400", color: "#575757", marginTop: 15, marginBottom:500 }}>{displaycontent()}</Text>
                    </ScrollView>

            
                    <View style={styles.connectbox}>
                         <Pressable style={styles.tbutton} onPress = {handlePress}>
                           <Text style={styles.tbuttontext}>Connect</Text>
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
        // flex:1,
        paddingTop: 65, // may be need to remove later if not scrolling or may be changed to padding top
        // paddingHorizontal: 25,
        // backgroundColor:"red",

        flexGrow: 1,
        paddingTop:65,
        paddingHorizontal: 5,


    },

    usericongrey: {
        height: 53,
        width: 53,
        marginRight: 15,
    },

    maincontentbox: {
        marginTop: 15,
        backgroundColor: "#F8FEFD",
        // backgroundColor:"red",
        padding: 20,
        paddingBottom:600,
        paddingTop:15,
        paddingHorizontal: 25,
    },

    connectbox: {
        height: 53,
        width: 360,
        backgroundColor: "#DDEEEB",
        // backgroundColor: "red",
        position: "absolute",
        bottom: 74,
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