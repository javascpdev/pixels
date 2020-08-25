export default function flattenRtdb(snapshot) {
  const value = snapshot.val() || {};

  return Object.keys(value).reduce((acc, key) => acc.concat([{ __id: key, ...value[key] }]), []);
}
