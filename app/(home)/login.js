import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "react-native-web";


const login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true)
        try{
            const response = await signInWithEmailAndPassword(auth, email,password);
            console.log(response);
            router.push("/(home)/homePage")
        } catch(error){
            console.log(error);
            alert('sign in failed:' + error.message);
        } finally{
            setLoading(false)
        }
        };
    
    
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
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput style={{ width: '80%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }}
                            mode="outlined"
                            lable="password"
                            placeholder="Please enter password"
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                    <View style={{ alignItems: "center", marginBottom: "100%" }}>
                        <Pressable title= "Login" onPress={() => signIn()} style={{ width: '60%', height: "20%", justifyContent: "center", alignItems: "center", margin: 10 }}>
                            <View style={{ flexDirection: "row", width: "60%", height: 50, margin: 12, borderWidth: 5, borderRadius: 10, backgroundColor: "black" }}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <AntDesign name="login" size={24} color="black" style={{ color: "white" }} />
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