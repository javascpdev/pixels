import React, { useEffect, useMemo, useRef, useState } from 'react';

import getMegabytes from '~/utilities/get-megabytes';
import styles from './gallery-image.module.css';

export default function GalleryImage({
  alt,
  bytes,
  imageId,
  isSearching,
  isSelected,
  src,
  tags = [],
}) {
  const imgRef = useRef();
  const isIntersecting = useIsIntersecting({ imgRef });
  const style = useMemo(() => ({ backgroundImage: isIntersecting ? `url(${src})` : '' }), [
    isIntersecting,
    src,
  ]);

  return (
    <div className={styles.wrapper} data-is-searching={isSearching} data-is-selected={isSelected}>
      <div id={`image-controls-${imageId}`} className={styles.imageControls} />
      <Tags bytes={bytes} tags={tags} />

      <img
        ref={imgRef}
        alt={alt}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        style={style}
      />
    </div>
  );
}

function Tags({ bytes, tags }) {
  return (
    <ul>
      {tags.map((tag) =>
        tag.value ? (
          <li key={`tag-${tag.value}`} dangerouslySetInnerHTML={{ __html: tag.value }} />
        ) : (
          <li key={`tag-${tag}`}>{tag}</li>
        ),
      )}
      <li>{getMegabytes(bytes)}mb</li>
    </ul>
  );
}

function useIsIntersecting({ imgRef }) {
  const [isIntersecting, setIsIntersecting] = useState();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries = []) => {
        const [entry] = entries;

        entry && entry.isIntersecting && setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(imgRef.current);

    return () => observer.unobserve(imgRef.current);
  }, [imgRef, setIsIntersecting]);

  return isIntersecting;
}
