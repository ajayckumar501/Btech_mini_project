import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ConnectionManager = ({route}) => {
    const [username, setUsername] = useState(null);
    const [commitments, setCommitments] = useState([]); 
  
    useEffect(() => {
      console.log(route.params);
      const var1 = route.params.username;
      setUsername(var1);
    }, [username]);

    useEffect(() => {
        fetchConnections();
    }, []);

        const fetchConnections = async () => {
            try {
                // Query the database to find all users with usertype 'donor'
                const apiresponse = await axios.post('https://danasetu-backend.onrender.com/api/v1/commitment/fetch',{
                    params: {
                        user1:username
                      },
                });
                const data = apiresponse.data;
                // Update the donors state with the fetched data
                setCommitments(data);
            } catch (error) {
                console.error('Error fetching commitments:', error);
            }
        };

    
    const deleteDonor = async (user) => {
        try {
            const apiresponse = await axios.delete(`https://danasetu-backend.onrender.com/api/v1/commitment/deleteConnection?username1=${user}&username2=${username}`);
            setCommitments(commitments.filter(commitments => commitments.user2 !== user));
            alert(apiresponse.data.message);
        } catch (error) {
            console.error('Error deleting connection:', error);
        }
    };
    
    
    
    

    const confirmDelete = (user) => {
        Alert.alert(
            "Confirm Deletion",
            `Are you sure you want to delete ${user} from your connections?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => deleteDonor(user)
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.serviceboxflat}>
                <View style={styles.usericonandname}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfilePublicScreen',{ username:item.user2 }) }>
                    <Image source={require("../assets/usericon.png")} style={styles.image}  />
                </TouchableOpacity>
                    <Text style={styles.donornametxt}>{item.user2 === username ? item.user1 : item.user2}</Text>
                    <TouchableOpacity onPress={() => confirmDelete(item.user2 === username ? item.user1 : item.user2)}>
                        <Image source={require("../assets/deletered.png")} style={styles.deleteIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <SearchBar style={styles.SearchBartop} />
            <FlatList
                data={commitments}
                renderItem={renderItem}
                contentContainerStyle={styles.flatstyle}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ConnectionManager;

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