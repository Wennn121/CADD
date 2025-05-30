import React, { useEffect, useState } from 'react';
import styles from './HelpPage.module.css';

function HelpPage() {
  const [helpContent, setHelpContent] = useState('');

  // 读取帮助文档内容
  useEffect(() => {
    fetch('/Help/clustalw-help.txt')
      .then((response) => response.text())
      .then((text) => setHelpContent(text))
      .catch((error) => console.error('Error loading help file:', error));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Help Documentation</h1>
      <pre className={styles.content}>{helpContent}</pre>
    </div>
  );
}

export default HelpPage;