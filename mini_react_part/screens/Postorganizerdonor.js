import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ViewBase, Pressable } from 'react-native';
import {React,useState,useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import NavBarbottom from '../components/NavBarbottom';
let apiresponse;
const Postorganizerreceiver = ({route}) => {

    const[serviceId, setServiceId] = useState(null);
    const [serviceName, setServiceName] = useState(null);
    const [posts, setPosts] = useState([]); // State to store fetched posts
  
    useEffect(() => {
      console.log(route.params);
      const var1 = route.params.serviceId;
      const var2 = route.params.serviceName;
      setServiceId(var1);
      setServiceName(var2);
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
              const payload = {
                  service_id:serviceId
              }
              console.log(payload);
            apiresponse = await axios.post("http://192.168.43.175:8080/api/v1/postdesc/fetch",payload,{
                params: {
                    service_id: serviceId, // Assuming serviceId has a value
                  },
           })// Replace with your API endpoint
          setPosts(apiresponse.data.posts); // Update state with fetched posts
          console.log(apiresponse.data.posts);
          } catch (error) {
            console.error("Error fetching posts:", error.message);
            // Handle errors (e.g., display an error message)
          }
        };
        if (serviceId) {
            fetchPosts();
        }
      }, [serviceId]);

    return (
        <View style={styles.container}>
            <SearchBar style={styles.SearchBartop} />

            <FlatList data={posts}
                renderItem={({ index, item }) =>


                    <View style={styles.serviceboxflat}>

                        <View style={styles.postinfoboxwithdelete}>
                            <View style={styles.postinfobox}>
                                <Pressable>
                                <Image source={require("../assets/usericon.png")} style={styles.image} />
                                </Pressable>
                                <Text style={styles.postheadingtext}>{item.post_title}</Text>
                            </View>

                            <View>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.paratext}>{truncateDescription(item.post_desc, 300)}</Text>
                        </View>

                    </View>
                }

                contentContainerStyle={styles.flatstyle}  // for styling flatlist we need to use like this
                showsVerticalScrollIndicator={false}

            />
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

    addpostimage: {
        height: 66,
        width: 66,
        bottom: "12%",
        left: 25,
        zIndex: 5,
        // backgroundColor:"red",


    }

});
