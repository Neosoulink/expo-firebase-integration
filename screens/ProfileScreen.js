import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

const ProfileScreen = () => {
	useEffect(() => {
		const { email, displayName } = firebase.auth().currentUser;
		setCurrentUser({ email, displayName });
	}, [firebase]);

	const [currentUser, setCurrentUser] = useState({
		email: "",
		displayName: ""
	});

	const signOut = () => {
		firebase.auth().signOut();
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text>Header</Text>
			</View>
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
				<Text style={{ marginBottom: 20 }}>{currentUser.email}</Text>

				<TouchableOpacity
					style={{ padding: 10, backgroundColor: "#E9446A", borderRadius: 5, }}
					onPress={() => signOut()}
				>
					<Text style={{ color: "white" }}>Logout</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default ProfileScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		paddingTop: 50,
	}
})
