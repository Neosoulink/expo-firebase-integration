import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

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
				return userCredentials.user.updateProfile({
					displayName: name
				});
			 })
			.catch(error => setErrorMessage(error.message))
			.then(() => {
				setLoading(false);
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.greeting}>{'Hello, \nSign up to get started'}</Text>

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
						value={name}
					></TextInput>
				</View>

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
