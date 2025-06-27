import React from 'react';

const Profile = () => (
  <div className="profile">
    <img src="/user-avatar.jpg" alt="User Avatar" className="avatar" />
    <h2>用户名: John Doe</h2>
    <p>Email: john.doe@example.com</p>
    <button className="btn" onClick={() => alert('跳转到账户设置')}>账户设置</button>
  </div>
);

export default Profile;