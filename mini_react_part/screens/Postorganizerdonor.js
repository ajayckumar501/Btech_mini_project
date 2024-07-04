import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ViewBase, Pressable } from 'react-native';
import {React,useState,useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import NavBarbottom from '../components/NavBarbottom';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
let apiresponse;
const Postorganizerdonor = ({route}) => {

    const[serviceId, setServiceId] = useState(null);
    const [posts, setPosts] = useState([]); // State to store fetched posts
  
    useEffect(() => {
      const var1 = route.params.serviceId;
      setServiceId(var1);
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
            const Data = await AsyncStorage.getItem("@userData");
            //const dataa = JSON.parse(Data);
            const data = JSON.parse(Data);
            const username = data.username;

            apiresponse = await axios.get("http://192.168.218.163:8080/api/v1/postdesc/fetch",{
                params: {
                    serviceid: route.params.serviceId,
                    username:route.params.username
                  },
           })
          setPosts(apiresponse.data.posts); 
          } catch (error) {
            
          }
        };
        if (serviceId !==undefined) {
            fetchPosts();
        }
      }, [serviceId]);

      const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <SearchBar style={styles.SearchBartop} />

            <FlatList data={posts}
                renderItem={({ index, item }) =>

                    <Pressable onPress={() => navigation.navigate("PostDetailviewdonor", { post_title:item.post_title ,post_desc:item.post_desc , receiver:item.username , postid:item.postid, serviceId:route.params.serviceId })}>
                    <View style={styles.serviceboxflat}>

                        <View style={styles.postinfoboxwithdelete}>
                            <View style={styles.postinfobox}>
                                <Pressable>
                                <Image source={require("../assets/usericon.png")} style={styles.image} />
                                </Pressable>
                                <Text style={styles.postheadingtext}>{truncateDescription(item.post_title, 70)}</Text>
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
            <NavBarbottom />
        </View>
    )
}

export default Postorganizerdonor;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
        // backgroundColor:"blue",
        paddingTop:"5%",
        paddingBottom:"25%"
    },

    postheadingtext: {
        color: "black",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
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
        fontWeight: "300"
    },

    postinfoboxwithdelete: {
        flexDirection: "row",
        // backgroundColor:"red",
        justifyContent: "center",
    },

    deleteimage: {
        height: 25,
        width: 25,
    },

});