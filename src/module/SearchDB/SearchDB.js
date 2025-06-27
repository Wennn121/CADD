import React, { useState } from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import styles from './SearchDB.module.css';

const SearchDB = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 后端API返回数据格式为数组
  const handleSearch = async (query) => {
    setLoading(true);
    // 这里用fetch请求Flask后端API
    const res = await fetch(`/api/search?keyword=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>SAbDab数据库结构搜索</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.menuItem}>查看结果</div>
          <div className={styles.menuItem}>下载</div>
          <div className={styles.menuItem}>搜索</div>
        </div>
        <div className={styles.content}>
          <SearchForm onSearch={handleSearch} />
          <SearchResult results={results} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SearchDB;