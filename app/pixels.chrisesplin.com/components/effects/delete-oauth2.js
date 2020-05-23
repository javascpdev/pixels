import schema from '~/schema';

export default async function deleteOAuth2({ serviceId, uid }) {
  const ref = schema.getUserOAuth2ItemRef(uid, serviceId);

  await ref.delete();

  return ref;
}
