import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, StatusBar, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as firebase from 'firebase';

const LoginScreen = (props) => {

	const
		[loading, setLoading] = useState(false),
		[name, setName] = useState(''),
		[email, setEmail] = useState(''),
		[password, setPassword] = useState(''),
		[errorMessage, setErrorMessage] = useState(null);

	const handleSigUp = () => {
		setLoading(true);
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(userCredential => {
				return userCredential.user.updateProfile({
					displayName: name
				});
			})
			.catch(error => setErrorMessage(error.message))
			.then(() => {
				setLoading(false);
			});
	};

	let secondTextInput;
	let thirdTextInput;

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
				style={{ marginTop: -126, marginLeft: -56 }}></Image>

			<Image
				source={require('../assets/authFooter.png')}
				style={{ position: "absolute", bottom: -325, right: -225 }}></Image>

			<TouchableOpacity style={styles.btnBack} onPress={() => props.navigation.goBack()}>
				<Ionicons name="md-arrow-back" size={40} color="white"></Ionicons>
			</TouchableOpacity>

			<View style={{ position: "absolute", top: 54, alignItems: "center", width: "100%" }}>
				<Text style={styles.greeting}>{'Hello, \nSign up to get started'}</Text>

				<TouchableOpacity style={styles.avatar}>
					<Ionicons name="md-add" size={50} color="white"></Ionicons>
				</TouchableOpacity>
			</View>

			<View style={styles.errorMessage}>
				{errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
				{loading && <ActivityIndicator size="small"></ActivityIndicator>}
			</View>

			<View style={styles.form}>
				<View style={styles.field}>
					<Text style={styles.inputTitle}>Full Name</Text>
					<TextInput
						style={styles.input}
						autoCapitalize="none"
						onChangeText={(name) => setName(name)}
						onSubmitEditing={() => { secondTextInput.focus(); }}
						blurOnSubmit={false}
						returnKeyLabel="next"
						returnKeyType="next"
						value={name}
					></TextInput>
				</View>

				<View style={styles.field}>
					<Text style={styles.inputTitle}>Email Address</Text>
					<TextInput
						ref={(input) => { secondTextInput = input; }}
						style={styles.input}
						autoCapitalize="none"
						onChangeText={(email) => setEmail(email)}
						onSubmitEditing={() => { thirdTextInput.focus(); }}
						blurOnSubmit={false}
						returnKeyLabel="next"
						returnKeyType="next"
						value={email}
					></TextInput>
				</View>

				<View style={styles.field}>
					<Text style={styles.inputTitle}>Password</Text>
					<TextInput
						ref={(input) => { thirdTextInput = input; }}
						style={styles.input}
						secureTextEntry
						autoCapitalize="none"
						onChangeText={(password) => setPassword(password)}
						onSubmitEditing={handleSigUp}
						value={password}
					></TextInput>
				</View>

				<TouchableOpacity style={{ ...styles.button, marginTop: 30 }} onPress={handleSigUp}>
					<Text style={{ color: "#fff", fontWeight: "500", }}>Sign Un</Text>
				</TouchableOpacity>

				<TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => props.navigation.navigate('Login')}>
					<Text style={{ color: "#414353", fontSize: 13 }}>
						Already have an account ? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign In</Text>
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
		marginTop: 32,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "white",
	},
	errorMessage: {
		height: 55,
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
	},
	btnBack: {
		position: "absolute",
		top: 50,
		left: 20,
		width: 42,
		height: 42,
		borderRadius: 42,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(22, 22, 43, 0.1)",
	},
	avatar: {
		marginTop: 20,
		height: 100,
		width: 100,
		backgroundColor: "rgba(230,230,230, 0.7)",
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 100 / 2,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},

});
