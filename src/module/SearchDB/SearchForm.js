import React, { useState } from 'react';
import styles from './SearchDB.module.css';

const SearchForm = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [organism, setOrganism] = useState('');
  const [antigenType, setAntigenType] = useState('');
  const [domain, setDomain] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, organism, antigenType, domain });
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="请输入关键词结构或PDB编号"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <select
        className={styles.select}
        value={organism}
        onChange={e => setOrganism(e.target.value)}
      >
        <option value="">全部种属</option>
        <option value="Human">人类</option>
        <option value="Mouse">小鼠</option>
        <option value="Camel">骆驼</option>
      </select>
      <select
        className={styles.select}
        value={antigenType}
        onChange={e => setAntigenType(e.target.value)}
      >
        <option value="">全部类别</option>
        <option value="protein">抗体</option>
      </select>
      <select
        className={styles.select}z
        value={domain}
        onChange={e => setDomain(e.target.value)}
        style={{ width: 100 }}
      >
        <option value="">全部域</option>
        <option value="VH">VH</option>
        <option value="VL">VL</option>
        <option value="VHH">VHH</option>
        <option value="scFv">scFv</option>
      </select>
      <button className={styles.searchBtn} type="submit">搜索</button>
    </form>
  );
};

export default SearchForm;