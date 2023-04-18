export const useAuth = () => {
  const setOauth = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('oauth', JSON.stringify(token));
    }
  };

  const getOauth = () => {
    if (typeof window === 'undefined') {
      return null;
    }
    const oauth = localStorage.getItem('oauth');
    return oauth ? JSON.parse(oauth) : null;
  };

  const setLogout = () => {
    localStorage.removeItem('oauth');
  };

  return {
    setOauth,
    getOauth,
    setLogout,
  };
};
