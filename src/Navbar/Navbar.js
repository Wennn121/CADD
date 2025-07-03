import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contrl/AuthContext';
import SubNavBar from './SubNavBar';
import UserMenu from './UserMenu';
import logo from './图片1.svg';
import userAvatar from './user-avatar.svg';
import styles from './Navbar.module.css';
import navItems from './navItems';
import useUserInfo from '../hooks/useUserInfo';

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout, user, setUser } = useAuth();

  useUserInfo(setUser);
  const handleMenuClick = (item, e) => {
    e.stopPropagation();
    if (activeMenu === item.name) {
      setActiveMenu(null);
    } else {
      setActiveMenu(item.name);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    if (activeMenu !== null) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeMenu]);

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.logoTitle}>
        <img src={logo} alt="logo" className={styles.logo} onClick={() => navigate('/')} />
        <h1 className={styles.title} onClick={() => navigate('/')}>CADD抗体分析平台</h1>
      </div>
      <ul className={styles.menuList}>
        {navItems.map(item => (
          <li
            key={item.name}
            className={styles.menuItem}
            onClick={e => handleMenuClick(item, e)}
          >
            {item.name}
            <SubNavBar
              subItems={item.subItems}
              isVisible={activeMenu === item.name}
              onClick={(subItem, event) => handleMenuClick(subItem, event)}
            />
          </li>
        ))}
      </ul>
      <div className={styles.userSection}>
        {isLoggedIn ? (
          <>
            <img src={userAvatar} alt="用户头像" className={styles.userAvatar} onClick={() => setIsUserMenuVisible(v => !v)} />
            {isUserMenuVisible && (
              <UserMenu
                onNavigate={path => { setIsUserMenuVisible(false); navigate(path); }}
                onLogout={logout}
              />
            )}
            <div className={styles.username}>{user?.username || '未知用户'}</div>
          </>
        ) : (
          <>
            <button className={styles.loginBtn} onClick={() => navigate('/login')}>登录</button>
            <button className={styles.registerBtn} onClick={() => navigate('/register')}>注册</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


