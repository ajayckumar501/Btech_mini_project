import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, {useState, useContext } from "react";
import { AuthContext } from "..//context/authContext";
import InputBox from "../components/Forms/InputBox";
import SubmitButton from "../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Login = ({ navigation }) => {
  //global state
  //const [state, setState] = useContext(AuthContext);

  // states
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //function
  // btn funcn
  const handleSubmit = () =>{
    try {
      setLoading(true);
      if (!username || !password) {
        alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      axios.post("http://localhost:8080/api/v1/auth/login", {username, password},{
        headers:{
          "Content-Type":'application/json'
        }
      })
      .then(function(response){
         if (response.data && response.data.message)
         {
           alert(JSON.stringify(response.data.message));
         }
      //setLoginResponse(response.data);
         AsyncStorage.setItem("@auth", JSON.stringify(response));
         if(response.data.success)
         {
            navigation.navigate("SignupScreen2");
         }
         console.log("Login Data==> ", { username, password });
        })
        .catch(function(error){
          console.error("Error occured:",error);
        });
      }
      catch (error) {
        console.log("fuck");
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  //temp function to check local storage data
  const getLcoalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    //console.log("Local Storage ==> ", data);
  };
  getLcoalStorageData();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login to your account</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          inputTitle={"username"}
          value={username}
          setValue={setusername}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      {/* <Text>{JSON.stringify({ name, username, password }, null, 4)}</Text> */}
      <SubmitButton style = {styles.tbuttontext}
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Don't have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          Signup
        </Text>{" "}
      </Text>
    </View>
  );
};

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#02BF9D',
//       // justifyContent: "center", // due to this image wasnt coming
//       alignItems: 'center',
//     },
  
//     basebox: {
//       borderTopLeftRadius: 44,
//       borderTopRightRadius: 44,
//       // marginTop: "84%",
//       bottom: 0,
//       position: "absolute",
//       height: 560,
//       width: "100%",
//       backgroundColor: "#FFFFFF",
//       alignItems: "center",
//     },
  
//     loginheading: {
//       fontSize: 20,
//       // backgroundColor:"red",
//       marginTop: 30,
//       fontFamily: "sans-serif",
//       fontWeight: "bold",
//       color: "#575757",
//       marginBottom: "10%",
//     },
  
//     input: {
//       width: 282,
//       height: 48,
//       marginTop: "8%",
//       backgroundColor: "#E6FBF7",
//       borderRadius: 8,
//       padding: 10,
//     },
  
//     tbutton: {
//       marginTop: "15%",
//       width: 216,
//       height: 51,
//       backgroundColor: "#02BF9D",
//       justifyContent: "center",
//       alignItems: "center",
//       borderRadius: 61,
//     },
  
//     tbuttontext: {
//       color: "white",
//       fontWeight: "900"
//     },
  
//     image: {
//       width: 160,
//       height: 52,
//       marginTop: "25%",
//     },
// });
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  pageTitle: {
    fontSize: 20,
    marginTop: 30,
    alignItems: 'center',
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#575757",
    marginBottom: "10%",
    // fontWeight: "bold",
    textAlign: "center",
    // color: "#1e2225",
    // marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
  },
  linkText: {
    textAlign: "center",
  },
  tbuttontext: {
    color: "white",
    fontWeight: "900",
    backgroundColor:"#02bf9d",
  },
  link: {
    fontSize:25,
    color: "#02bf9d",
    fontFamily: "sans-serif",
    
  },
});

export default Login;