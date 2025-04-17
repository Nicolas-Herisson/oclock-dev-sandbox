import type { IUser } from 'src/@types';
import { createContext, useCallback, useEffect, useState } from 'react';
import * as api from '@services/Requests';

export default function UserAuth({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  async function loginUser(email: string, password: string) {
    await api.login(email, password);
    await fetchCurrentUser();
  }

  const fetchCurrentUser = useCallback(async () => {
    const { user } = await api.getCurrentUser();

    setUser(user);
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <userContext.Provider value={{ user, loginUser }}>
      {children}
    </userContext.Provider>
  );
}

export const userContext = createContext<IUserContext>({
  user: null,
  loginUser: async () => {},
});

interface IUserContext {
  user: IUser | null;
  loginUser: (email: string, password: string) => Promise<void>;
}
