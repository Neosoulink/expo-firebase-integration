import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, FlatList, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import * as firebase from 'firebase';

const renderPost = (props) => {
	return (
		<View style={styles.post}>
			<View style={{ marginRight: 10, }}>
				<Image source={props.avatar} style={{ height: 40, width: 40, borderRadius: 20, }} />
			</View>

			<View style={{ flex: 1, }}>
				<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, }}>
					<View>
						<Text style={{ fontSize: 17, color: "#454d65", fontWeight: "600" }}>{props.name}</Text>
						<Text style={{ fontSize: 12, color: "#c4c4c4", }}>{moment(props.timestamp).fromNow()}</Text>
					</View>
					<TouchableOpacity>
						<Ionicons name="ios-more" size={24} color="gray" />
					</TouchableOpacity>
				</View>

				<Text style={{ fontSize: 14, color: "#aaa", marginBottom: 20, }}>{props.text}</Text>

				<View style={{ width: "100%", height: 150 }}>
					<Image source={props.avatar} style={{ width: "100%", height: "100%", borderRadius: 5 }} />
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
	<StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} />

	const posts = [
		{
			id: "1",
			name: "Jul edward",
			text: "The group and I will send you a picture of the snake",
			timestamp: 1602691237069,
			avatar: require('../assets/imgs/temps/avatar.jpg'),
			image: require('../assets/imgs/temps/temp-post (1).jpg'),
		},
		{
			id: "2",
			name: "Loran savant",
			text: "Jeu de la vie et de ton côté tu as un moment de la partie visible à la place de la vie c'est vraiment passionnant mais il est où le groupe des grands Moulins de la nouvelle application qui s'appelle le respect",
			timestamp: 1602691164780,
			avatar: require('../assets/imgs/temps/avatar.jpg'),
			image: require('../assets/imgs/temps/temp-post (2).jpg'),
		},
		{
			id: "3",
			name: "Chris Donovan",
			text: "Hello Kitty, I will be there at cabinet and the group and I will be there at cabinet and the group and I will be there at cabinet and the group and I will be there at cabinet and the snake ☺️",
			timestamp: 1602691206482,
			avatar: require('../assets/imgs/temps/avatar.jpg'),
			image: require('../assets/imgs/temps/temp-post (3).jpg'),
		}

	];

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
				keyExtractor={item => item.id}
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
