import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SignupScreen2 from './screens/SignupScreen2';
import PostCreate from './screens/PostCreate';
import Postorganizerreceiver from './screens/Postorganizerreceiver';
import Serviceorganizerdonor from './screens/Serviceorganizerdonor';
import Serviceorganizerreceiver from './screens/Serviceorganizerreceiver';
import Postorganizerdonor from './screens/Postorganizerdonor';
import ConnectionManager from './screens/ConnectionManager';
import PostDetailviewdonor from './screens/PostDetailviewdonor';
import AdminScreen from './screens/AdminScreen';
import PostDetailviewreciever from './screens/PostDetailviewreceiver';
import ProfileScreen from './screens/ProfileScreen';
import WaitingfromAdmin from './screens/WaitingfromAdmin';
import SelectroleinBoth from './screens/SelectroleinBoth';
import DonorlistScreen from './screens/DonorlistScreen';
import ReceiverlistScreen from './screens/ReceiverlistScreen';
//import userrequestScreen from './screens/UserrequestScreen';
//import UserrequestdetailedScreen from './screens/UserrequestdetailedScreen';
import ProfileEdit1 from './screens/ProfileEdit1';
import ProfileEdit2 from './screens/ProfileEdit2';
import ProfilePublicScreen from './screens/ProfilePublicScreen';
import GivecomplaintScreen from './screens/GivecomplaintScreen';
import GivefeedbackScreen from './screens/GivefeedbackScreen';
import Complaintorganizerdonor from './screens/Complaintorganizerdonor';
//import { Connection } from 'mongoose';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>

      <Stack.Screen
        name="LoginScreen" 
        component={LoginScreen} 
      /> 

      <Stack.Screen
        name="SignupScreen" 
        component={SignupScreen} 
    /> 
      <Stack.Screen
        name="SignupScreen2" 
        component={SignupScreen2} 
      /> 

      <Stack.Screen
        name="ConnectionManager" 
        component={ConnectionManager} 
      /> 

      <Stack.Screen
        name="PostCreate" 
        component={PostCreate} 
      />


      <Stack.Screen
        name="Serviceorganizerdonor" 
        component={Serviceorganizerdonor} 
      />

      <Stack.Screen
        name="Serviceorganizerreceiver"
        component={Serviceorganizerreceiver} 
      />

      <Stack.Screen
        name="Postorganizerdonor" 
        component={Postorganizerdonor} 
      />

      <Stack.Screen
        name="Postorganizerreceiver"
        component={Postorganizerreceiver} 
      />

      {/* <Stack.Screen
        name="Commitedrecievers" 
        component={Commitedrecievers} 
      /> */}
      
      <Stack.Screen
      name="PostDetailviewdonor" 
      component={PostDetailviewdonor} 
    />

    <Stack.Screen
      name="Complaintorganizerdonor" 
      component={Complaintorganizerdonor} 
    />

    <Stack.Screen
      name="PostDetailviewreciever" 
      component={PostDetailviewreciever} 
    />

    <Stack.Screen
      name="AdminScreen" 
      component={AdminScreen} 
    />

    <Stack.Screen
      name="ProfileScreen" 
      component={ProfileScreen} 
    />

    <Stack.Screen
      name="ProfileEdit1"
      component={ProfileEdit1} 
    />

    <Stack.Screen
      name="ProfileEdit2"
      component={ProfileEdit2} 
    />

    <Stack.Screen
      name="WaitingfromAdmin" 
      component={WaitingfromAdmin} 
    />



    <Stack.Screen
      name="SelectroleinBoth"
      component={SelectroleinBoth} 
    />

    <Stack.Screen
      name="DonorlistScreen"
      component={DonorlistScreen} 
    /> 

    <Stack.Screen
      name="ReceiverlistScreen"
      component={ReceiverlistScreen} 
    />

    {/* <Stack.Screen
      name="userrequestScreen"
      component={userrequestScreen} 
    /> */}

    {/* <Stack.Screen
      name="UserrequestdetailedScreen" 
      component={UserrequestdetailedScreen} 
    /> */}

    {/* <Stack.Screen
      name="ComplaintScreen" 
      component={ComplaintScreen} 
    /> */}


    <Stack.Screen
      name="ProfilePublicScreen" 
      component={ProfilePublicScreen} 
    />

    <Stack.Screen
      name="GivecomplaintScreen" 
      component={GivecomplaintScreen} 
    /> 

    <Stack.Screen
      name="GivefeedbackScreen" 
      component={GivefeedbackScreen} 
    /> 

    </Stack.Navigator>
  );
};

export default AppNavigator;