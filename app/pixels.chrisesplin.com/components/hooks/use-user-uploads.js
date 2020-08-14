import { UserUploadsContext } from '~/contexts/user-uploads-context';
import { useContext } from 'react';

export default function useUserUploads() {
  return useContext(UserUploadsContext);
}
