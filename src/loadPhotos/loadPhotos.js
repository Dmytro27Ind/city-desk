import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";

async function loadPhoto(imagePath) {
    let fileName = imagePath.substring(imagePath.lastIndexOf("/") + 1);
    await auth().signInAnonymously();
    await storage().ref(fileName).putFile(imagePath);
    return storage().ref(fileName).getDownloadURL();
}

export default loadPhoto;