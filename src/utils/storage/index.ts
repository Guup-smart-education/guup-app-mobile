import storage, {firebase} from '@react-native-firebase/storage';
import {Alert} from 'react-native';
import {GetUniqueId} from './../../helper';
import {MediaMetaData, IMetaData} from './../../graphql/types.d';

enum STORAGE_FOLDERS {
  'courses' = 'courses',
  'profile' = 'profile',
}

const createBlobFileName = (type: string) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const name = `${GetUniqueId()}.${type.split('/')[1] || type}`;
      resolve(name);
    } catch (error) {
      reject(error);
    }
  });
};

const getUriBlobFile = (pathFile: string) => {
  return new Promise<Blob>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      // return the blob
      console.log('getUriBlobFile: onload');
      resolve(xhr.response);
    };

    xhr.onerror = (e) => {
      // something went wrong
      console.log('getUriBlobFile: onerror: ', e);
      reject(new Error('uriToBlob failed'));
    };

    xhr.responseType = 'blob';

    xhr.open('GET', pathFile, true);
    xhr.send(null);
  });
};

const sendFileToStorage = async (
  blob: Blob,
  metadata: any,
  user: string,
  fileName: string,
  folder: keyof typeof STORAGE_FOLDERS,
  onUploading: (progress: number) => void,
): Promise<IMetaData> => {
  return new Promise((resolve, reject) => {
    const storageFolderReference = storage().ref(`${folder}`);
    const storageChildReference = storageFolderReference.child(
      `${user}/${fileName}`,
    );
    const uploadTask = storageChildReference.put(blob, {
      customMetadata: {...metadata},
    });
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onUploading(Math.round(progress));
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;

          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        Alert.alert('Upload error', `${error.message}`);
        console.log('Upload error: ', `${error.message}`);
        reject(error);
      },
      () => {
        const {snapshot} = uploadTask;
        if (snapshot) {
          const {metadata: sMetaData, error} = snapshot;
          if (error) {
            Alert.alert('Upload error 🛑', `${error.message}`);
            console.log('Upload error: ', `${error}`);
            reject(error);
          }
          resolve({
            fileBucket: sMetaData.bucket,
            fileContentType: `${sMetaData.contentType || 'any'}`,
            fileFullPath: sMetaData.fullPath,
          });
        }
        // console.log('uploadTask: ', uploadTask);
        // uploadTask.snapshot?.ref
        //   .getDownloadURL()
        //   .then((downloadUrl) => {
        //     resolve(downloadUrl);
        //   })
        //   .catch((e) => {
        //     Alert.alert('Upload error 🛑', `${e}`);
        //     console.log('Upload error: ', `${e}`);
        //     reject(e);
        //   });
      },
    );
  });
};

export {
  STORAGE_FOLDERS,
  storage,
  createBlobFileName,
  sendFileToStorage,
  getUriBlobFile,
};
