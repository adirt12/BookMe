import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
// import { BlurView, VibrancyView } from "@react-native-community/blur";

const HomePage = () => {
  const router = useRouter();
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { username } = useLocalSearchParams();
  const { email } = useLocalSearchParams();
  const { admin } = useLocalSearchParams();
  const [adminStatus, setAdminStatus] = useState(false);
  const ipAddress = Constants.expoConfig.hostUri.split(":")[0];

  useEffect(() => {
    if (admin === "true") {
      setAdminStatus(true);
    }
  }, []);

  const data = [
    {
      id: "1",
      title: "Car Maintenance",
      icon: "build",
      pageName: "selectionPage",
    },
    {
      id: "2",
      title: "Experience EMC",
      icon: "flight-takeoff",
      pageName: "selectionPage",
    },
    {
      id: "3",
      title: "Car Booking",
      icon: "local-taxi",
      pageName: "selectionPage",
    },
  ];

  const detailData = [
    {
      id: "1",
      title: "My Orders",
      icon: "menu-book",
      action: "handleMyOrder",
      iconLib: "MaterialIcons",
    },
    {
      id: "2",
      title: "Setting",
      icon: "settings",
      action: "handleSettings",
      iconLib: "MaterialIcons",
    },
    {
      id: "3",
      title: "Change password",
      icon: "form-textbox-password",
      action: "handleChangePassword",
      iconLib: "MaterialCommunityIcons",
    },
    {
      id: "4",
      title: "Sign Out",
      icon: "exit-to-app",
      action: "onSignOut",
      iconLib: "MaterialIcons",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        router.push({
          pathname: item.pageName,
          params: {
            username: username.replace(/"/g, ""),
            email: email.replace(/"/g, ""),
            title: item.title,
            admin: adminStatus,
          },
        })
      }
    >
      <MaterialIcons name={item.icon} size={40} color="#007BFF" />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleSignOut = () => {
    // Implement sign-out logic here
    setDetailsVisible(false);
    router.push("/(home)/login");
    console.log("Signing out...");
  };

  const handleSettings = () => {
    // Implement settings navigation or logic here
    console.log("Opening settings...");
    alert("Feature in progress... :)");
  };

  const handleMyOrder = async () => {
    console.log("Entering my order");
    router.push({
      pathname: "myOrder",
      params: {
        username: username.replace(/"/g, ""),
        email: email.replace(/"/g, ""),
        admin: adminStatus,
      },
    });
    setDetailsVisible(false);
  };

  const handleChangePassword = () => {
    setDetailsVisible(false);
    router.push("/(home)/changePassword");
  };

  const DetailsBarAction = (actionName) => {
    if (actionName === "onSignOut") {
      handleSignOut();
    } else if (actionName === "handleMyOrder") {
      handleMyOrder();
    } else if (actionName === "handleChangePassword") {
      handleChangePassword();
    } else if (actionName === "handleSettings") {
      handleSettings();
    }
  };

  const DetailsRenderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemMenuContainer}
      onPress={() => DetailsBarAction(item.action)}
    >
      {item.iconLib == "MaterialIcons" && (
        <MaterialIcons name={item.icon} size={40} color="black" />
      )}
      {item.iconLib == "MaterialCommunityIcons" && (
        <MaterialCommunityIcons name={item.icon} size={40} color="black" />
      )}
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const DetailsBar = () => (
    <FlatList
      data={detailData}
      renderItem={DetailsRenderItem}
      keyExtractor={(item) => item.id}
      style={{
        backgroundColor: "#74B2F3",
        padding: 20,
        borderRadius: 20,
      }}
      contentContainerStyle={{
        justifyContent: "space-between",
        paddingVertical: 10,
      }}
    />
  );
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsBar}>
        <TouchableOpacity
          onPress={() => setDetailsVisible(!detailsVisible)}
          style={styles.menuButton}
        >
          <MaterialIcons name="menu" size={30} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Welcome, {username.replace(/"/g, "")}
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DetailsBar />
          </View>
          <TouchableOpacity
            onPress={() => setDetailsVisible(false)}
            style={styles.modalCloseButton}
          >
            <MaterialIcons name="close" size={50} color="#74B2F3" />
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.viewImage}>
        <Image
          source={require("../../assets/matnam.png")}
          style={styles.image}
        />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  detailsBar: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
  },
  menuButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    marginLeft: 16,
  },
  flatList: {
    marginTop: 8,
    padding: 16,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 16,
  },
  flatListMenu: {
    padding: 16,
    backgroundColor: "#74B2F3",
    flexDirection: "row",
  },
  itemMenuContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 20,
    borderRadius: 15,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
  },
  viewImage: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  modalContainer: {
    zIndex: 2,
  },
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
  },
  modalCloseButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 2,
  },
});

export default HomePage;
