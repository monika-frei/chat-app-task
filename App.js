import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import HomeView from "./src/HomeView";
import Chat from "./src/Chat";

const httpLink = createHttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphql",
});
const token =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MTc2NDA5NjgsImlhdCI6MTYxNTIyMTc2OCwiaXNzIjoiY2hhdGx5IiwianRpIjoiZGZjMGY5MTAtYzdlOC00ODk5LTkwYjctYTYxYWU2MGIxZmVkIiwibmJmIjoxNjE1MjIxNzY3LCJzdWIiOiJkY2JmNTM1ZS1kNzA5LTQ2ZTMtOGVmNi0zYzQyZjIxYzQzNzAiLCJ0eXAiOiJhY2Nlc3MifQ.sFUgcMTVp6cPhveIQul7SrT4C-g2mSI2R7njhgjFEOg56o9VZ0BBHqq0iK0WdzdYM5ar1qarGi20z2qc2-lu0w";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const authedHttpLink = authLink.concat(httpLink);

const client = new ApolloClient({
  link: authedHttpLink,
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer initialRouteName="Home">
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeView} />
          <Stack.Screen
            name="ChatRoom"
            component={Chat}
            options={({ route }) => ({
              title: route.params.title,
              id: route.params.id,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1E78",
  },
});
