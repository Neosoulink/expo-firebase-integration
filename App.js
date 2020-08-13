import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import * as firebase from 'firebase';

const Stack = createStackNavigator();
const firebaseConfig = {
	apiKey: "AIzaSyBVpeqMZeK8jLwtLR5EMB93c9sfR9lDfEc",
	authDomain: "socialapp-3a1e3.firebaseapp.com",
	databaseURL: "https://socialapp-3a1e3.firebaseio.com",
	projectId: "socialapp-3a1e3",
	storageBucket: "socialapp-3a1e3.appspot.com",
	messagingSenderId: "167286659876",
	appId: "1:167286659876:web:ee67dc09a0978c2d33f1b1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default (props) => {
	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			user ? setRootGroup("App") : setRootGroup("Auth");
		})

	}, [firebase]);

	const [rootGroup, setRootGroup] = useState(null);

	const routes = () => {
		if (rootGroup == "App") {
			return (
				<Stack.Screen name="Home" component={HomeScreen} />
			);

		} else if (rootGroup == "Auth") {
			return (
				<>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Register" component={RegisterScreen} options={{ headerLeft: null }} />
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

