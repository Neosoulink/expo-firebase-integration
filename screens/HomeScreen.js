import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, FlatList, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import Fire from '../utilities/Fire';

const renderPost = (props) => {
	const getPP = async (uid) => {
		let img = "";

	  await Fire
			.shared
			.firestore
			.collection('users')
			.doc(uid)
			.onSnapshot(doc => {
				img = doc.data();

				console.log(img.avatar)
				return img.avatar;
			});

		return img.avatar
	}

	return (
		<View style={styles.post}>
			<View style={{ marginRight: 10, }}>
				<Image source={{ uri: '' || console.log(getPP(props.uid).then(() => {
					console.log("sd")
				})) }} style={{ height: 40, width: 40, borderRadius: 20, }} />
			</View>

			<View style={{ flex: 1, }}>
				<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, }}>
					<View>
						<Text style={{ fontSize: 17, color: "#454d65", fontWeight: "600" }}>{props.uid == Fire.shared.uid ? "@You" : props.name}</Text>
						<Text style={{ fontSize: 12, color: "#c4c4c4", }}>{moment(props.timestamp).fromNow()}</Text>
					</View>
					<TouchableOpacity>
						<Ionicons name="ios-more" size={24} color="gray" />
					</TouchableOpacity>
				</View>

				<Text style={{ fontSize: 14, color: "#aaa", marginBottom: 20, }}>{props.text}</Text>

				<View style={{ width: "100%", height: 150 }}>
					<Image source={{ uri: props.image }} style={{ width: "100%", height: "100%", borderRadius: 5 }} />
				</View>

				<View style={{ paddingTop: 15, flexDirection: "row" }}>
					<TouchableOpacity>
						<Ionicons name="ios-heart" size={24} color="lightgray" style={{ marginRight: 15, }} />
					</TouchableOpacity>

					<TouchableOpacity>
						<Ionicons name="ios-chatboxes" size={24} color="gray" />
					</TouchableOpacity>
				</View>

			</View>

		</View>
	);
};

export default (props) => {
	const
		[posts, setPosts] = useState([]);

	useEffect(() => {
		const user = props.uid || Fire.shared.uid;

		Fire
			.shared
			.firestore
			.collection('posts')
			.doc(user)
			.onSnapshot(docs => {
				//console.log(docs.data())
				setPosts([docs.data()])
			});

		return () => {
		}
	}, []);


	<StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} />
	LayoutAnimation.easeInEaseOut();

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={{ fontWeight: "bold", fontSize: 22, }}>Feed</Text>
			</View>
			<FlatList
				style={styles.feed}
				data={posts}
				renderItem={({ item }) => renderPost(item)}
				keyExtractor={item => item.uid + item.timestamp}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = new StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingTop: 60,
		paddingBottom: 25,
		alignItems: "center",
		elevation: 10,
		margin: -12,
		borderBottomColor: "rgba(0,0,0,0)",
		borderBottomWidth: 1,
		backgroundColor: "white",

	},
	feed: {
		flex: 1,
		paddingTop: 30,
		paddingHorizontal: 20,
	},
	post: {
		padding: 10,
		marginBottom: 20,
		backgroundColor: "#fafafa",
		flexDirection: "row",
		elevation: 2.5,
		borderRadius: 5
	}
});
