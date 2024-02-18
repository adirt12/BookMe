import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
// import { BlurView } from '@react-native-community/blur';

const HomePage = () => {
  const router = useRouter();
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { username } = useLocalSearchParams();
  const { email } = useLocalSearchParams();
  const { admin } = useLocalSearchParams();
  const [adminStatus, setAdminStatus] = useState(false);

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
    { id: "1", title: "My Orders", icon: "menu-book", action: "" },
    { id: "2", title: "Setting", icon: "settings", action: "handleSettings" },
    { id: "3", title: "Close Bar", icon: "close", action: "closingBar" },
    { id: "4", title: "Sign Out", icon: "exit-to-app", action: "onSignOut" },
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

  const handleClosingBar = () => {
    setDetailsVisible(false);
  };

  const DetailsBarAction = (actionName) => {
    if (actionName === "onSignOut") {
      handleSignOut();
    } else if (actionName === "closingBar") {
      handleClosingBar();
    } else if (actionName === "handleSettings") {
      handleSettings();
    }
  };

  const DetailsRenderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemMenuContainer}
      onPress={() => DetailsBarAction(item.action)}
    >
      <MaterialIcons name={item.icon} size={40} color="black" />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const DetailsBar = () => (
    <FlatList
      data={detailData}
      renderItem={DetailsRenderItem}
      keyExtractor={(item) => item.id}
      style={styles.flatListMenu}
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
          style={styles.detailsButton}
        >
          <MaterialIcons name="menu" size={30} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Welcome, {username.replace(/"/g, "")}
        </Text>
      </View>

      {detailsVisible && (
        <View style={styles.nabarStyle}>
          <DetailsBar />
        </View>
      )}

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
  mainContainer: {
    flex: 1,
    zIndex: 0,
  },
  detailsBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 5,
  },
  detailsButton: {
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
    flex: 1,
    marginTop: 8,
    padding: 16,
    position: "absolute",
    backgroundColor: "red",
  },
  itemMenuContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 15,
    flexDirection: "row",
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
  nabarStyle: {
    zIndex: 2,
    backgroundColor: "red",
  },
});

export default HomePage;
