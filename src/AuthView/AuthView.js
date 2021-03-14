import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const AuthView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = () => {
    if (
      email.length !== 0 &&
      password.length !== 0 &&
      password2 !== 0 &&
      firstName !== 0 &&
      lastName !== 0 &&
      password === password2
    ) {
      console.log("register new user");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="first name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput
            placeholder="last name"
            value={lastName}
            onChangeText={(name) => setLastName(name)}
            style={styles.input}
          />
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={styles.input}
          />
          <TextInput
            placeholder="password"
            value={password}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
          />
          <TextInput
            placeholder="password confirmation"
            value={password2}
            secureTextEntry={true}
            onChangeText={(password) => setPassword2(password)}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.buttonWrapper}>
            <Text>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    margin: 5,
    borderStyle: "solid",
    borderWidth: 2,
  },
  buttonWrapper: {
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "blue",
  },
});

export default AuthView;
