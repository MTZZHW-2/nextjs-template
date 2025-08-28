'use client';

import type React from 'react';
import { useState } from 'react';
import { createContext, useContext } from 'use-context-selector';
import type { User } from 'lucia';
import { useRouter } from 'next/navigation';
import { useAsyncEffect } from 'ahooks';
import { fetchUserProfile } from '@/services/auth';

type AppContextValue = {
  userProfile: User;
};
const AppContext = createContext<AppContextValue>({
  userProfile: {
    id: '',
    username: '',
  },
});

type AppContextProviderProps = {
  children: React.ReactNode;
};
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const { push } = useRouter();

  const [userProfile, setUserProfile] = useState<User>();

  useAsyncEffect(async () => {
    const result = await fetchUserProfile();

    if (!result.success) {
      push('/login');
      return;
    }

    setUserProfile(result.data);
  }, []);

  if (!userProfile) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        userProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
