import React, {createContext, useState, useEffect} from "react";
import {useLoggedInUser, UserProfile} from "./services/useFetchedData";

interface UserContextType {
  user: UserProfile | null;
  authenticated: boolean | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  authenticated: undefined,
  setUser: () => {
  },
  setAuthenticated: () => {
  }
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);
  const {
    result,
    isLoading,
  } = useLoggedInUser();

  useEffect(() => {
    if (isLoading === false) {
      setUser(result || null)
      setAuthenticated(Boolean(result))
    }
  }, [isLoading])


  return (
    <UserContext.Provider value={{user, authenticated, setUser, setAuthenticated}}>
      {children}
    </UserContext.Provider>
  );
};
