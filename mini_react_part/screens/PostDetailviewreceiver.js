import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import {React,useEffect,useState} from 'react';
import NavBarbottom from '../components/NavBarbottom';

const PostDetailviewreciever = ({route}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const posttitle  = route.params.post_title;
        setTitle(posttitle);
        const desc = route.params.post_desc;
        setContent(desc);
        const user = route.params.username;
        setUsername(user);
     }, [route.params]);

    const displaytitle = () => {
        return title;
    };

    const displayuser = () => {
        return username;
    };

    const displaycontent = () => {
        return content;
    };

    return (

        <View style={styles.maincontainer}>
            <View style={styles.scrollcontainer}>

                <View style={{ paddingHorizontal: 25 }}>
                    <View style={{ flexDirection: "row", alignItems: "center",/*backgroundColor:"green"*/ }}>
                        <Image source={require("../assets/usericongreyback.png")} style={styles.usericongrey} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>{displayuser()}</Text>
                            {/* <Text style={{ fontSize: 10, fontWeight: "400" }}>9 days ago</Text> */}
                        </View>

                        <View style={{/*backgroundColor:"red",*/flexDirection: "row", marginLeft: 80, }}>
                            <Image source={require("../assets/editpost.png")} style={{ height: 22, width: 22, marginRight: 25, marginLeft : 40 }} />
                            <Image source={require("../assets/deletepost.png")} style={{ height: 25, width: 25 }} />
                        </View>

                    </View>


                    <ScrollView style={styles.maincontentbox}>
                        <Text style={{ fontSize: 36, fontWeight: "800",/*padding:20,backgroundColor:"violet"*/ }}>{displaytitle()}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "400", color: "#575757", marginTop: 15, marginBottom:500  }}>{displaycontent()}</Text>
                    </ScrollView>
                </View>


                {/* earlier the connect box was placed here */}


            </View>

            {/* <View style={styles.connectbox}>
                <Pressable style={styles.tbutton} >
                    <Text style={styles.tbuttontext}>Published</Text>
                </Pressable>
            </View> */}
            <NavBarbottom />
        </View>


    )
}

export default PostDetailviewreciever;

const styles = StyleSheet.create({

    maincontainer:{
        flex:1
    },

    scrollcontainer: {
        // flex:1,
        paddingTop: 65, // may be need to remove later if not scrolling or may be changed to padding top
        // paddingHorizontal: 25,
        // backgroundColor:"red",
        paddingLeft:0,


    },

    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
      },

    usericongrey: {
        height: 53,
        width: 53,
        marginRight: 15,
    },

    maincontentbox: {
        padding:3,
        marginTop: 55,
        backgroundColor: "#F8FEFD",
        marginLeft:0,
    },

    connectbox: {
        height: 93,
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

});