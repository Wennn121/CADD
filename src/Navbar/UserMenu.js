import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

const UserMenu = ({ onNavigate, onLogout }) => (
  <div className={styles.userMenu}>
    <ul className={styles.userMenuList}>
      {[
        { label: '资源中心', path: '/resources' },
        { label: '个人中心', path: '/profile' },
        { label: '偏好设置', path: '/settings' }
      ].map(item => (
        <li
          key={item.path}
          className={styles.userMenuItem}
          onClick={() => onNavigate(item.path)}
        >
          {item.label}
        </li>
      ))}
      <li className={styles.userMenuItem} onClick={onLogout}>退出登录</li>
    </ul>
  </div>
);

UserMenu.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default UserMenu;