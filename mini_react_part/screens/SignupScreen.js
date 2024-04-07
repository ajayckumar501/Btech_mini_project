import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../components/Forms/InputBox";
import SubmitButton from "../components/Forms/SubmitButton";
import axios from "axios";
const Register = ({ navigation }) => {
  // states
  const [username, setUsername] = useState("");
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
      setLoading(true);
      if (!username || !email || !phoneno|| !location|| !password|| !confpasswd) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      const payload={
        username:username,
        email:email,
        phone:phoneno,
        location:location,
        password:password,
        confirmpassword:confpasswd
      }
      setLoading(false);
      const response = await axios.post("http://localhost:8080/api/v1/auth/register",payload,{
        headers:{
          "Content-Type":'application/json'
        }
      })
      /*.then((response) => {
        console.log(data.message);
      })
      .catch((error) =>{
        console.error(error);
      });*/
      alert(response.data.message);
      if(response.data.success){
         navigation.navigate("LoginScreen");
      }
      console.log("Register Data==> ", { username,email,phoneno,location,password,confpasswd, });
      
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>

      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox 
          inputTitle={"Username"}
          value={username}
          setValue={setUsername}
        />
        <InputBox
          inputTitle={"Email"}
          inputMode="email"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Phone number"}
          inputMode="tel"
          autoComplete="tel"
          value={phoneno}
          setValue={setPhoneno}
        />
        <InputBox
          inputTitle={"Location"}
          autoComplete="address-line1"
          value={location}
          setValue={setLocation}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
        <InputBox
          inputTitle={"Confirm password"}
          secureTextEntry={true}
          value={confpasswd}
          setValue={setConfpasswd}
        />
      </View>
      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      <SubmitButton
        btnTitle="Register"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        ALready registered Please{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("LoginScreen")}>
          LOGIN
        </Text>{" "}
      </Text>
     </View>





  );
};


const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#02BF9D',
    //   justifyContent: "center",
    //   alignItems: 'center',
    // },
  
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



export default Register;
