import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';


const login = () => {
    const router = useRouter();
    return (
        <ScrollView >
            <LinearGradient colors={["#09AFF7", "#E9E4F0"]} style={{ flex: 1 }}>
                <View style={{ padding: 12 }}>

                    <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", flex: 1 }}>
                        <Text style={{ fontSize: 40, fontWeight: "600", padding: 20 }}>Welcome To BookMe 5656</Text>
                    </View>

                    <View style={{ alignItems: "center", marginBottom: 70, marginTop: 70 }}>
                        <TextInput style={{ width: '80%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }}
                            mode="outlined"
                            lable="username"
                            placeholder="Please enter username"
                        />
                        <TextInput style={{ width: '80%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }}
                            mode="outlined"
                            lable="password"
                            placeholder="Please enter password"
                        />
                    </View>

                    <View style={{ alignItems: "center", marginBottom: "100%" }}>
                        <Pressable onPress={() => router.push("/(home)/homePage")} style={{ width: '60%', height: "20%", justifyContent: "center", alignItems: "center", margin: 10 }}>
                            <View style={{ flexDirection: "row", width: "60%", height: 50, margin: 12, borderWidth: 5, borderRadius: 10, backgroundColor: "black" }}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <AntDesign name="login" size={24} color="black" style={{ color: "white" }} />
                                </View>
                                <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 10 }}>
                                    <Text style={{ margin: 7, fontWeight: "600", color: "white", fontSize: 20 }}>Login</Text>
                                </View>
                            </View>
                        </Pressable>
                        <Text style={{ fontSize: 20, color: "white" }}>Don't have an account yet?</Text>
                        <Pressable onPress={() => router.push("/(home)/signUpForm")}>
                            <Text style={{ fontSize: 20 }}>Create an account</Text>
                        </Pressable>
                    </View>

                </View>
            </LinearGradient>
        </ScrollView>
    )
}

export default login

const styles = StyleSheet.create({})