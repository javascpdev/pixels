import React from 'react';
import styles from './markdown.module.css';

export default function MarkdownWrapper({ children }) {
  return <div className={styles.markdown}>{children}</div>;
}
