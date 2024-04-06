//  import { StatusBar } from 'expo-status-bar';
//  import { StyleSheet, Text, View } from 'react-native';
// //  import Homescreen from './screens/HomeScreen';
// //import LoginScreen from './screens/LoginScreen'
// import Login2 from './screens/Login2';
// //import SignupScreen from './screens/SignupScreen';
// //  import SignupScreen2 from './screens/SignupScreen2';
// //  import ServiceSelectbox from './components/ServiceSelectbox';
// //  import SearchBar from './components/SearchBar';
// //import Serviceorganizerdonor from './screens/Serviceorganizerdonor';
// //  import Serviceorganizerreceiver from './screens/Serviceorganizerreceiver';
// //  import Postorganizerdonor from './screens/Postorganizerdonor';
// //  import Postorganizerreceiver from './screens/Postorganizerreceiver';
//  //import Commitedrecievers from './screens/Commitedrecievers';
//  //import Imagetesting from './screens/Imagetesting';


// //  import PostDetailviewdonor from './screens/PostDetailviewdonor';
// //  import AdminScreen from './screens/AdminScreen';

// //  import PostDetailviewreciever from './screens/PostDetailviewreciever';
// //  import ProfileScreen from './screens/ProfileScreen';
// //  import NavBarbottom from './components/NavBarbottom';

// //  import WaitingfromAdmin from './screens/WaitingfromAdmin';
// //  import SelectServicelist from './components/SelectServicelist';

// //  import SelectroleinBoth from './screens/SelectroleinBoth';
// export default function App() {
//   return (
//     <View style={styles.container}>
//       {/* <Homescreen />   */}
//       <Login2 />
//       {/* <LoginScreen /> */}
//       {/* <SignupScreen/> */}
//       {/* <Text>Helo</Text>
      
//       <SignupScreen2/>

//       <SelectServicelist/>

//       <ServiceSelectbox/> 
//       <SearchBar/> 
//       <Imagetesting/> 
//       <StickyComponent/> 
//       <SearchBar/> */}
//       {/* <Serviceorganizerdonor/> */}
//       {/*<Serviceorganizerreceiver/> 
//       <Postorganizerdonor/> 
//       <Postorganizerreceiver/>  */}
//       {/* <Commitedrecievers/> */}
//       {/* <PostDetailviewdonor/> 

//       <AdminScreen/>  */}
//       {/* <PostDetailviewreciever/> */}

//       {/* <ProfileScreen/> 
//       <NavBarbottom/> 

//       <WaitingfromAdmin/> 
//       <SelectroleinBoth/> */}
//     </View>
//   );
// }

//  const styles = StyleSheet.create({
//  container: {
//  flex: 1,
//  backgroundColor: '#fff',
//  //alignItems: 'center',
//  //justifyContent: 'center',
//  },
// });

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation'; // Assuming navigation.js is in the same folder

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
