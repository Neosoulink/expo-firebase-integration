import firebaseKeys from '../config/firebaseConfig';
import firebase from 'firebase/app';
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

class Fire {
	constructor() {
		//firebase.initializeApp(firebaseKeys);
	}

	addPost = async ({ text, localUri }) => {
		const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}.jpg`);

		return new Promise((res, rej) => {
			let db = this.firestore.collection("posts").doc(this.uid);

			db.set({
				text,
				uid: this.uid,
				timestamp: this.timestamp,
				image: remoteUri,
			})
				.then(ref => {
					res(ref);
				})
				.catch(error => {
					rej(error);
				});

		})
	}

	uploadPhotoAsync = async (uri, filename) => {
		//const path = `photos/${this.uid}/${Date.now()}.jpg`;
		//console.log(path);

		return new Promise(async (res, rej) => {
			const response = await fetch(uri);
			const file = await response.blob();

			let upload = firebase
				.storage()
				.ref(filename)
				.put(file);

			upload.on(
				"state_changed",
				snapshot => { },
				err => {
					rej(err)
				},
				async () => {
					const url = await upload.snapshot.ref.getDownloadURL();
					res(url);
				}
			);
		});
	};

	createUser = async user => {
		let remoteUri = null;

		try {
			await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

			let db = this.firestore.collection("users").doc(this.uid);

			db.set({
				name: user.name,
				email: user.email,
				avatar: null
			});

			if (user.avatar) {
				remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}.jpg`);

				db.set({ avatar: remoteUri }, { merge: true })
			}
		} catch (error) {
			return error;
			alert(error);
		}
	}

	signOut() {
		firebase.auth().signOut();
	}

	get firestore() {
		return firebase.firestore();
	};

	get uid() {
		return (firebase.auth().currentUser || {}).uid
	};

	get timestamp() {
		return Date.now();
	};
}

Fire.shared = new Fire();
export default Fire;
