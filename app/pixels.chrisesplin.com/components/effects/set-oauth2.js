import schema from '~/schema';

export default async function setOAuth2({ record, serviceId, uid }) {
  const ref = schema.getUserOAuth2ItemRef(uid, serviceId);

  await ref.set({ ...record, created: Date.now() });

  return ref;
}
