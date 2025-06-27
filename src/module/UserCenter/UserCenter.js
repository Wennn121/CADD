import React from 'react';
import Profile from './Profile';
import History from './History';
import Notifications from './Notifications';
import Points from './Points';
import Logout from './Logout';
import '../../App.css';
import styles from './UserCenter.module.css';

const UserCenter = () => (
  <div className={styles.userCenter}>
    <Profile />
    <div className={styles.dashboard}>
      <History />
      <Notifications />
      <Points />
    </div>
    <Logout />
  </div>
);

export default UserCenter;