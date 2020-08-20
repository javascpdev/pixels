import React, { useEffect, useRef, useState } from 'react';

import classnames from 'classnames';
import styles from './infinite-scroll.module.css';

export default function InfiniteScroll({ children, className = '', isDone, onNext, resultsCount }) {
  const scrollAreaRef = useRef();
  const triggerRef = useRef();
  const lastResultsCountRef = useRef(0);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries = []) => {
        const [entry] = entries;

        entry && setIsIntersecting(entry.isIntersecting);
      },
      { root: scrollAreaRef.current, threshold: 0 }
    );

    observer.observe(triggerRef.current);

    return () => observer.unobserve(triggerRef.current);
  }, [scrollAreaRef, setIsIntersecting, triggerRef]);

  useEffect(() => {
    const hasAddedRecords = lastResultsCountRef.current < resultsCount;

    if (isIntersecting && !isDone && hasAddedRecords) {
      lastResultsCountRef.current = resultsCount;

      onNext();
    }
  }, [isIntersecting, resultsCount]);

  return (
    <div className={classnames(styles.scrollArea, className)} ref={scrollAreaRef}>
      {children}
      <span ref={triggerRef} />
    </div>
  );
}
