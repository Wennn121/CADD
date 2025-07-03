import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // 从 localStorage 初始化登录状态
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [user, setUser] = useState(() => {
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        user = null;
      }
    }
    return user;
  });

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // 设置用户信息
    try {
      localStorage.setItem('isLoggedIn', 'true'); // 持久化登录状态
      localStorage.setItem('user', JSON.stringify(userData)); // 持久化用户信息
    } catch (error) {
      console.error('保存用户信息到 localStorage 失败:', error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null); // 清除用户信息
    try {
      localStorage.removeItem('isLoggedIn'); // 清除登录状态
      localStorage.removeItem('user'); // 清除用户信息
    } catch (error) {
      console.error('清除 localStorage 信息失败:', error);
    }
  };

  useEffect(() => {
  
    try {
      localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
    } catch (error) {
      console.error('同步登录状态到 localStorage 失败:', error);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);