import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import {React,useState,useEffect} from 'react';
import NavBarbottom from '../components/NavBarbottom';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
let userData,apiresp,data;
const ComplaintDetailView = ({route}) => {

    const [complaint, setcomplaint] = useState('');
    const [taker, settaker] = useState('');
    const [giver, setgiver] = useState('');
    const [count,setCount] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        const taker = route.params.taker;
        settaker(taker);
        const giver = route.params.giver;
        setgiver(giver);
        const complaint = route.params.complaint;
        setcomplaint(complaint);
     }, [route.params]);

    const displaygiver = () => {
        return giver;
    };

    const displaytaker = () => {
        return taker;
    };

    const displaycomplaint = () => {
        return complaint;
    };

    const handleProfilePress = () => {
        navigation.navigate("ProfilePublicScreen",{ username: displaytaker() });
    }

    const navigation = useNavigation();

    return (

        <View style={styles.maincontainer}>
            <View style={styles.scrollcontainer}>
                {/* <Text>ComplaintDetailView</Text> */}

                <View style={{ paddingHorizontal: 25, paddingTop:"10%" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Pressable onPress = {handleProfilePress}>
                           <Image source={require("../assets/usericongreyback.png")} style={styles.usericongrey} />
                           </Pressable>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>{displaytaker()}</Text>
                        </View>
                    </View>

                    
                </View>

            </View>


                    <ScrollView style={styles.maincomplaintbox}>
                        <Text style={{ fontSize: 20, fontWeight: "800", color: "#575757", marginTop: 15, marginBottom:0, marginLeft:"0%" }}>{displaygiver()} : </Text>
                        <Text style={{ fontSize: 16, fontWeight: "400", color: "#575757", marginTop: 0, marginBottom:500, marginLeft:"5%" }}>{displaycomplaint()}</Text>
                    </ScrollView>
        </View>


    )
}

export default ComplaintDetailView

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

    maincomplaintbox: {
        // marginTop: 15,
        backgroundColor: "#F8FEFD",
        paddingHorizontal: 25,
        paddingTop:"5%",
        marginTop:"2%"
    },

    connectbox: {
        // height: 53,
        padding:"5%",
        width: "100%",
        backgroundColor: "#DDEEEB",
        // backgroundColor: "red",
        position: "absolute",
        bottom: 60,
        justifycomplaint: "center",
        alignItems: "center",
    },

    tbutton: {
        width: 216,
        height: 51,
        backgroundColor: "#02BF9D",
        justifycomplaint: "center",
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