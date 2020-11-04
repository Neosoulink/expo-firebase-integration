import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, StatusBar, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import Fire from '../utilities/Fire';
import UserPermission from '../utilities/UserPermission';

const LoginScreen = (props) => {
	useEffect(() => {
		return () => {
			handleSigUp;
			handlePickAvatar;
		}
	}, [])
	const
		[name, setName] = useState(''),
		[email, setEmail] = useState(''),
		[password, setPassword] = useState(''),
		[avatar, setAvatar] = useState('../assets/imgs/temps/avatar.jpg'),
		[loading, setLoading] = useState(false),
		[errorMessage, setErrorMessage] = useState(null);


	const handleSigUp = () => {
		setLoading(true);

		Fire.shared.createUser({ email, password, name, avatar }).then((msg) => {
			if (typeof msg == "object") {
				setErrorMessage(msg.message);
			}

			setLoading(false);
		});
		//firebase.auth().createUserWithEmailAndPassword(email, password)
		//	.then(userCredential => {
		//		return userCredential.user.updateProfile({
		//			displayName: name
		//		});
		//	})
		//	.catch(error => setErrorMessage(error.message))
		//	.then(() => {
		//		setLoading(false);
		//	});
	};

	const handlePickAvatar = async () => {
		UserPermission.getCameraPermission()

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4]
		});

		if (!result.cancelled) {
			setAvatar(result.uri);
		}
	}

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
				source={require('../assets/imgs/backgrounds/authHeader.png')}
				style={{ marginTop: -126, marginLeft: -56 }}></Image>

			<Image
				source={require('../assets/imgs/backgrounds/authFooter.png')}
				style={{ position: "absolute", bottom: -325, right: -225 }}></Image>

			<TouchableOpacity style={styles.btnBack} onPress={() => props.navigation.goBack()}>
				<Ionicons name="md-arrow-back" size={40} color="white"></Ionicons>
			</TouchableOpacity>

			<View style={{ position: "absolute", top: 54, alignItems: "center", width: "100%" }}>
				<Text style={styles.greeting}>{'Hello, \nSign up to get started'}</Text>

				<TouchableOpacity style={styles.avatarPlaceholder} onPress={() => handlePickAvatar()}>
					<Image source={{ uri: avatar }} style={styles.avatar} />
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
					<Text style={{ color: "#fff", fontWeight: "500", }}>Sign Up</Text>
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
	avatarPlaceholder: {
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
		position: "relative",
		overflow: "hidden",
	},
	avatar: {
		position: "absolute",
		height: "100%",
		width: "100%",
	},

});
