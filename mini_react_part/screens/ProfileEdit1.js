import { View, Text, StyleSheet, TextInput, Alert,ScrollView,Image,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
let apiresponse,payload;
const ProfileEdit1 = ({ navigation }) => {
  // states
  //const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confpasswd, setConfpasswd] = useState("");
  const [loading, setLoading] = useState(false);
  //function
  // btn funcn
  const handleSubmit = async() => {
    try {
      
      const userData = await AsyncStorage.getItem("@userData");
      const userdata = JSON.parse(userData);
      console.log(userdata.username);
      setLoading(true);
      if (!email || !phoneno|| !location|| !password|| !confpasswd) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      payload={
        username:userdata.username,
        email:email,
        phone:phoneno,
        location:location,
        password:password,
        confirmpassword:confpasswd
      }
      setLoading(false);
      apiresponse = axios.post("http://192.168.92.163:8080/api/v1/auth/Profile_edit1",payload,{
        headers:{
          "Content-Type":'application/json'
        }
      })
      .then((response) => {
        alert(response.data.message);
        navigation.navigate("ProfileEdit2");
        console.log("Register Data==> ", { email,phoneno,location,password,confpasswd, });
      })
      .catch((error) =>{
        console.error(error);
      });

    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error.response.data.message);
    }
  };
  return (
  
  <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

<View style={styles.imagebox}>
        <Image source={require("../assets/editprofilelogo.jpg")} style={styles.image} />
      </View>

      <View style={styles.basebox}>
      <View style={{ marginHorizontal: 20,marginTop:50 }}>
        {/* <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
        /> */}
        <TextInput
          style={styles.input}
          inputMode="email"
          autoComplete="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"

        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          inputMode="tel"
          autoComplete="tel"
          value={phoneno}
          onChangeText={(text) => setPhoneno(text)}
        />
        <TextInput
          style={styles.input}

          placeholder="Location"
          autoComplete="address-line1"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <TextInput
          style={styles.input}

          placeholder="Password"
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}

          placeholder="Confirm password"
          secureTextEntry={true}
          value={confpasswd}
          onChangeText={(text) => setConfpasswd(text)}
        />
      </View>
      <TouchableOpacity onPress = {handleSubmit} style={styles.tbutton}  loading={loading}>
          <Text style={styles.tbuttontext}>next</Text>
        </TouchableOpacity>

      {/* <Text style={styles.linkText}>
        ALready registered Please{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("LoginScreen")}>
          LOGIN
        </Text>{" "}
      </Text> */}

      
      </View>
      </ScrollView>





  );


};



const styles = StyleSheet.create({


  scrollViewContent: {  // this is used in case of scroll view one error occured ("ERROR  Invariant Violation: ScrollView child layout (["alignItems"]) must be applied through the contentContainerStyle prop.")
    alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20,
    backgroundColor: '#02BF9D',
  },

  basebox: {
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    marginTop: "10.%",
    height: "84%",

    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    alignItems: "center",

  },

  loginheading: {
    fontSize: 20,
    // backgroundColor:"red",
    marginTop: 30,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#575757",
    marginBottom: "10%",
  },

  input: {
    width: 282,
    height: 48,
    marginTop: "3%",
    backgroundColor: "#E6FBF7",
    borderRadius: 8,
    padding: 10,

  },

  tbutton: {
    marginTop: "15%",
    width: 110,
    height: 44,
    backgroundColor: "#02BF9D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 61,
    marginLeft: "45%",
    paddingBottom: 6,

  },

  tbuttontext: {
    color: "white",
    fontWeight: "900"
  },
  tinyLogo: {
    width: 226,
    height: 54,
  },

  image: {
    width: 160,
    height: 52,


  },

  imagebox: {
    marginTop: 62,
    // backgroundColor:"red",
    padding: 10,

  }

});


export default ProfileEdit1;
export {payload};