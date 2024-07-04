import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const DonorlistScreen = () => {
    const navigation = useNavigation();
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        // Fetch donor data from the backend
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        try {
            // Query the database to find all users with usertype 'donor'
            const apiresponse = await axios.post('http://192.168.218.163:8080/api/v1/admin/fetchallDonors');
            const data = apiresponse.data;
            // Update the donors state with the fetched data
            setDonors(data);
        } catch (error) {
            
        }
    };

    
    const deleteDonor = async (username) => {
        try {
            // Send request to delete the donor with the given username
            await axios.delete(`http://192.168.218.163:8080/api/v1/admin/deleteUserByUsername?username=${username}`);
            // Remove the deleted donor from the state
            setDonors(donors.filter(donor => donor.username !== username));
        } catch (error) {
            
        }
    };
    
    
    
    

    const confirmDelete = (username) => {
        Alert.alert(
            "Confirm Deletion",
            `Are you sure you want to delete ${username}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => deleteDonor(username)
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.serviceboxflat}>
                <View style={styles.usericonandname}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileViewAdmin',{ username:item.username }) }>
                    <Image source={require("../assets/usericon.png")} style={styles.image}  />
                </TouchableOpacity>
                    <Text style={styles.donornametxt}>{item.username}</Text>
                    <TouchableOpacity onPress={() => confirmDelete(item.username)}>
                        <Image source={require("../assets/deletered.png")} style={styles.deleteIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SearchBar style={styles.SearchBartop} />
            <FlatList
                data={donors}
                renderItem={renderItem}
                contentContainerStyle={styles.flatstyle}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default DonorlistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    SearchBartop: {
        marginTop: "90%",
    },
    serviceboxflat: {
        width: 343,
        height: 68,
        backgroundColor: "#DDEEEB",
        alignItems: 'center',
        borderRadius: 13,
        marginBottom: 15,
        flexDirection: "row",
        padding:"3%"
    },
    flatstyle: {
        alignItems: 'center',
    },
    donornametxt: {
        color: "#808080",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        flex: 1,
    },
    image: {
        height: 30,
        width: 30,
    },
    deleteIcon: {
        height: 25,
        width: 25,
        marginLeft: 10,
    },
    usericonandname: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        // backgroundColor:"green",
        
    }
});