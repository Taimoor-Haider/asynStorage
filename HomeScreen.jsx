import React, { useState, useEffect } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ route }) {
  const navigation = useNavigation();
  const { user, theme } = route.params;
  //console.log(user.theme)

  const goBack = () => {
    navigation.navigate("Sign In");
  };

  const changeTheme = () => {
    const newTheme = user.theme === "white" ? "blue" : "white";

    // Update the user's theme color within the user object
    user.theme = newTheme;
    updateThemeInAsyncStorage(user.id, newTheme);
    navigation.setParams({ user });
    console.log(user);
  };
  // Assuming user.id is the unique identifier for the user
  const updateThemeInAsyncStorage = async (userId, newTheme) => {
    try {
      const existingUsers = await AsyncStorage.getItem("users");
      let users = existingUsers ? JSON.parse(existingUsers) : [];

      // Find the user with the matching ID and update their theme
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          user.theme = newTheme;
        }
        return user;
      });

      // Save the updated user array in AsyncStorage
      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    } catch (error) {
      // Handle any errors that occur during AsyncStorage updates
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: user.theme }]}>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText} onPress={changeTheme}>
          Change Theme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText} onPress={goBack}>
          Log Out
        </Text>
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
  },
  loginButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomeScreen;
