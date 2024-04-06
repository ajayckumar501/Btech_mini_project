import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'

import CommitedrecieverList from "../data/CommitedrecieverList.json"
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





    return (
        <View style={styles.container}>
            <SearchBar style={styles.SearchBartop} />
            {/* <Text>Serviceorganizerdonor</Text> */}

            {/* <FlatList data={data} renderItem={() => <View><View /></View>} /> */}

            <FlatList data={CommitedrecieverList.diffreceivers}
                renderItem={({ index, item }) =>

                    <View style={styles.serviceboxflat}>
                        <View style={styles.usericonandname}>
                            <Image source={require("../assets/usericon.png")} style={styles.image} />
                            <Text style={styles.recievernametxt}>{item.receivername}</Text>
                        </View>
                        <Image source={require("../assets/messageicon.png")} style={styles.image} />
                    </View>

                }

                contentContainerStyle={styles.flatstyle}
                showsVerticalScrollIndicator={false}
            />

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
        height: 68,
        backgroundColor: "#DDEEEB",
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 13,
        marginBottom: 15,
        flexDirection: "row",
    },

    flatstyle: {
        alignItems: 'center',
    },

    recievernametxt: {
        color: "#808080",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },

    image: {
        //   backgroundColor:"white",
        height: 30,
        width: 30,
    },

    usericonandname: {
        flexDirection: 'row',
        // backgroundColor:"red",
        marginLeft: -15,
    }

})