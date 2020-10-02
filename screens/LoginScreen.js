import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, StatusBar, LayoutAnimation } from 'react-native';

import * as firebase from 'firebase';

const LoginScreen = (props) => {

	const
		[loading, setLoading] = useState(false),
		[email, setEmail] = useState(''),
		[password, setPassword] = useState(''),
		[errorMessage, setErrorMessage] = useState(null);

	const handleLogin = () => {
		setLoading(true);
		firebase.auth().signInWithEmailAndPassword(email, password)
			.catch(error => setErrorMessage(error.message))
			.then(() => {
				setLoading(false);
			});
	};

	LayoutAnimation.easeInEaseOut();

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle="light-content"
				translucent backgroundColor="transparent"
				showHideTransition="fade">
			</StatusBar>

			<Image
				source={require('../assets/authHeader.png')}
				style={{ marginTop: -146, marginLeft: -56 }}></Image>
			<Image
				source={require('../assets/authFooter.png')}
				style={{ position: "absolute", bottom: -325, right: -225 }}></Image>
			<Image
				source={require('../assets/loginLogo.png')}
				style={{marginTop: -170, alignSelf: "center",  }}></Image>

			<Text style={styles.greeting}>{'Hello again, \nWelcome back'}</Text>

			<View style={styles.errorMessage}>
				{errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
				{loading && <ActivityIndicator size="small"></ActivityIndicator>}
			</View>

			<View style={styles.form}>
				<View style={styles.field}>
					<Text style={styles.inputTitle}>Email Address</Text>
					<TextInput
						style={styles.input}
						autoCapitalize="none"
						onChangeText={(email) => setEmail(email)}
						value={email}
					></TextInput>
				</View>

				<View style={styles.field}>
					<Text style={styles.inputTitle}>Password</Text>
					<TextInput
						style={styles.input}
						secureTextEntry
						autoCapitalize="none"
						onChangeText={(password) => setPassword(password)}
						value={password}
					></TextInput>
				</View>

				<TouchableOpacity style={{ ...styles.button, marginTop: 30 }} onPress={handleLogin}>
					<Text style={{ color: "#fff", fontWeight: "500", }}>Sign In</Text>
				</TouchableOpacity>

				<TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => props.navigation.navigate('Register')}>
					<Text style={{ color: "#414353", fontSize: 13 }}>
						New to FireR App ? <Text style={{ fontWeight: "800", color: "#E9446A" }}>Sign Up</Text>
					</Text>
				</TouchableOpacity>
			</View>

		</View>
	);
}

export default LoginScreen;

const styles = new StyleSheet.create({
	container: {
		flex: 1,
	},
	greeting: {
		marginTop: -32,
		fontSize: 18,
		fontWeight: '400',
		textAlign: "center",
	},
	errorMessage: {
		height: 72,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 30,
	},
	error: {
		color: "#E9446A",
		fontSize: 13,
		fontWeight: "400",
		textAlign: "center",
	},
	form: {
		marginHorizontal: 30,
	},
	inputTitle: {
		color: "#8A8F9C",
		fontSize: 10,
		textTransform: 'uppercase'
	},
	field: {
		marginVertical: 15,
	},
	input: {
		borderBottomColor: "#8A8F9C",
		borderBottomWidth: StyleSheet.hairlineWidth,
		height: 40,
		fontSize: 15,
		color: "#141F30",
	},
	button: {
		marginTop: 30,
		backgroundColor: "#E9446A",
		borderRadius: 6,
		height: 52,
		alignItems: "center",
		justifyContent: "center",
	}
});
