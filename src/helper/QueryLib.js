import { db, fbConfig } from "../firebase";

import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    onSnapshot,
    deleteDoc,
} from "firebase/firestore";


export const insertMaster = async (payload) => {
    
    /* payload={
        "tableName": "categories",
        "tableItem": {
            "category_name": "testd",
            "category_logo_path": "https://firebasestorage.googleapis.com/v0/b/vuefirewebapp.appspot.com/o/category%2F1693062836538_logo.png?alt=media",
            "category_banner_path": "https://firebasestorage.googleapis.com/v0/b/vuefirewebapp.appspot.com/o/category%2F1693062836538_banner.png?alt=media",
            "category_status": 1,
            "document_id": "1693062836538",
            "category_id": "1693062836538",
            "created_date": "8/26/2023, 8:43:58 PM",
            "category_banner": "dashboard-bg-img.png",
            "category_logo": "favicon.png",
        }
    } */
    
    let insertedArr;
    try {
        let docRef = collection(db, payload.tableName);
        console.log("tableRef=>", docRef)
        insertedArr = await setDoc(doc(docRef, payload.tableItem.document_id), {
            ...payload.tableItem
        });
        console.log('Data Inserted successfully!');
    } catch (error) {
        console.error('Error Inserting Data:', error);
    }

    return payload.document_id;

};

export const updateMaster = async (payload) => {
    let updatedData = null;
    try {
        const docRef = collection(db, payload.tableName);
        updatedData = await setDoc(doc(docRef, payload.tableItem.document_id),
            payload.tableItem
        );
        console.log('Data Updated successfully!');
    } catch (error) {
        console.error('Error Updating Data:', error);
    }

    return updatedData;

};

export const removeMaster = async (payload) => {
    let flag = false;
    try {
        await deleteDoc(doc(collection(db, payload.tableName), payload.pk_Id));
        console.log('Document successfully deleted!');
        flag = true;
    } catch (error) {
        console.error('Error deleting document:', error);
        flag = false;
    }
    return flag;
};

export const getSingleDataMaster = async (payload) => {
    let itemData = {};
    try {
        const docRef = doc(db, payload.tableName, payload.tableItem.item_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            itemData = {
                pk_Id: payload.tableItem.item_id,
                ...docSnap.data()
            };
        } else {
            itemData = {};
        }
        console.log('Signle Data Fetch successfully!');
    } catch (error) {
        console.error('Error Fetching Data:', error);
    }

    return itemData;
};

export const getAllMaster = async (payload) => {
    let listData = [];
    try {
        const docRef = await getDocs(collection(db, payload.tableName));
        docRef.forEach((doc) => {
            let obj = {
                pk_Id: doc.id,
                ...doc.data()
            }
            listData.push(obj);
        });
        console.log('Fetching All Data successfully!');
    } catch (error) {
        console.error('Error Fetching All Data:', error);
    }

    return listData;
};

export const getSettingsMaster = async (payload) => {
    let itemData = {};
    try {
        const docRef = doc(db, payload.tableName, payload.tableId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            itemData = {
                ...docSnap.data()
            };
        } else {
            itemData = {};
        }
        console.log('Settings Data Fetch successfully!');
    } catch (error) {
        console.error('Error Fetching Settings Data:', error);
    }

    return itemData;
};

// // Bulk insert records
// export const bulkInsertRecords = async (collectionName, data) => {
//     try {
//         const batch = firestore.batch();
//         data.forEach((record) => {
//             const docRef = firestore.collection(collectionName).doc();
//             batch.set(docRef, record);
//         });
//         await batch.commit();
//     } catch (error) {
//         throw error;
//     }
// };

// // Bulk update records
// export const bulkUpdateRecords = async (collectionName, updates) => {
//     try {
//         const batch = firestore.batch();
//         updates.forEach((update) => {
//             const docRef = firestore.collection(collectionName).doc(update.id);
//             batch.update(docRef, update.data);
//         });
//         await batch.commit();
//     } catch (error) {
//         throw error;
//     }
// };

// // Bulk delete records by IDs
// export const bulkDeleteRecords = async (collectionName, ids) => {
//     try {
//         const batch = firestore.batch();
//         ids.forEach((id) => {
//             const docRef = firestore.collection(collectionName).doc(id);
//             batch.delete(docRef);
//         });
//         await batch.commit();
//     } catch (error) {
//         throw error;
//     }
// };