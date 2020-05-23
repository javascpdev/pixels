import { ImgurAlbumsContext } from '~/contexts/imgur-albums-context';
import { useContext } from 'react';

export default function useImgurAlbums() {
  return useContext(ImgurAlbumsContext);
}
