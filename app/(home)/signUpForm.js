import { Alert, Pressable, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from "expo-router";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import PhoneInput from 'react-phone-input-2'
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
  // const [phoneNumber,setphoneNumber]=useState("");

  // const [date, setdateOfBirth] = useState(new Date());
  const onChange = (e, selectedDate) => {
    setdateOfBirth(selectedDate);
  };

  const handleReg = async () => {
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
      .post("http://192.168.231.172:8000/addUser", userData)
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
          <View style={{ alignItems: 'center' }}>
            <DateTimePicker
              value={dateOfBirth}
              mode={"date"}
              is24Hour={true}
              onChange={onChange}
            />
          </View>

          <Text style={{ margin: 5 }}>Phone Number</Text>
          <TextInput value={phoneNumber} onChangeText={(text) => setphoneNumber(text)}
            placeholder='Please enter Phone Number' style={{ width: '90%', height: 50, margin: 12, borderWidth: 2, borderRadius: 10, }} />
        </View>

        <Pressable onPress={handleReg} style={{ flexDirection: 'row', padding: 10, margin: 20, backgroundColor: 'black', borderColor: 'white', borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
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
