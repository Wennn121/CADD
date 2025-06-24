import { useRef } from 'react';

export function useNavbarHandlers({ isLoggedIn, navigate, setActiveMenu, activeMenu }) {
  const timerRef = useRef();

  const handleMenuClick = (item, event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (item.subItems && item.subItems.length > 0) {
      setActiveMenu(activeMenu === item.name ? null : item.name);
      return;
    }
    if (item.link) {
      if (item.link.startsWith('http')) {
        window.location.href = item.link;
      } else {
        navigate(item.link);
      }
    }
  };

  const handleMenuEnter = (name) => {
    clearTimeout(timerRef.current);
    setActiveMenu(name);
  };

  const handleMenuLeave = () => {
    timerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  return { handleMenuClick, handleMenuEnter, handleMenuLeave, timerRef };
}