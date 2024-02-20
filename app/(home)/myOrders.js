import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";

const myOrders = () => {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  const { email } = useLocalSearchParams();
  const { admin } = useLocalSearchParams();

  const ipAddress = Constants.expoConfig.hostUri.split(":")[0];

  //   useEffect(async () => {
  //     setLoading(true);
  //     const data = {
  //       email: email,
  //     };
  //     const response = await axios.post(
  //       "http://" + ipAddress + ":8000/myOrderList",
  //       data
  //     );
  //     const res = response.data.message;
  //     console.log(`ressssss ${JSON.stringify(response.data.message)}`);
  //   }, []);

  const hendalReturnHome = () => {
    router.push({
      pathname: "homePage",
      params: {
        username: username.replace(/"/g, ""),
        email: email.replace(/"/g, ""),
        admin: admin,
      },
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "red",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => hendalReturnHome()}>
          <Ionicons name="home-outline" size={35} color="black" />
        </TouchableOpacity>
        <View style={{ backgroundColor: "blue" }}>
          <Text style={{ fontSize: 30 }}>{username} Orders</Text>
        </View>
      </View>
    </View>
  );
};

export default myOrders;

const styles = StyleSheet.create({});
