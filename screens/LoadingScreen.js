import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default (props) => {
	return (
		<View style={styles.container}>
			<Text>Loading...</Text>
			<ActivityIndicator size="large"></ActivityIndicator>
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
