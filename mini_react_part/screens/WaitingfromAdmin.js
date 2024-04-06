import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const WaitingfromAdmin = () => {
    return (
        <View style={styles.maincontainer}>
            <View style={styles.box}>
                <Text style={styles.thistext}>Waiting for verification</Text>
                <Text style={styles.thistext}>from admin</Text>
                <Pressable style={styles.tbutton} >
                    <Text style={styles.tbuttontext}>Back</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default WaitingfromAdmin

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DDEEEB"
    },

    box: {
        width: 316,
        height: 204,
        backgroundColor: "white",
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center"

    },

    thistext: {
        fontSize: 20,
        fontWeight: 'bold',
        color:"#575757"
    },

    tbutton: {
        width: 94,
        height: 39,
        backgroundColor: "#02BF9D",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 61,
        marginTop:15,


    },

    tbuttontext: {
        color: "white",
        fontWeight: "900"
    },

})