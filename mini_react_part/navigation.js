import { createStackNavigator } from '@react-navigation/stack';
import Login2ajay from './screens/Login2ajay';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SignupScreen2 from './screens/SignupScreen2';
// import ServiceSelectbox from './components/ServiceSelectbox';
// import SearchBar from './components/SearchBar';
//  import Serviceorganizerdonor from './screens/Serviceorganizerdonor';
import Serviceorganizerreceiver from './screens/Serviceorganizerreceiver';
// import Postorganizerdonor from './screens/Postorganizerdonor';
// import Postorganizerreceiver from './screens/Postorganizerreceiver';
// import Commitedrecievers from './screens/Commitedrecievers';
// // import Imagetesting from './screens/Imagetesting';


// import PostDetailviewdonor from './screens/PostDetailviewdonor';
// import AdminScreen from './screens/AdminScreen';

// import PostDetailviewreciever from './screens/PostDetailviewreciever';
// import ProfileScreen from './screens/ProfileScreen';
// // import NavBarbottom from './components/NavBarbottom';

// import WaitingfromAdmin from './screens/WaitingfromAdmin';
// import SelectServicelist from './components/SelectServicelist';

// import SelectroleinBoth from './screens/SelectroleinBoth';

// import DonorlistScreen from './screens/DonorlistScreen';
// import ReceiverlistScreen from './screens/ReceiverlistScreen';

// import userrequestScreen from './screens/UserrequestScreen';

// import UserrequestdetailedScreen from './screens/UserrequestdetailedScreen';

// import ComplaintScreen from './screens/ComplaintScreen';


// import ProfileeditScreen from './screens/ProfileeditScreen';

// import ProfilePublicScreen from './screens/ProfilePublicScreen';

// import GivecomplaintScreen from './screens/GivecomplaintScreen';
// import GivefeedbackScreen from './screens/GivefeedbackScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      {/* Import and add your screen components here */}
      
       {/* <Stack.Screen
        name="Login2ajay" // we can customize this name
        component={Login2ajay} 
      /> */}

      <Stack.Screen
        name="SignupScreen" // we can customize this name
        component={SignupScreen} 
    /> 

       <Stack.Screen
        name="LoginScreen" // we can customize this name
        component={LoginScreen} 
      /> 
      <Stack.Screen
        name="SignupScreen2" // we can customize this name
        component={SignupScreen2} 
      /> 

      {/* <Stack.Screen
        name="Serviceorganizerdonor" // we can customize this name
        component={Serviceorganizerdonor} 
      /> */}

<Stack.Screen
        name="Serviceorganizerreceiver" // we can customize this name
        component={Serviceorganizerreceiver} 
      />

{/* <Stack.Screen
        name="Postorganizerdonor" // we can customize this name
        component={Postorganizerdonor} 
      /> */}

{/* <Stack.Screen
        name="Postorganizerreceiver" // we can customize this name
        component={Postorganizerreceiver} 
      /> */}

{/* <Stack.Screen
        name="Commitedrecievers" // we can customize this name
        component={Commitedrecievers} 
      /> */}
      
{/* <Stack.Screen
      name="PostDetailviewdonor" // we can customize this name
      component={PostDetailviewdonor} 
    /> */}
{/* 
<Stack.Screen
      name="PostDetailviewreciever" // we can customize this name
      component={PostDetailviewreciever} 
    /> */}

{/* <Stack.Screen
      name="AdminScreen" // we can customize this name
      component={AdminScreen} 
    /> */}

{/* <Stack.Screen
      name="ProfileScreen" // we can customize this name
      component={ProfileScreen} 
    /> */}

{/* <Stack.Screen
      name="ProfileeditScreen" // we can customize this name
      component={ProfileeditScreen} 
    /> */}

{/* <Stack.Screen
      name="WaitingfromAdmin" // we can customize this name
      component={WaitingfromAdmin} 
    /> */}



{/* <Stack.Screen
      name="SelectroleinBoth" // we can customize this name
      component={SelectroleinBoth} 
    /> */}

{/* <Stack.Screen
      name="DonorlistScreen" // we can customize this name
      component={DonorlistScreen} 
    /> */}

{/* <Stack.Screen
      name="ReceiverlistScreen" // we can customize this name
      component={ReceiverlistScreen} 
    /> */}

{/* <Stack.Screen
      name="userrequestScreen" // we can customize this name
      component={userrequestScreen} 
    /> */}

{/* <Stack.Screen
      name="UserrequestdetailedScreen" // we can customize this name
      component={UserrequestdetailedScreen} 
    /> */}

{/* <Stack.Screen
      name="ComplaintScreen" // we can customize this name
      component={ComplaintScreen} 
    /> */}


    {/* <Stack.Screen
      name="ProfilePublicScreen" // we can customize this name
      component={ProfilePublicScreen} 
    /> */}

{/* <Stack.Screen
      name="GivecomplaintScreen" // we can customize this name
      component={GivecomplaintScreen} 
    /> */}

{/* <Stack.Screen
      name="GivefeedbackScreen" // we can customize this name
      component={GivefeedbackScreen} 
    /> */}

    </Stack.Navigator>
  );
};

export default AppNavigator;