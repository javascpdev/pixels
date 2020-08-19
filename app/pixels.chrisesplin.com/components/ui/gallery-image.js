import React, { useEffect, useMemo, useRef, useState } from 'react';

import styles from './gallery-image.module.css';

export default function GalleryImage({ alt, bytes, isSelected, src, tags }) {
  const imgRef = useRef();
  const isIntersecting = useIsIntersecting({ imgRef });
  const style = useMemo(() => ({ backgroundImage: isIntersecting ? `url(${src})` : '' }), [
    isIntersecting,
    src,
  ]);

  return (
    <div className={styles.wrapper} data-is-selected={isSelected}>
      <ul>
        {tags.map((tag) => (
          <li key={`tag-${tag}`}>{tag}</li>
        ))}
      </ul>
      <img
        ref={imgRef}
        alt={alt}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        style={style}
      />
    </div>
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
      { threshold: 0 }
    );

    observer.observe(imgRef.current);

    return () => observer.unobserve(imgRef.current);
  }, [imgRef, setIsIntersecting]);

  return isIntersecting;
}
