import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Platform, TextInput, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import Fire from "../utilities/Fire";
import UserPermission from '../utilities/UserPermission';

const PostScreen = (props) => {
	const
		[text, setText] = useState(""),
		[image, setImage] = useState(null),
		[loading, setLoading] = useState(false);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 2],
			quality: 1,
		});

		//console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const handlePost = () => {
		if (!text || !image) {
			return alert('Warning: You have to fill all fields as well and select an image background');
		}

		setLoading(true);
		return Fire.shared.addPost({ text: text.trim(), localUri: image }).then(() => {
			setText('');
			setImage(null);
			props.navigation.goBack();
		}).catch(error => {
			alert(error);
		}).then(() => {
			setLoading(false);
		});
	}

	useEffect(() => {
		return () => {
			UserPermission.getCameraPermission();
		}
	})

	return (
		<SafeAreaView style={_styles.container}>
			<StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
			<View style={_styles.header}>
				<TouchableOpacity onPress={() => props.navigation.goBack()}>
					<Ionicons name="ios-arrow-back" size={40} color="rgba(0,0,0,0.1)" />
				</TouchableOpacity>
				<TouchableOpacity disabled={loading} onPress={() => handlePost()} style={{ flexDirection: "row" }}>
					<Text style={{ fontWeight: "bold", fontSize: 18, textTransform: "uppercase", marginRight: 5 }}>Post</Text>
					<Ionicons name="ios-send" size={30} />
				</TouchableOpacity>
			</View>
			{/* END HEADER */}

			<View style={_styles.body}>
				<View style={_styles.newPost}>
					<Image source={require("../assets/imgs/temps/avatar.jpg")} style={_styles.avatar} />
					<TextInput
						value={text}
						onChangeText={(data) => setText(data)}
						autoFocus={true}
						multiline={true}
						numberOfLines={4}
						placeholder="Want to share something?"
						style={{ padding: 5, flex: 1, }}

					/>
				</View>
				{/* END NEW POST */}

				<View style={_styles.containerPhoto}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<TouchableOpacity onPress={() => pickImage()} style={{ marginRight: 10, }}>
							<Ionicons name="ios-camera" size={40} color="rgba(0,0,0,0.1)" />
						</TouchableOpacity>
						{image && (
							<TouchableOpacity onPress={() => setImage(null)}>
								<Ionicons name="md-trash" size={35} color="rgba(255,0,0,0.3)" />
							</TouchableOpacity>
						)}
					</View>

					{image && (
						<View style={{ width: "100%", height: 150 }}>
							<Image source={{ uri: image }} style={{ width: "100%", height: "100%", borderRadius: 5 }} />
						</View>
					)}

				</View>
				{/* END PHOTO BUTTON */}

			</View>
			{/* END BODY */}

			<View style={_styles.footer}>
				<TouchableOpacity
					disabled={loading}
					onPress={() => handlePost()}
					style={_styles.btnSend}>
					<Text style={{
						color: "white",
						fontSize: 17,
						fontWeight: "bold",
						textTransform: "uppercase",
						marginRight: 5
					}}>{loading ? 'loading...' : 'Send post'}</Text>
					{
						loading ?
							<ActivityIndicator size={30} color="white" /> :
							<Ionicons name="ios-send" size={30} color="white" />
					}
				</TouchableOpacity>
			</View>
			{/* END FOOTER */}
		</SafeAreaView>
	)
}

export default PostScreen

const _styles = new StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingTop: 50,
		paddingBottom: 10,
		paddingHorizontal: 20,
		margin: -3,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		elevation: 3,
		borderBottomColor: "rgba(0,0,0,0.1)",
	},
	body: {
		padding: 25,
	},
	newPost: {
		flexDirection: "row",
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 60 / 2,
	},
	containerPhoto: {
		flexDirection: "column",
		alignItems: "flex-end",
	},
	footer: {
		paddingHorizontal: 25,
	},
	btnSend: {
		width: "100%",
		marginRight: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#E9446A",
		color: "white",
		padding: 5,
		borderRadius: 5,
	}
});
