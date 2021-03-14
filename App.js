import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { hasSubscription } from "@jumpn/utils-graphql";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import HomeView from "./src/HomeView/HomeView";
import ChatView from "./src/ChatView/ChatView";
import HeaderTitle from "./src/HeaderTitle/HeaderTitle";

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

const phoenixSocket = new PhoenixSocket(
  "wss://chat.thewidlarzgroup.com/socket",
  {
    params: () => {
      if (token) {
        return {
          token: token,
        };
      } else {
        return {};
      }
    },
  }
);
const absintheSocket = AbsintheSocket.create(phoenixSocket);
const wsLink = createAbsintheSocketLink(absintheSocket);
const splitLink = split(
  (operation) => hasSubscription(operation.query),
  wsLink,
  authedHttpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer initialRouteName="Home">
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={{
              headerTitle: (props) => <HeaderTitle {...props} />,
              headerStyle: {
                backgroundColor: "#1A1E78",
                height: 100,
              },
            }}
          />
          <Stack.Screen
            name="ChatRoom"
            component={ChatView}
            options={({ route }) => ({
              title: "",
              id: route.params.id,
              headerStyle: {
                backgroundColor: "#1A1E78",
                height: 100,
              },
              headerTintColor: "#6F6D89",
              headerTitleStyle: {
                fontWeight: "100",
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
