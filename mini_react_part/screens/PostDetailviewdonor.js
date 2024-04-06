import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import NavBarbottom from '../components/NavBarbottom'
const PostDetailviewdonor = () => {
    return (

        <View style={styles.maincontainer}>
            <ScrollView style={styles.scrollcontainer}>
                {/* <Text>PostDetailviewdonor</Text> */}

                <View style={{ paddingHorizontal: 25 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={require("../assets/usericongreyback.png")} style={styles.usericongrey} />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>Username</Text>
                            <Text style={{ fontSize: 10, fontWeight: "400" }}>9 days ago</Text>
                        </View>
                    </View>


                    <View style={styles.maincontentbox}>
                        <Text style={{ fontSize: 36, fontWeight: "800",/*padding:20,backgroundColor:"violet"*/ }}>Post heading 1</Text>
                        <Text style={{ fontSize: 16, fontWeight: "400", color: "#575757", marginTop: 15, }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet risus feugiat in ante metus dictum at tempor commodo. Risus in hendrerit gravida rutrum quisque non tellus orci. At tempor commodo ullamcorper a lacus vestibulum sed arcu non. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Eget sit amet tellus cras. In ante metus dictum at tempor commodo ullamcorper a. Lorem donec massa sapien faucibus et. Bibendum at varius vel pharetra vel. Lectus proin nibh nisl condimentum id. A cras semper auctor neque vitae tempus quam. Donec et odio pellentesque diam. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis.

                            Tincidunt lobortis feugiat vivamus at. Et ultrices neque ornare aenean euismod elementum nisi. Vulputate mi sit amet mauris commodo quis imperdiet massa. Tristique senectus et netus et malesuada fames. Sapien eget mi proin sed. Id diam vel quam elementum. Ac turpis egestas maecenas pharetra convallis. Curabitur gravida arcu ac tortor dignissim convallis aenean et. Sollicitudin nibh sit amet commodo nulla facilisi. Pharetra magna ac placerat vestibulum. Aliquam vestibulum morbi blandit cursus risus. Quam pellentesque nec nam aliquam sem et tortor. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Ac placerat vestibulum lectus mauris ultrices. Dictum non consectetur a erat nam at lectus urna duis. Venenatis cras sed felis eget velit aliquet. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Viverra vitae congue eu consequat ac felis donec et odio. Tellus in hac habitasse platea dictumst vestibulum. Amet dictum sit amet justo donec enim.

                            Vitae auctor eu augue ut lectus arcu bibendum. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. In cursus turpis massa tincidunt dui ut. Auctor augue mauris augue neque gravida in fermentum et sollicitudin. Ut pharetra sit amet aliquam id diam maecenas. Eu facilisis sed odio morbi quis commodo odio. Tempor commodo ullamcorper a lacus vestibulum. Nulla pellentesque dignissim enim sit. Nunc pulvinar sapien et ligula ullamcorper. Convallis aenean et tortor at risus viverra. Aenean et tortor at risus viverra adipiscing. In dictum non consectetur a. Sollicitudin tempor id eu nisl nunc mi. Arcu ac tortor dignissim convallis aenean et tortor.

                            Integer vitae justo eget magna fermentum iaculis. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Diam quis enim lobortis scelerisque. Aliquet eget sit amet tellus cras adipiscing enim eu. Maecenas sed enim ut sem viverra aliquet eget sit amet. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Morbi quis commodo odio aenean sed adipiscing diam. Suspendisse in est ante in nibh mauris cursus mattis. Nibh praesent tristique magna sit amet purus. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Posuere morbi leo urna molestie at. Sit amet venenatis urna cursus. Ac odio tempor orci dapibus ultrices in iaculis nunc. Bibendum at varius vel pharetra vel turpis nunc eget. Sed felis eget velit aliquet sagittis id consectetur. Maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus.

                            Rhoncus urna neque viverra justo. Sollicitudin nibh sit amet commodo nulla facilisi. Eget arcu dictum varius duis at consectetur. Aliquet nec ullamcorper sit amet risus nullam eget felis. Eget sit amet tellus cras adipiscing. Commodo viverra maecenas accumsan lacus vel facilisis. Turpis massa sed elementum tempus egestas sed sed. Enim diam vulputate ut pharetra. Aliquet nec ullamcorper sit amet risus nullam. Augue mauris augue neque gravida. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Sed libero enim sed faucibus turpis. Pellentesque sit amet porttitor eget dolor morbi non arcu. Duis at consectetur lorem donec massa sapien faucibus et molestie. Luctus accumsan tortor posuere ac ut. Cras pulvinar mattis nunc sed blandit libero.

                            Vestibulum sed arcu non odio euismod. Et malesuada fames ac turpis egestas integer eget. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Purus sit amet luctus venenatis lectus magna fringilla urna. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Sit amet porttitor eget dolor morbi non. Scelerisque fermentum dui faucibus in ornare quam. Ac tincidunt vitae semper quis. Massa massa ultricies mi quis hendrerit. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Facilisis gravida neque convallis a.

                            Eu augue ut lectus arcu bibendum at varius. Vel fringilla est ullamcorper eget nulla facilisi etiam. Ultricies tristique nulla aliquet enim tortor at auctor urna. A diam maecenas sed enim. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Sit amet dictum sit amet justo donec enim diam vulputate. Molestie ac feugiat sed lectus vestibulum. Mollis aliquam ut porttitor leo a. Pellentesque sit amet porttitor eget. Nibh sed pulvinar proin gravida hendrerit lectus. Cras ornare arcu dui vivamus arcu. Amet tellus cras adipiscing enim. Nunc eget lorem dolor sed viverra. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Ut eu sem integer vitae.

                            Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Mauris vitae ultricies leo integer. A lacus vestibulum sed arcu non odio euismod lacinia. Fames ac turpis egestas sed tempus. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Aliquet bibendum enim facilisis gravida neque convallis. Iaculis nunc sed augue lacus viverra vitae congue. Et odio pellentesque diam volutpat commodo sed egestas. Lectus nulla at volutpat diam ut venenatis. Risus ultricies tristique nulla aliquet. Quis viverra nibh cras pulvinar mattis nunc sed. </Text>

                    </View>
                </View>


                {/* earlier the connect box was placed here */}


            </ScrollView>

            
            <View style={styles.connectbox}>
                <Pressable style={styles.tbutton} >
                    <Text style={styles.tbuttontext}>Connect</Text>
                </Pressable>
            </View>

            <NavBarbottom/>
        </View>


    )
}

export default PostDetailviewdonor

const styles = StyleSheet.create({

    scrollcontainer: {
        // flex:1,
        paddingTop: 65, // may be need to remove later if not scrolling or may be changed to padding top
        // paddingHorizontal: 25,
        // backgroundColor:"red",


    },

    usericongrey: {
        height: 53,
        width: 53,
        marginRight: 15,
    },

    maincontentbox: {
        marginTop: 15,
        backgroundColor: "#F8FEFD",
        // backgroundColor:"red",
        padding: 10,
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

    // maincontainer:{
    //     backgroundColor:"green",
    //     paddingBottom:100,
    // }




})