import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, YellowBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Screens
import LoadingScreen from './screens/LoadingScreen';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import HomeScreen from './screens/HomeScreen';
import MessageScreen from './screens/MessageScreen';
import NotificationScreen from './screens/NotificationScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';

// Config
import * as firebase from 'firebase';
import firebaseConfig from './config/firebaseConfig'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Initialize Firebase
firebase.initializeApp(firebaseConfig());

export default (props) => {
	YellowBox.ignoreWarnings(['Setting a timer']);
	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			user ? setRootGroup("App") : setRootGroup("Auth");
		});

	}, [firebase]);

	const
		[rootGroup, setRootGroup] = useState(null);

	const authenticatedRoutes = (props) => {
		return (
			<Tab.Navigator
				screenOptions={({ route, navigation }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let customSize = size;
						let customStyle = {};
						let customColor = color;

						if (route.name === 'Home') {
							iconName = focused ? 'ios-home' : 'md-home';
						} else if (route.name === 'Message') {
							iconName = focused ? 'md-chatboxes' : 'ios-chatboxes';
						} else if (route.name === 'Notification') {
							iconName = focused ? 'md-notifications' : 'ios-notifications-outline';
						} else if (route.name === 'Profile') {
							iconName = focused ? 'md-contact' : 'ios-contact';
						}

						// You can return any component that you like here!
						return (
							<View style={customStyle}>
								<Ionicons name={iconName} size={customSize} color={customColor} />
							</View>
						);
					},
				})}
				tabBarOptions={{
					activeTintColor: 'black',
					inactiveTintColor: 'rgba(200,200,200, 0.7)',
					showLabel: false,
				}}

			>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Message" component={MessageScreen} />
				<Tab.Screen name="Post" component={PostScreen} options={{
					tabBarButton: () => {
						return (
							<TouchableOpacity style={_styles.postBtn} onPress={() => {
								props.navigation.navigate("PostModal")
							}}>
								<Ionicons name='ios-add' size={50} color="white" />
							</TouchableOpacity>
						);
					}
				}} />
				<Tab.Screen name="Notification" component={NotificationScreen} />
				<Tab.Screen name="Profile" component={ProfileScreen} />
			</Tab.Navigator>
		);
	}

	const routes = () => {
		if (rootGroup == "App") {
			return (
				<>
					<Stack.Screen name="Home" component={authenticatedRoutes} />
					<Stack.Screen name="PostModal" component={PostScreen} />
				</>
			);

		} else if (rootGroup == "Auth") {
			return (
				<>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{
							headerShown: null
						}} />
					<Stack.Screen name="Register" component={RegisterScreen} />
				</>
			);
		} else {
			return (
				<Stack.Screen name="Loading" component={LoadingScreen} />
			);
		}
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }} mode="modal" headerMode="none">
				{routes()}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const _styles = StyleSheet.create({
	postBtn: {
		height: 60,
		width: 60,
		backgroundColor: '#E9446A',
		borderRadius: 60 / 2,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.1)",
		marginTop: -30,
		alignItems: "center",
		justifyContent: "center",
	}
});
