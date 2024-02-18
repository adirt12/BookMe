import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Pressable } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter, useLocalSearchParams } from "expo-router";

const ResetPasswordScreen = () => {
  
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  const handleResetPassword = () => {
    const auth = getAuth();
    
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent successfully
        setResetStatus('Password reset email sent! Check your inbox.');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setResetStatus(errorMessage);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Enter your email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <Button
        title="Reset Password"
        onPress={handleResetPassword}
      />
      {resetStatus !== '' && <Text style={{ marginTop: 20 }}>{resetStatus}</Text>}
      <Pressable onPress={() => router.push({ pathname: "login" })}>
      <Text style={{ fontSize: 40, fontWeight: "600", padding: 20 }}>back</Text>
      </Pressable>
    </View>
  );
};

export default ResetPasswordScreen;
