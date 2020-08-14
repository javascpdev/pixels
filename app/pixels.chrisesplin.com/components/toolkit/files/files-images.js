import GalleryImage from '~/ui/gallery-image';
import React from 'react';
import styles from './files-toolkit.module.css';

export default function FilesImages({ uploads }) {
  return (
    <>
      <h3>Images</h3>
      <ul className={styles.imageGrid}>
        {uploads.map((image) => {
          console.log('image.downloadURL', image.downloadURL);
          return (
            <li key={image.__id}>
              <GalleryImage src={image.downloadURL} alt={image.metadata.name} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
