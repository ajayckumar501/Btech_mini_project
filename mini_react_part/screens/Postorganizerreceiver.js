import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ViewBase, Pressable } from 'react-native';
import {React,useState,useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';
import NavBarbottom from '../components/NavBarbottom';
let apiresponse;
const Postorganizerreceiver = ({route}) => {

    const[serviceId, setServiceId] = useState(null);
    const [serviceName, setServiceName] = useState(null);
    const [posts, setPosts] = useState([]); // State to store fetched posts
    const [username,setUsername] = useState(null);
  
    useEffect(() => {
      console.log(route.params);
      const var1 = route.params.serviceId;
      const var2 = route.params.serviceName;
      const var3 = route.params.username;
      setServiceId(var1);
      setServiceName(var2);
      setUsername(var3);
    }, [route.params]);
      

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + "...";
        } else {
            return description;
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
          try {
              apiresponse = await axios.get("https://danasetu-backend.onrender.com/api/v1/postdesc/fetchreceiver",{
                params: {
                    serviceid: route.params.serviceId, 
                    username:route.params.username// Assuming serviceId has a value
                  },
           })// Replace with your API endpoint
          setPosts(apiresponse.data.posts); // Update state with fetched posts
          console.log(apiresponse.data.posts);
          } catch (error) {
            console.error("Error fetching posts:", error.message);
            // Handle errors (e.g., display an error message)
          }
        };
        if (serviceId!=undefined) {
            fetchPosts();
        }
      }, [serviceId]);


    const navigation = useNavigation();
    
    const navigateToPostCreate = () => {
       navigation.navigate('PostCreate',{serviceId:serviceId});
    }

    const deleteUserPost = async(postid) => {
        try{
            console.log(postid);
            console.log(typeof(postid));
            apiresponse =  await axios.delete("https://danasetu-backend.onrender.com/api/v1/postdesc/delete", {
               headers:{
                "Content-Type":'application/json'
              },
              params:{
                postid:postid
              }
            })
            alert(apiresponse.data.message);
        }
        catch(error)
        {
            if(error.response)
            {
                console.log(error.response.data.message);
                alert(error.response.data.message);
            }
            else{
                console.log('Error:', error);
            }
        }
        
    };

    
    const confirmDelete = (postid) => {
        Alert.alert(
            "Confirm Deletion",
            `Are you sure you want to delete this post?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => deleteUserPost(postid)
                }
            ]
        );
    };


    return (
        <View style={styles.container}>
            <SearchBar style={styles.SearchBartop} />

            <FlatList data={posts}
                renderItem={({ index, item }) =>
                <Pressable onPress={() => navigation.navigate("PostDetailviewreciever", { post_title:item.post_title ,post_desc:item.post_desc , username:item.username})}>
                     <View style={styles.serviceboxflat}>

                        <View style={styles.postinfoboxwithdelete}>
                            <View style={styles.postinfobox}>
                                <Pressable>
                                <Image source={require("../assets/usericon.png")} style={styles.image} />
                                </Pressable>
                                <Text style={styles.postheadingtext}>{item.post_title}</Text>
                            </View>

                            <View>
                                <Pressable onPress={()=>confirmDelete(item.postid)}>
                                    <Image source={require("../assets/Delete.png")} style={styles.deleteimage} />

                                </Pressable>

                            </View>
                        </View>



                        <View>
                            <Text style={styles.paratext}>{truncateDescription(item.post_desc, 300)}</Text>
                        </View>

                    </View>
                    </Pressable>
                }

                contentContainerStyle={styles.flatstyle}  // for styling flatlist we need to use like this
                showsVerticalScrollIndicator={false}

            />



            <Pressable onPress = {navigateToPostCreate} style={styles.addpostimage}>
                <Image source={require("../assets/addposticon.png")} />
            </Pressable>

            <NavBarbottom />


        </View>
    )
}

export default Postorganizerreceiver;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",

    },

    SearchBartop: {
        // zIndex:5,
        marginTop: "90%",
    },

    serviceboxflat: {
        width: 343,
        height: 170,
        backgroundColor: "#F5F5F5",
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 13,
        marginBottom: 15,
        flexDirection: "column",
        padding: 15,
    },

    flatstyle: {
        alignItems: 'center',
    },

    postheadingtext: {
        color: "black",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        width:"85%",
    },

    image: {

        backgroundColor: "white",
        height: 30,
        width: 30,
        borderRadius: 15,

    },

    postinfobox: {
        flexDirection: "row",
        // backgroundColor:"yellow",
        justifyContent: "flex-start",
        width: 280,
    },

    paratext: {
        height: 67,
        width: 271,
        // backgroundColor:"red",
        color: "#575757",
        fontWeight: "300",
        // paddingLeft : 5 ,
        // paddingRight:10,
        // paddingTop:10,
    },

    postinfoboxwithdelete: {
        flexDirection: "row",
        // backgroundColor:"red",
        justifyContent: "center",
    },

    deleteimage: {
        height: 25,
        width: 25,
        padding:2,
    },

    addpostimage: {
        height: 66,
        width: 66,
        bottom: "12%",
        left: 25,
        zIndex: 5,
        position:"absolute"


    }

});
