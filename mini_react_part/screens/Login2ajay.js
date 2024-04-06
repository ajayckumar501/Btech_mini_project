import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, StatusBar } from 'react-native';
import { AuthContext } from '../context/authContext'; // Assuming context is set up
import InputBox from '../components/Forms/InputBox';
import SubmitButton from '../components/Forms/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  // Utilize AuthContext for global state
  const [state, setState] = useContext(AuthContext);

  // Manage local state for login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle login submission
  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!email || !password) {
        Alert.alert('Please Fill All Fields');
        setLoading(false);
        return;
      }

      const { data } = await axios.post('/auth/login', { email, password });
      setState(data);
      await AsyncStorage.setItem('@auth', JSON.stringify(data));
      Alert.alert(data && data.message);
      navigation.navigate('Home');
      console.log('Login Data ==> ', { email, password });
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require('../assets/danasetulogogreenbackground.png')} style={styles.image} />
      <View style={styles.baseBox}>
        <Text style={styles.loginHeading}>Login to your account</Text>
        <View style={{ alignItems: 'center', marginTop: '8%' }}>
          <InputBox
            inputTitle="Email"
            inputMode="email"
            autoComplete="email"
            value={email}
            setValue={setEmail}
          />
          <InputBox
            inputTitle="Password"
            secureTextEntry={true}
            autoComplete="password"
            value={password}
            setValue={setPassword}
          />
          <SubmitButton btnTitle="Login" loading={loading} handleSubmit={handleSubmit} />

          <Text style={{ marginTop: '15%', fontSize: 17, fontWeight: '400' }}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#02BF9D' }}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// ... styles as defined in your first code snippet

export default LoginScreen;





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








})