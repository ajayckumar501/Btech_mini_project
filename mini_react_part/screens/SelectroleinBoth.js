import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const SelectroleinBoth = () => {
    return (
        <View style={styles.maincontainer}>
            {/* <Text>SelectroleinBoth</Text> */}
            <View style={styles.mainbox}>
                <Text style={{ fontSize: 40, fontWeight: "bold", color: "#575757", marginTop: "8%" }}>Select role</Text>
                <View style={{marginTop:"12%"}}>
                    <Pressable style={styles.tbutton} >
                        <Text style={styles.tbuttontext}>Donor</Text>
                    </Pressable>

                    <Pressable style={styles.tbutton} >
                        <Text style={styles.tbuttontext}>Receiver</Text>
                    </Pressable>
                </View>

            </View>
        </View>
    )
}

export default SelectroleinBoth

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DDEEEB"
    },

    mainbox: {
        width: 307,
        height: 509,
        backgroundColor: "white",
        // justifyContent:"center",
        alignItems: "center",
        borderRadius:11,
    },


    tbutton: {
        width: 216,
        height: 60,
        backgroundColor: "#02BF9D",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 61,
        marginTop: "20%",


    },

    tbuttontext: {
        color: "white",
        fontWeight: "900"
    },

})