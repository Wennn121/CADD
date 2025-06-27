import React from 'react';

const Points = () => (
  <div className="card">
    <h4>积分系统</h4>
    <p>当前积分: 1200</p>
    <button className="btn" onClick={() => alert('跳转到积分兑换')}>兑换积分</button>
  </div>
);

export default Points;