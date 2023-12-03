import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';

const index = () => {
    const router = useRouter();
    return (

        <View style={{ padding: 12 }}>
            <Text style={{ fontSize: 20, color: "white" }}>Don't have an account yet?</Text>
            <Pressable onPress={() => router.push("/(home)/login")}>
                <Text style={{ fontSize: 20 }}>Create an account</Text>
            </Pressable>
        </View>
    )
}



export default index;

const styles = StyleSheet.create({});