import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function GalleryImage({ src, alt }) {
  const imgRef = useRef();
  const isIntersecting = useIsIntersecting({ imgRef });
  const style = useMemo(() => ({ backgroundImage: isIntersecting ? `url(${src})` : '' }), [
    isIntersecting,
    src,
  ]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      style={style}
    />
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
