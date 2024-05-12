import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';




const AdminScreen = () => {


  const navigation = useNavigation();
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalReceivers, setTotalReceivers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);


  const [modalVisible, setModalVisible] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);


  const handlePress = () => {
    // Navigate to the desired screen
    navigation.navigate('LoginScreen');
  };

  const fetchData = async () => {
    try {
      // Make API calls to fetch data from the backend
      const apiresponse = await axios.get("http://192.168.43.175:8080/api/v1/admin/fetchDatavalues");
      
      // Access data directly from the response
      const data = apiresponse.data;
  
      console.log(data);
      // Update state with fetched data
      setTotalDonors(data.totalDonors);
      setTotalReceivers(data.totalReceivers);
      setTotalPosts(data.totalPosts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  const handleAddService = async () => {
    try {
      // Check if the new service name is not empty
      if (!newServiceName) {
        console.error('Service name is required.');
        return;
      }
  
      // Perform actions here to add the new service
      console.log("Adding new service:", newServiceName);
  
      // Make an API call to add the new service
      await axios.post("http://192.168.43.175:8080/api/v1/admin/addingnewservice", { serviceName: newServiceName });
      
      // If the service is added successfully, you can perform additional actions like updating UI or fetching data again
      // Example:
      // fetchData();
  
      // Reset the new service name and close the modal
      setNewServiceName('');
      setModalVisible(false);
    } catch (error) {
      // Handle errors
      console.error('Error adding new service:', error);
      // You can display an error message or take other actions as needed
    }
  };
  



  return (
    <View style={styles.maincontainer}>
      <View style={styles.adminheader}>
        <Image source={require("../assets/adminprofile.png")} style={styles.image} />
        <View style={{marginLeft:15,height:50,width:200}}>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "white",}}>Admin</Text>
          {/* <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>adusername</Text> */}
        </View>
        <TouchableOpacity onPress={handlePress}>
        <Image source={require("../assets/logout.png")} style={{ height: 39, width: 39 }} />

        </TouchableOpacity>
      </View>

      <ScrollView style={{ height: "60%" }}>
        <View style={styles.basecontainer}>
          
          <View style={styles.totaldonrec}>
            <TouchableOpacity
              style={{ width: "42%", height: 125, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8,    marginLeft:"4%",
            }}
              onPress={() => navigation.navigate("DonorlistScreen")}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Total Donors</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>{totalDonors}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: "42%", height: 125, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8,  marginRight:"4%"
            }}
              onPress={() => navigation.navigate("ReceiverlistScreen")}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Total Receivers</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>{totalReceivers}</Text>
            </TouchableOpacity>


          </View>



          <TouchableOpacity style={{ width: 324, height: 125, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8, flexDirection: "row" }} >
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", marginRight: 15 }}>Total no of posts</Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>{totalPosts}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: 324, height: 66, backgroundColor: "#FF4444", justifyContent: "center", alignItems: "center", borderRadius: 8 }} onPress={() => navigation.navigate("Complaintorganizerdonor")}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>User complaints</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{ width: 324, height: 66, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8 }} >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>User Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: 324, height: 66, backgroundColor: "#656565", justifyContent: "center", alignItems: "center", borderRadius: 8 }} >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Suspended accounts</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{ width: 324, height: 66, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8 }} >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Add new service</Text>
          </TouchableOpacity> */}


          <TouchableOpacity
            style={{ width: 324, height: 66, backgroundColor: "#02BF9D", justifyContent: "center", alignItems: "center", borderRadius: 8 }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Add new service</Text>
          </TouchableOpacity>



        </View>
      </ScrollView>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Service Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Service Name"
              value={newServiceName}
              onChangeText={text => setNewServiceName(text)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => handleAddService()}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
    </View>
  );
}



export default AdminScreen;





const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  adminheader: {
    width: "100%",
    // height: 119,
    backgroundColor: "#02BF9D",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop:"10%",
    paddingBottom:"2%",
    paddingRight:"5%",
    paddingLeft:"5%"

  },
  image: {
    width: 95.26,
    height: 95.26,
  },
  basecontainer: {
    width: "100%",
    height: 604,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },


  totaldonrec: {
    justifyContent: "space-around",
    flexDirection: "row",
    // alignItems: "center",
    width:"100%",
    // backgroundColor:"blue",
    

  },


  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#02BF9D',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },


});