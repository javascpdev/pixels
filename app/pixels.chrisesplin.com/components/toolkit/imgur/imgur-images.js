import GalleryImage from "~/ui/gallery-image";
import React from 'react';
import styles from '../image-toolkits.module.css';

export default function ImgurImages({ images }) {
  return (
    <ul className={styles.imageGrid}>
      {images.map &&
        images.map((image) => {
          return (
            <li key={image.id}>
              <a href={`https://imgur.com/${image.id}`} target="_blank" rel="noopener">
                <GalleryImage src={`https://i.imgur.com/${image.id}m.png`} alt={image.name} />
              </a>
            </li>
          );
        })}
    </ul>
  );
}
