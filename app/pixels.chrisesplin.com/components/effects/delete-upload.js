import schema from '~/schema';

export default async function deleteUpload(upload) {
  const storageRef = schema.getStorageRefFromPath(upload.metadata.fullPath);
  const firestoreRef = schema.getFirestoreRefFromPath(upload.__path);

  await storageRef.delete();
  await firestoreRef.delete();
}
