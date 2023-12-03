import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import SearchResults from "../../components/SearchResults";

const users = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        setUsers(response.data);
      } catch (error) {
        console.log("error fetching employee data", error);
      }
    };
    fetchUsersData();
  }, []);
  console.log(users);


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
     </View>
  );
};

export default users;

const styles = StyleSheet.create({});