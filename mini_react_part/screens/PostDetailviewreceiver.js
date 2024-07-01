import { StyleSheet, Text, View, ScrollView, Image, Pressable,Alert } from 'react-native';
import {React,useEffect,useState} from 'react';
import NavBarbottom from '../components/NavBarbottom';
let apiresponse;

const PostDetailviewreciever = ({route}) => {

    const [title, setTitle] = useState('');
    const [postid, setPostid] = useState('');
    const [content, setContent] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const posttitle  = route.params.post_title;
        setTitle(posttitle);
        const postid  = route.params.postid;
        setPostid(postid);
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

    const displayid = () => {
        return postid;
    };


    const displaycontent = () => {
        return content;
    };

    const deleteUserPost = async(pid) => {
        try{
            apiresponse =  await axios.delete("http://192.168.218.163:8080/api/v1/postdesc/delete", {
               headers:{
                "Content-Type":'application/json'
              },
              params:{
                postid:pid
              }
            })
            alert(apiresponse.data.message);
        }
        catch(error)
        {
            if(error.response)
            {
                alert(error.response.data.message);
            }
        }
        
    };

    
    const confirmDelete = (pid) => {
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
                    onPress: () => deleteUserPost(pid)
                }
            ]
        );
    };

    return (

        <View style={styles.maincontainer}>
            <View style={styles.scrollcontainer}>

            <View style={{ paddingHorizontal: 25,width:"100%",marginTop:"15%" }}>
                    <View style={{ flexDirection: "row", alignItems: "center",/*backgroundColor:"green"*/ }}>
                        <Image source={require("../assets/usericongreyback.png")} style={styles.usericongrey} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>{displayuser()}</Text>
                        </View>

                        <View style={{/*backgroundColor:"red",*/flexDirection: "row", marginLeft: 80, }}>
                            <Image source={require("../assets/editpost.png")} style={{ height: 22, width: 22, marginRight: 25, marginLeft : 40 }} />
                            <Pressable onPress={()=>confirmDelete(postid)}>
                                <Image source={require("../assets/deletepost.png")} style={{ height: 25, width: 25 }} />
                            </Pressable>
                        </View>

                    </View>
                </View>


                    <ScrollView style={styles.maincontentbox}>
                        <Text style={{ fontSize: 25, fontWeight: "600",/*padding:20,backgroundColor:"violet"*/ }}>{displaytitle()}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "400", color: "#575757", marginTop: 15, marginBottom:500  }}>{displaycontent()}</Text>
                    </ScrollView>
            </View>
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
        backgroundColor:"white",
        // backgroundColor:"magenta",
        flexGrow: 1,
        padding:"2%",
        paddingBottom:0,
        alignItems:"center"

    },

    usericongrey: {
        height: 38,
        width: 38,
        marginRight: 15,
    },

    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: "10%",
        backgroundColor:"red",
        marginTop:"8%",
      },



      maincontentbox: {
        marginTop: "5%",
        backgroundColor: "#F8FEFD",
        width:"90%",
        paddingTop:"5%",

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