import { db, fbConfig } from "../firebase";

import { getStorage, ref, uploadString } from "firebase/storage";

export const uploadFile = async (payload) => {
    let filePath;
    try {
        const storage = getStorage();
        const logoStorageRef = ref(storage, payload.folderName + "/" + payload.imageName);
        await uploadString(logoStorageRef, payload.urlName, "data_url").then(
            (snapshot) => {
                console.log("Uploaded a File");
            }
        );
        filePath = "https://firebasestorage.googleapis.com/v0/b/" +
            fbConfig.storageBucket +
            "/o/" +
            `${payload.folderName}%2F` +
            payload.imageName +
            "?alt=media";
        console.log('File Uploaded successfully!',filePath);
    } catch (error) {
        console.error('Error Uploading File:', error);
    }
    
    return filePath;
};