import schema from '~/schema';
import { v4 as uuid } from 'uuid';

export default function upload({ base64, tags, uid, url }) {
  console.log({ base64, schema, tags, url });
  try {
    if (base64) {
      const [heading] = base64.split(';');
      const [, suffix] = heading.split('/');

      console.log('suffix', suffix);
    }

    // const userStorageRef = schema.getUserStorageRef(uid);
    return {};
  } catch (error) {
    console.log('error', error);
    return { error };
  }
}
