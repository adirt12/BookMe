import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';

const HomePage = () => {
  const router = useRouter();
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { username } = useLocalSearchParams()
  const { email } = useLocalSearchParams()

  const data = [
    { id: '1', title: 'Car Maintenance', icon: 'build', pageName: 'carMaint' },
    { id: '2', title: 'Experience EMC', icon: 'flight-takeoff', pageName: 'experimentsEmc' },
    { id: '3', title: 'Car Booking', icon: 'local-taxi', pageName: 'carMaint' },
  ];


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push({ pathname: item.pageName , params: { username: username.replace(/"/g, ''), email: email.replace(/"/g, '') ,title:item.title} })}
    >
      <MaterialIcons name={item.icon} size={40} color="#007BFF" />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleSignOut = () => {
    // Implement sign-out logic here
    setDetailsVisible(false);
    router.push("/(home)/login")
    console.log('Signing out...');
  };

  const handleSettings = () => {
    // Implement settings navigation or logic here
    console.log('Opening settings...');
    alert('Feature in progress... :)')
  };

  const DetailsBar = ({ onClose, onSignOut, onSettings }) => (

    <View style={styles.containerDet}>
      <TouchableOpacity style={styles.closeButton} onPress={onSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSettings}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {detailsVisible && (
        <DetailsBar
          onClose={() => setDetailsVisible(false)}
          onSignOut={handleSignOut}
          onSettings={handleSettings}
        />
      )}

      <View style={styles.mainContainer}>
        <View style={styles.detailsBar}>
          <TouchableOpacity
            onPress={() => setDetailsVisible(!detailsVisible)}
            style={styles.detailsButton}
          >
            <MaterialIcons name="menu" size={30} color="#007BFF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Welcome, {username.replace(/"/g, '')}</Text>
        </View>

        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/matnam.png')} // Replace with the actual path to your image
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    position: 'relative',
  },
  mainContainer: {
    flex: 1,
    zIndex: 0,
  },
  detailsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 5,
    zIndex: 1,

  },
  detailsButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
  containerDet: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#3498db',
    borderRadius: 8,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    margin: 5,
  },


});

export default HomePage;
