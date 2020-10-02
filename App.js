import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			user ? setRootGroup("App") : setRootGroup("Auth");
		});

	}, [firebase]);

	const
		[rootGroup, setRootGroup] = useState(null);

	const authenticatedRoutes = () => {
		return (
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let customSize = size;
						let customStyle = {};

						if (route.name === 'Home') {
							iconName = focused ? 'ios-home' : 'md-home';
						} else if (route.name === 'Message') {
							iconName = focused ? 'md-chatboxes' : 'ios-chatboxes';
						} else if (route.name === 'Post') {
							iconName = focused ? 'md-add-circle' : 'ios-add-circle-outline';
							customSize = 50;
							customStyle = {
								shadowColor: "#E9446A",
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.5,
								shadowRadius: 2,
								elevation: 2,
								color: '#E9446A'
							};
						} else if (route.name === 'Notification') {
							iconName = focused ? 'md-notifications' : 'ios-notifications-outline';
						} else if (route.name === 'Profile') {
							iconName = focused ? 'md-contact' : 'ios-contact';
						}

						// You can return any component that you like here!
						return <Ionicons name={iconName} size={customSize} color={color} style={customStyle} />;
					},
				})}
				tabBarOptions={{
					activeTintColor: 'black',
					inactiveTintColor: 'rgba(200,200,200, 0.7)',
					showLabel: false
				}}
			>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Message" component={MessageScreen} />
				<Tab.Screen name="Post" component={PostScreen} />
				<Tab.Screen name="Notification" component={NotificationScreen} />
				<Tab.Screen name="Profile" component={ProfileScreen} />
			</Tab.Navigator>
		);
	}

	const routes = () => {
		if (rootGroup == "App") {
			return (
				<Stack.Screen name="Home" component={authenticatedRoutes} />
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
					<Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: null }} />
				</>
			);
		} else {
			return (
				<Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
			);
		}
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{routes()}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

