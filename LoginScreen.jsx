import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignIn = async () => {
    // Check if the user with the same username already exists

    const existingUsers = await AsyncStorage.getItem("users");
    let users = existingUsers ? JSON.parse(existingUsers) : [];

    const existingUser = users.find((u) => u.username === username);

    if (existingUser) {
      // User with the same username already exists, show an error

      const userTheme = existingUser.theme;
      console.log(existingUser);
      Alert.alert("User with this username already exists.");
      navigation.navigate("Home", { user: existingUser, theme: userTheme });
    } else {
      const userId = generateUniqueId();
      const user = {
        id: userId,
        username: username,
        password: password,
        theme: "white",
        isLoggedIn: true,
      };

      users.push(user);

      // Save the updated user array in AsyncStorage
      await AsyncStorage.setItem("users", JSON.stringify(users));
      console.log(users);

      navigation.navigate("Home", { user, theme: user.theme });
    }
  };

  const generateUniqueId = () => {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome To Sign In Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="black"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    color: "black",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: "black",
  },
  loginButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 12,
  },
  signupButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
