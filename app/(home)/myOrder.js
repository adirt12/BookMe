import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import axios from "axios";

const myOrder = () => {
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
            const res = response.data.message;
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

  const orderDataComponent = ({ item }) => {
    console.log(item.time);
    console.log(item._id);
    const id = item._id;
    return (
      <View>
        <TouchableOpacity style={styles.orderList}>
          <Text style={{ fontSize: 16 }}>
            <Text style={styles.orderListHeader}>Time: </Text>
            {item.time.map((time, index) => (
              <Text
                key={index}
                style={[styles.orderListText, { flexWrap: "wrap" }]}
              >
                {index > 0 && ", "}
                {time}
              </Text>
            ))}
          </Text>

          <Text style={{ fontSize: 16 }}>
            <Text style={styles.orderListHeader}>Date: </Text>
            <Text style={[styles.orderListText, { flexWrap: "wrap" }]}>
              {item.date}
            </Text>
          </Text>

          <Text style={{ fontSize: 16 }}>
            <Text style={styles.orderListHeader}>Type: </Text>
            <Text style={[styles.orderListText, { flexWrap: "wrap" }]}>
              {item.bookingType}, {item.bookingSubType}
            </Text>
          </Text>
        </TouchableOpacity>
        <Text></Text>
        <Text></Text>
      </View>
    );
  };

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

      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <TouchableOpacity
          onPress={() => hendalReturnHome()}
          style={{ paddingLeft: 10 }}
        >
          <Ionicons name="home-outline" size={35} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 30 }}>Your Orders</Text>
        </View>
      </View>

      <View style={{ backgroundColor: "#74B2F3" }}>
        <FlatList
          data={orderData}
          renderItem={orderDataComponent}
          keyExtractor={(item) => item._id}
          style={styles.flatList}
        />
      </View>
    </View>
  );
};

export default myOrder;

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
    marginBottom: 50,
  },
  orderList: {
    padding: 3,
    borderRadius: 8,
    borderWidth: 2,
  },
  orderListText: {
    fontSize: 22,
    flexWrap: "wrap",
  },
  orderListHeader: {
    textDecorationLine: "underline",
    fontSize: 22,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
