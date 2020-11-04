import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Fire from "../utilities/Fire";

const ProfileScreen = (props) => {
	const
		[currentUser, setCurrentUser] = useState({}),
		[unsubscribe, setUnsubscribe] = useState(null);


	useEffect(() => {
		const user = props.uid || Fire.shared.uid;

		Fire
			.shared
			.firestore
			.collection('users')
			.doc(user)
			.onSnapshot(doc => {
				setCurrentUser(doc.data())
			});

	}, [])


	const signOut = () => {
		Fire.shared.signOut();
	};

	return (
		<View style={styles.container}>
			<View style={{ marginTop: 64, alignItems: "center", }}>

				<View style={styles.avatarContainer}>
					<Image style={styles.avatar} source={currentUser.avatar ? { uri: currentUser.avatar } : require('../assets/imgs/temps/avatar.jpg')} />
				</View>
				<Text style={styles.name}>{currentUser.name}</Text>
			</View>

			<View style={styles.statsContainer}>
				<View style={styles.stat}>
					<Text style={styles.statAmount} >21</Text>
					<Text style={styles.statTitle} >Posts</Text>
				</View>

				<View style={styles.stat}>
					<Text style={styles.statAmount} >981</Text>
					<Text style={styles.statTitle} >Followers</Text>
				</View>

				<View style={styles.stat}>
					<Text style={styles.statAmount} >43</Text>
					<Text style={styles.statTitle} >Following</Text>
				</View>
			</View>

			<View style={styles.footer}>
				<TouchableOpacity
					style={{ padding: 10, backgroundColor: "#E9446A", borderRadius: 5, justifyContent: "center" }}
					onPress={() => signOut()}
				>
					<Text style={{ color: "white" }}><Ionicons name="ios-log-out" size={15} /> Logout</Text>
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
	},
	avatarContainer: {
		shadowColor: "#151734",
		shadowRadius: 30,
		shadowOpacity: 0.4,
		elevation: 10,
	},
	avatar: {
		width: 136,
		height: 136,
		borderRadius: 136 / 2,
	},
	name: {
		marginTop: 24,
		fontSize: 18,
		fontWeight: "bold",

	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 32,
	},
	stat: {
		alignItems: "center",
		flex: 1
	},
	statAmount: {
		color: "#4f5640",
		fontSize: 18,
		fontWeight: "bold",
	},
	statTitle: {
		color: "#c3c5c2",
		fontSize: 12,
		fontWeight: "500",
		marginTop: 4,
	},
	footer :{
		alignItems: "center",
	}
})
