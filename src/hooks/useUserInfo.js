import { useEffect } from 'react';

export default function useUserInfo(setUser) {
  useEffect(() => {
    fetch('http://127.0.0.1:5008/session-user', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => setUser(data))
      .catch(() => {});
  }, [setUser]);
}