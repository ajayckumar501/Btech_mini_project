import { View, Text, StyleSheet,Image,TextInput,TouchableOpacity } from "react-native";
import React, {useState,useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
let apiresponse,user;
const Login = ({ route }) => {

  const navigation = useNavigation();

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async() =>{
    try {
      setLoading(true);
      if (!username || !password) {
        alert("Please Fill All Fields");
        setLoading(false);
        return;
      }

      const payload={
        username:username,
        password:password
      }
      setLoading(false);
      apiresponse =  await axios.post("http://192.168.218.163:8080/api/v1/auth/login", payload,{
        headers:{
          "Content-Type":'application/json'
        }
      })
      .then((response) => {
      
      AsyncStorage.setItem("@userData", JSON.stringify(response.data.user));

      if (response.data.isAdmin) {
        navigation.navigate("AdminScreen"); 
      } 

      if(response.data.user.usertype === "both")
      {
         navigation.navigate("SelectroleinBoth");
      } 
      else if(response.data.user.usertype ==="donor")
      {
         navigation.navigate("Serviceorganizerreceiver",{usertype:"Donor"});
      }
      else if(response.data.user.usertype === "receiver")
      {
        navigation.navigate("Serviceorganizerreceiver",{usertype:"Receiver"});
      }
    })  
      .catch((error) =>{
        if(error.response.data){
          alert(error.response.data.message);
          setLoading(false);
       }      
      });  
    }
    catch(error) {
      if(error.response){
         alert(error.response);
         setLoading(false);
      }
    }
  };
  
  return (
    <View style={styles.container}>

        <Image source={require("../assets/danasetulogogreenbackground.png")} style={styles.image} />

        <View style={styles.basebox}>
            <View style={{ alignItems: "center", marginTop: "8%" }}>

                <Text style={styles.loginheading}>Login to your account</Text>
                <TextInput style={styles.input}
                    placeholder="Username"
                    //   inputTitle={"username"}
                    value={username}
                    //setValue={setusername}
                    onChangeText={(text) => setusername(text)}
                />
                <TextInput style={styles.input}
                    placeholder="Password"

                    //   inputTitle={"Password"}
                    secureTextEntry={true}
                    autoComplete="password"
                    value={password}
                    //setValue={setPassword}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

                <TouchableOpacity onPress = {handleSubmit} style={styles.tbutton} loading={loading}>
                    <Text style={styles.tbuttontext}>Login</Text>
                </TouchableOpacity>


                <Text style={{ marginTop: "15%", fontSize: 17, fontWeight: "400" }}>Don't have an account ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#02BF9D" }}>Sign up</Text>
                </TouchableOpacity>

            </View>
        </View>
    );

};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#02BF9D',
      // justifyContent: "center", // due to this image wasnt coming
      alignItems: 'center',
  },

  basebox: {
      borderTopLeftRadius: 44,
      borderTopRightRadius: 44,
      // marginTop: "84%",
      bottom: 0,
      position: "absolute",
      height: 560,
      width: "100%",
      backgroundColor: "#FFFFFF",
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
    marginTop: "8%",
    backgroundColor: "#E6FBF7",
    borderRadius: 8,
    padding: 10,
},

tbutton: {
    marginTop: "15%",
    width: 216,
    height: 51,
    backgroundColor: "#02BF9D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 61,
},

tbuttontext: {
    color: "white",
    fontWeight: "900"
},

image: {
    width: 160,
    height: 52,
    marginTop: "25%",
},


});



export default Login;
export {user};