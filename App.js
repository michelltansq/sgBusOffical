import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import busStop from "./src/busStop";
import Nearby from "./src/nearby";
import Favourite from "./src/favourite";
import { StatusBar } from 'expo-status-bar';
import {TouchableHighlight} from "react-native-gesture-handler";
import {View, StyleSheet} from "react-native";

const NearbyStack = createStackNavigator();

NearbyStackScreen = () => {
  return (
    <NearbyStack.Navigator>
      <NearbyStack.Screen name="sgBus" component={Nearby}
          options={({ navigation }) => ({
              headerRight: ({}) => (
                  <View style={styles.flex}>
                      <TouchableHighlight style={styles.search}
                      onPress={() => {
                          navigation.navigate("Bus Stop")
                      }}>
                          <Ionicons name="search" size={24}/>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.ellipsisVertical} onPress={() => {
                          navigation.navigate("Bus Stop")
                      }}>
                          <Ionicons name="ellipsis-vertical" size={24}/>
                      </TouchableHighlight>
                  </View>
              )
          })}
      />
      <NearbyStack.Screen name="Bus Stop" component={busStop} />
    </NearbyStack.Navigator>
  );
}

const FavouriteStack = createStackNavigator();

FavouriteStackScreen = () => {
  return (
    <FavouriteStack.Navigator>
      <FavouriteStack.Screen name="Favourite" component={Favourite} />
    </FavouriteStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default App = () => {
  return (
      <NavigationContainer>
      <StatusBar style="dark"/>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Nearby') {
                iconName = 'navigate';
              } else if (route.name === 'Favourite') {
                iconName = 'heart';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#BB86FC',
            inactiveTintColor: '#979797',
          }}
        >
          <Tab.Screen name="Nearby" component={NearbyStackScreen} />
          <Tab.Screen name="Favourite" component={FavouriteStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
    },
    ellipsisVertical: {
        marginRight: 16,
    },
    search: {
        marginRight: 24,
    }
});
