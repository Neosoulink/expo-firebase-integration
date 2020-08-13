import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import * as firebase from 'firebase';

export default (props) => {

	useEffect(() => {
		const { email, displayName } = firebase.auth().currentUser;

		setCurrentUser({ email, displayName });

	}, [firebase])

	const [currentUser, setCurrentUser] = useState({
		email: "",
		displayName: ""
	});

	const signOut = () => {
		firebase.auth().signOut();
	};

	return (
		<View style={styles.container}>
			<Text>Mi {currentUser.email}</Text>
			<TouchableOpacity style={{ marginTop: 32 }} onPress={signOut}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = new StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
