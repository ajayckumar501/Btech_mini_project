import { StyleSheet, Text, View, ScrollView, Image, Pressable, Alert } from 'react-native';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import NavBarbottom from '../components/NavBarbottom';

const PostDetailviewreciever = ({ route }) => {
  const [title, setTitle] = useState('');
  const [postid, setPostid] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const posttitle = route.params.post_title;
    setTitle(posttitle);
    const postid = route.params.postid;
    setPostid(postid);
    const desc = route.params.post_desc;
    setContent(desc);
    const user = route.params.username;
    setUsername(user);
  }, [route.params]);

  const deleteUserPost = async (postid) => {
    try {
      const apiresponse = await axios.delete("http://192.168.218.163:8080/api/v1/postdesc/delete", {
        headers: {
          "Content-Type": 'application/json'
        },
        params: {
          postid: postid
        }
      });
      alert(apiresponse.data.message);
      navigation.goBack();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const confirmDelete = (pid) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete this post?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteUserPost(pid)
        }
      ]
    );
  };

  return (
    <View style={styles.maincontainer}>
      <ScrollView contentContainerStyle={styles.scrollcontainer}>
        <View style={styles.header}>
          <Image source={require("../assets/usericongreyback.png")} style={styles.usericongrey} />
          <Text style={styles.username}>{username}</Text>
          <View style={styles.actionIcons}>
            <Image source={require("../assets/editpost.png")} style={styles.editIcon} />
            <Pressable onPress={() => confirmDelete(postid)}>
              <Image source={require("../assets/deletepost.png")} style={styles.deleteIcon} />
            </Pressable>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
      </ScrollView>
      <NavBarbottom style={styles.navBarBottom} />
    </View>
  );
}

export default PostDetailviewreciever;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  scrollcontainer: {
    padding: "5%",
    paddingBottom: 0,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
  },
  usericongrey: {
    height: 38,
    width: 38,
    marginRight: 15,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
  },
  actionIcons: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  editIcon: {
    height: 22,
    width: 22,
    marginRight: 25,
  },
  deleteIcon: {
    height: 25,
    width: 25,
    marginRight: "2%",
  },
  contentContainer: {
    marginTop: "5%",
    backgroundColor: "#F8FEFD",
    width: "90%",
    padding: "5%",
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
  },
  content: {
    fontSize: 16,
    fontWeight: "400",
    color: "#575757",
    marginTop: 15,
    marginBottom: 300,
  },
  navBarBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});
