import { Card, CardActionIcon, CardActionIcons, CardActions, CardPrimaryAction } from '@rmwc/card';

import { FullscreenSvg } from '~/svg';
import GalleryImage from '~/ui/gallery-image';
import React from 'react';
import styles from './imgur-toolkit.module.css';

export default function ImgurAlbums({ albums }) {
  return (
    <ul className={styles.imageGrid}>
      {albums.map &&
        albums.map((album) => {
          const coverSrc = `https://i.imgur.com/${album.cover}m.png`;
          const albumHref = `https://imgur.com/a/${album.id}`;

          return (
            <li key={album.id}>
              <Card className={styles.card}>
                <CardPrimaryAction>
                  <GalleryImage src={coverSrc} alt={album.name} />
                  <div className={styles.cardBody}>
                    <h6 className={styles.title} title={album.title}>
                      {album.title}
                    </h6>
                  </div>
                </CardPrimaryAction>
                <CardActions>
                  <CardActionIcons>
                    <a href={`https://imgur.com/a/${album.id}`} target="_blank" rel="noopener">
                      <CardActionIcon icon={<FullscreenSvg />} />
                    </a>
                  </CardActionIcons>
                </CardActions>
              </Card>
            </li>
          );
        })}
    </ul>
  );
}
