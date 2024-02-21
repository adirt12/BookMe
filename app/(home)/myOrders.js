import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import axios from "axios";

const myOrders = () => {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  const { email } = useLocalSearchParams();
  const { admin } = useLocalSearchParams();
  const [loading, setLoading] = useState("");
  const [orderData, setOrderData] = useState([]);

  const ipAddress = Constants.expoConfig.hostUri.split(":")[0];

  useEffect(() => {
    if (admin === "true") {
      setAdminStatus(true);
    }
    setLoading(true);

    async function fetchData() {
      const myOrder = {
        email: email,
      };
      try {
        await axios
          .post("http://" + ipAddress + ":8000/myOrderList", myOrder)
          .then((response) => {
            // const res = JSON.stringify(response.data.message);
            const res = response.data;
            setOrderData(res);
          });
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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

  const orderDataComponent = ({ item }) => <Text>{item.date}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={loading}
        onRequestClose={() => setLoading(false)}
      >
        <View style={styles.modalContainer}>
          <Image
            style={styles.modalContent}
            source={require("../../assets/output-onlinegiftools.gif")}
          />
        </View>
      </Modal>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => hendalReturnHome()}>
          <Ionicons name="home-outline" size={35} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 30 }}>{username}, Orders</Text>
        </View>
      </View>

      <FlatList
        data={orderData}
        renderItem={orderDataComponent}
        keyExtractor={(item) => item._id}
        style={styles.flatList}
      />
    </View>
  );
};

export default myOrders;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
    width: Dimensions.get("window").width,
    height: 100,
  },
  flatList: {
    marginTop: 8,
    padding: 16,
  },
});
