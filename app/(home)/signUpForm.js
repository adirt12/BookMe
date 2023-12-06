import { Alert, Pressable, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from "expo-router";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import PhoneInput from 'react-phone-input-2'
import * as Network from 'expo-network';
import Constants from 'expo-constants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from "../../firebaseConfig";


// import 'react-phone-input-2/lib/style.css'

const signUpForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setpassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState(new Date());
  const [phoneNumber, setphoneNumber] = useState("");
  const [loading, setLoading] = useState('');
  const auth = FIREBASE_AUTH;
  const signUp = async () => {
    setLoading(true);
    try {
      response = await createUserWithEmailAndPassword(auth, email,password);
      console.log(response);
  } catch(error) {
    alert('sign up failed' + error.message);
  }finally{
    setLoading(false)
}
  }
  
  // const [phoneNumber,setphoneNumber]=useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [date, setdateOfBirth] = useState(new Date());
  const onChange = (e, selectedDate) => {
    // setdateOfBirth(selectedDate);
    setShowDatePicker(false); // Close the picker on iOS
    if (selectedDate) {
      setdateOfBirth(selectedDate);
    }
  };

  const handlePhoneNumberChange = (text) => {
    // Use a regex to match only numeric characters
    const numericText = text.replace(/[^0-9]/g, '');

    // Format the phone number as XXX-XXX-XXXX
    const formattedPhoneNumber = numericText.slice(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, '$1$2$3');

    setphoneNumber(formattedPhoneNumber);
  };

  const handleReg = async () => {
    const ipAddress = Constants.expoConfig.hostUri.split(':')[0];
    const userData = {
      email: email,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: password,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber
    }
    axios
      .post("http://" + ipAddress + ":8000/addUser", userData)
      .then((response) => {
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );
        setEmail("");
        setuserName("");
        setdateOfBirth(new Date());
        setfirstName("");
        setlastName("");
        setpassword("");
        setphoneNumber("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Fail",
          "An error occurred during registration"
        );
        console.log("register failed", error);
      });
  };
  const onPressedCombined = () => {
    signUp();
    handleReg();
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
      <ScrollView >
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => router.push("/(home)/login")}>
            <Ionicons name="arrow-back-circle-sharp" size={50} color="black" />
          </Pressable>
          <View style={{ backgroundColor: "#C2BFBF", borderRadius: 10, size: 40, marginLeft: 20 }}>
            <Text style={{ fontSize: 40, flex: 1, }}>Sign Up Form</Text>
          </View>
        </View>
        <View>
          <Text style={{ margin: 5 }}>UserName</Text>
          <TextInput value={userName} onChangeText={(text) => setuserName(text)}
            placeholder='Please enter UserName' style={{ width: '90%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }} />

          <Text style={{ margin: 5 }}>Email</Text>
          <TextInput value={email} onChangeText={(text) => setEmail(text)}
            placeholder='Please enter Email' style={{ width: '90%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }} />

          <Text style={{ margin: 5 }}>FirstName</Text>
          <TextInput value={firstName} onChangeText={(text) => setfirstName(text)}
            placeholder='Please enter FirstName' style={{ width: '90%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }} />

          <Text style={{ margin: 5 }}>LastName</Text>
          <TextInput value={lastName} onChangeText={(text) => setlastName(text)}
            placeholder='Please enter LastName' style={{ width: '90%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }} />

          <Text style={{ margin: 5 }}>Password</Text>
          <TextInput value={password} onChangeText={(text) => setpassword(text)}
            placeholder='Please enter Password' style={{ width: '90%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }} />

          <Text style={{ margin: 5 }}>Date Of Birth</Text>
          {/* <TextInput value={dateOfBirth} onChangeText={(text) => setdateOfBirth(text)}
          placeholder='Please enter Date Of Birth' style={{ width: '90%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }} /> */}
          <View style={{ alignItems: 'center', flex: 1 }}>
          {Platform.OS === 'android' &&(
              <Pressable onPress={() => setShowDatePicker(true)} style={{ width: '50%', height: 50,  borderColor: 'black',borderWidth: 2,borderRadius:30,alignItems:'center',justifyContent:'center'}} >
              <Text style={{fontSize:25}}>{dateOfBirth.toLocaleDateString()}</Text>
              </Pressable>
              )}
                {Platform.OS === 'android' && showDatePicker && (
                  <DateTimePicker
                    value={dateOfBirth}
                    mode={"date"}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
              
          
            {Platform.OS === 'ios'&&(
                  <DateTimePicker
                    value={dateOfBirth}
                    mode={"date"}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
          </View>

          <Text style={{ margin: 5 }}>Phone Number</Text>
          {/* <TextInput value={phoneNumber} onChangeText={(text) => setphoneNumber(text)}
            placeholder='Please enter Phone Number' style={{ width: '90%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }} /> */}
          <TextInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="numeric"
            maxLength={10} // Limit the input to 12 characters
            style={{ width: '90%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }}
          />
        </View>

        <Pressable onPress={onPressedCombined}  style={{ flexDirection: 'row', padding: 10, margin: 20, backgroundColor: 'black', borderColor: 'white', borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
          <MaterialIcons name="app-registration" size={24} color="white" />
          <Text style={{ color: "white", fontWeight: 'bold' }}>Sign Up</Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default signUpForm


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
