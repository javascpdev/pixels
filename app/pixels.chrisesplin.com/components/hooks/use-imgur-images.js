import { ImgurImagesContext } from '~/contexts/imgur-images-context';
import { useContext } from 'react';

export default function useImgurImages() {
  return useContext(ImgurImagesContext);
}
