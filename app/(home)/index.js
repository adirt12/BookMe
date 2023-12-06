import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';

const index = () => {
    const router = useRouter();
    useEffect(() => {
        // Add any initialization logic or navigation logic here
        setTimeout(() => {
          // Navigate to the next screen after a delay
          router.push("/(home)/login"); // Assuming you have a 'Welcome' screen
        }, 2000); // Adjust the delay as needed
      }, []);
    
      return (
        <View style={styles.container}>
          <Image source={require('../../assets/matnam.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome to My App</Text>
        </View>
      );
      }



export default index;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    logo: {
      width: 380,
      height: 380,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
    },
  });