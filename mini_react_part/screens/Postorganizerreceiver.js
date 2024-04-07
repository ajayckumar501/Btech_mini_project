import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ViewBase, Pressable } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'

import PostList from "../data/PostList.json"
import NavBarbottom from '../components/NavBarbottom'
const Serviceorganizerdonor = () => {

    // const data=[
    //   {
    //     id:1,
    //     name:"service1",
    //     icon:"mini1\assets\community.png"
    //   },
    //   {
    //     id:2,
    //     name:"service2",
    //     icon:"mini1\assets\community.png"

    //   },
    //   {
    //     id:3,
    //     name:"service3",
    //     icon:"mini1\assets\community.png"
    //   },

    // ]



    // one dbt whether there is only one view big allowed inside flatlist 

    return (
        <View style={styles.container}>
            <SearchBar style={styles.SearchBartop} />

            <FlatList data={PostList.diffposts}
                renderItem={({ index, item }) =>


                    <View style={styles.serviceboxflat}>

                        <View style={styles.postinfoboxwithdelete}>
                            <View style={styles.postinfobox}>
                                <Pressable>
                                <Image source={require("../assets/usericon.png")} style={styles.image} />
                                </Pressable>
                                <Text style={styles.postheadingtext}>{item.postheading}</Text>
                            </View>

                            <View>
                                <Pressable>
                                    <Image source={require("../assets/Delete.png")} style={styles.deleteimage} />

                                </Pressable>

                            </View>
                        </View>



                        <View>
                            <Text style={styles.paratext}>{item.para}</Text>
                        </View>

                    </View>














                }

                contentContainerStyle={styles.flatstyle}  // for styling flatlist we need to use like this
                showsVerticalScrollIndicator={false}

            />




            <Pressable style={styles.addpostimage}>
                <Image source={require("../assets/addposticon.png")} />
            </Pressable>

            <NavBarbottom />


        </View>
    )
}

export default Serviceorganizerdonor

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

})