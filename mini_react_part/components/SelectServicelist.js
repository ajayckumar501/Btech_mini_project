
// import { StyleSheet, Text, View, SafeAreaView, FlatList, Image,Pressable } from 'react-native'
// import React from 'react'
// import SearchBar from '../components/SearchBar'

// import ServiceList from "../data/ServiceList.json"

// const Serviceorganizerdonor = () => {

//   return (
//     <View style={styles.container}>
//       <SearchBar style={styles.SearchBartop} />
//       {/* <Text>Serviceorganizerdonor</Text> */}

//       {/* <FlatList data={data} renderItem={() => <View><View /></View>} /> */}

//       <FlatList data={ServiceList.diffservices}
//         renderItem={({ index, item }) =>


//           <View style={styles.serviceboxflat}>
//             <Text style={styles.servicetext}>{item.name}</Text>

//           </View>

//         }

//         contentContainerStyle={styles.flatstyle}
//         showsVerticalScrollIndicator={false}
//       />


//     </View>
//   )
// }

// export default Serviceorganizerdonor

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",

//   },

//   SearchBartop: {
//     // zIndex:5,
//     marginTop: "90%",
//   },

//   serviceboxflat: {
//     width: "98%",
//     height: 50,
//     backgroundColor: "#02BF9D",
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     marginBottom: 15,
//     flexDirection: "row",
//   },

//   flatstyle: {
//     alignItems: 'center',
//   },

//   servicetext: {
//     color: "white",
//     fontSize: 17,
//     fontWeight: 'bold',
//     marginRight:"60%",
//   },


// })


import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ServiceList from "../data/ServiceList.json";
let selectedServices;

const SelectServicelist = () => {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServicePress = (index) => {
    const newSelectedServices = [...selectedServices];
    const itemIndex = newSelectedServices.indexOf(index);

    if (itemIndex !== -1) {
      // Remove item if already selected
      newSelectedServices.splice(itemIndex, 1);
    } else {
      // Add item if not selected
      newSelectedServices.push(index);
    }
    setSelectedServices(newSelectedServices);
  };

  return (
    <View style={styles.container}>
      <SearchBar style={styles.SearchBartop} />

      <FlatList
        data={ServiceList.diffservices}
        renderItem={({ index, item }) => (
          <Pressable
            style={[
              styles.serviceboxflat,
              selectedServices.includes(index) && { backgroundColor: '#02BF9D' },
            ]}
            onPress={() => handleServicePress(index)}
          >
            <Text style={styles.servicetext}>{item.name}</Text>
          </Pressable>
        )}
        contentContainerStyle={styles.flatstyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    alignItems:"center",
    // backgroundColor:"red"
  },

  SearchBartop: {
    // zIndex:5,
    marginTop: '90%',
    borderRadius:11,
    
  },

  serviceboxflat: {
    width: 325,
    height: 50,
    backgroundColor: '#A0A0A0', // Initial color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
  },

  flatstyle: {
    alignItems: 'center',
  },

  servicetext: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: '60%',
  },
});

export default SelectServicelist;
export { selectedServices };
