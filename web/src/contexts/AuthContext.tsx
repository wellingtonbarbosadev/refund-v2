import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthContext = {
  isLoading: boolean;
  session: null | UserAPIResponse;
  save: (data: UserAPIResponse) => void;
  remove: () => void;
};

export const AuthContext = createContext({} as AuthContext);

const LOCAL_STORAGE_KEY = "@refund";

export function AuthProvider({ children }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);
  const [isLoading, setIsLoading] = useState(true);

  function save(data: UserAPIResponse) {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:user`,
      JSON.stringify(data.user),
    );
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    setSession(data);
  }

  function loadUser() {
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);

    if (token && user) {
      setSession({
        token,
        user: JSON.parse(user),
      });
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    setIsLoading(false);
  }

  function remove() {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);

    setSession(null);
  }

  useEffect(() => {
    loadUser();
  }, []);
  return (
    <AuthContext.Provider value={{ session, save, isLoading, remove }}>
      {children}
    </AuthContext.Provider>
  );
}
