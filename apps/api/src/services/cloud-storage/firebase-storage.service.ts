import type { File } from '@koa/multer';

import config from 'config';

import * as helpers from './cloud-storage.helper';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';

const firebaseApp: FirebaseApp = initializeApp({
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
});

const uploadFile = async (fileName: string, file: File) => {
  const storage = getStorage(firebaseApp);
  const fileNameParts = file.originalname.split('.');
  const storageRef = ref(storage, `files/${fileNameParts[0]}-${Date.now()}.${fileNameParts[1]}`);
  const metadata = {
    contentType: file.mimetype,
  };
  const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

const deleteFile = async (url: string) => {
  const storage = getStorage(firebaseApp);
  const desertRef = ref(storage, url);
  const result = await deleteObject(desertRef);
  return result;
};

export default {
  helpers,
  uploadFile,
  deleteFile,
};
