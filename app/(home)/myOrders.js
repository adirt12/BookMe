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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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

  const orderDataComponent = ({ item }) => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.orderList}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.orderListHeader}>Date: </Text>
              <Text style={styles.orderListText}>{item.date}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.orderListHeader}>{"Time: "}</Text>
              {item.time.map((time, index) => (
                <Text key={index} style={styles.orderListText}>
                  {index > 0 && ", "}
                  {time}
                </Text>
              ))}
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.orderListHeader}>Type: </Text>
              <Text style={styles.orderListText}>{item.bookingType}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.orderListHeader}>Sub Type: </Text>
              <Text style={styles.orderListText}>{item.bookingSubType}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.orderListHeader}>Your comment: </Text>
              <Text style={styles.orderListText}>{item.comment}</Text>
            </View>
          </View>

          <View style={{ justifyContent: "center" }}>
            <MaterialIcons name="bookmark-border" size={40} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      <Text></Text>
    </View>
  );
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
    marginBottom: 50,
  },
  orderList: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 2,
  },
  orderListText: {
    fontSize: 22,
  },
  orderListHeader: {
    textDecorationLine: "underline",
    fontSize: 22,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
