import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class UserPermissions {
	getCameraPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (status != "granted") {
			alert('We need permission to use your camera roll');
		}

		//const
		//	[permission, askForPermission] = Permissions.usePermissions(Permissions.CAMERA_ROLL, { ask: true });
		//return async () => {
		//	if (!permission || permission.status != "granted") {
		//		alert("We need permission to access your camera roll");
		//		askForPermission();
		//	}
		//};
	}
}

export default new UserPermissions();
