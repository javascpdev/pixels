import cleanRecord from '~/utilities/clean-record';
import getDataUrlFromSrc from '~/utilities/get-data-url-from-src';
import schema from '~/schema';
import { v4 as uuid } from 'uuid';

export default async function upload({ base64, tags = [], uid, url }) {
  try {
    const userStorageRef = schema.getUserStorageRef(uid);
    let dataUrl = base64;

    if (url) {
      dataUrl = await getDataUrlFromSrc(url);
    }

    const [heading] = dataUrl.split(';');
    const [, suffix] = heading.split('/');
    const fileRef = userStorageRef.child(`${uuid()}.${suffix}`);
    const snapshot = await fileRef.putString(dataUrl, 'data_url');
    const downloadURL = await fileRef.getDownloadURL();
    const { metadata, totalBytes } = snapshot;

    const record = cleanRecord({ downloadURL, metadata, tags, totalBytes, created: Date.now() });

    const userUploadsRef = schema.getUserUploadRef(uid, record.metadata.name);

    await userUploadsRef.set(record);

    return { record };
  } catch (error) {
    console.error('error', error);

    return { error };
  }
}
