import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from "axios";
import { useRouter } from "expo-router";

const carMaint = () => {
  const router = useRouter();
  return (
    <View>
      <Text>carMaint</Text>
    </View>
  )
}

export default carMaint

const styles = StyleSheet.create({})