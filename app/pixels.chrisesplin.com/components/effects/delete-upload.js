import schema from '~/schema';

export default async function deleteUpload(upload) {
  const storageRef = schema.getStorageRefFromPath(upload.metadata.fullPath);
  const firestoreRef = schema.getFirestoreRefFromPath(upload.__path);

  try {
    await storageRef.delete();
  } catch (error) {
    console.info('delete-upload storageRef error');
    console.error(error);
  }

  await firestoreRef.delete();
}
