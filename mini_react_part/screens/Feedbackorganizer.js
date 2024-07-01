import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ViewBase, Pressable } from 'react-native';
import {React,useState,useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import NavBarbottom from '../components/NavBarbottom';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
let apiresponse;
const Feedbackorganizer = () => {

    const [feedback,setfeedback] = useState(null);

    useEffect(() => {
        // Fetch donor data from the backend
        fetchfeedbacks();
    }, []);

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + "...";
        } else {
            return description;
        }
    };

        const fetchfeedbacks = async () => {
          try {
            apiresponse = await axios.post("http://192.168.218.163:8080/api/v1/feedback/fetch");
            setfeedback(apiresponse.data);
          } catch (error) {
            
          }
        };
        

      const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <SearchBar style={styles.SearchBartop} />

            <FlatList data={feedback}
                renderItem={({ index, item }) =>

                    <Pressable onPress={() => navigation.navigate("FeedbackDetailView", { feedback:item.feedback , giver:item.giver , taker:item.taker })}>
                    <View style={styles.serviceboxflat}>

                        <View style={styles.feedbackinfoboxwithdelete}>
                            <View style={styles.feedbackinfobox}>
                                <Pressable onPress={() => navigation.navigate('ProfilePublicScreen',{username:item.taker})}>
                                <Image source={require("../assets/usericon.png")} style={styles.image} />
                                </Pressable>
                                <Text style={styles.feedbackheadingtext}>{item.taker}</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.paratext}>{item.giver} : {truncateDescription(item.feedback, 300)}</Text>
                        </View>

                    </View>
                    </Pressable>
                }

                contentContainerStyle={styles.flatstyle}  // for styling flatlist we need to use like this
                showsVerticalScrollIndicator={false}

            />
        </View>
    )
}

export default Feedbackorganizer;

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

    feedbackheadingtext: {
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

    feedbackinfobox: {
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

    feedbackinfoboxwithdelete: {
        flexDirection: "row",
        // backgroundColor:"red",
        justifyContent: "center",
    },

    deleteimage: {
        height: 25,
        width: 25,
    },

});
