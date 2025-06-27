import React from 'react';
import styles from './SearchDB.module.css';

const SearchResult = ({ results, loading }) => {
  if (loading) return <div>加载中...</div>;
  if (!results.length) return <div>暂无结果</div>;

  return (
    <table className={styles.resultTable}>
      <thead>
        <tr>
          <th>PDB编号</th>
          <th>物种</th>
          <th>方法</th>
          <th>抗原</th>
          <th>下载</th>
        </tr>
      </thead>
      <tbody>
        {results.map(item => (
          <tr key={item.pdb_id}>
            <td>
              <a href={`/structure/${item.pdb_id}`} target="_blank" rel="noopener noreferrer">
                {item.pdb_id}
              </a>
            </td>
            <td>{item.species}</td>
            <td>{item.method}</td>
            <td>{item.antigen}</td>
            <td>
              <a href={item.download_url} target="_blank" rel="noopener noreferrer">下载</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchResult;