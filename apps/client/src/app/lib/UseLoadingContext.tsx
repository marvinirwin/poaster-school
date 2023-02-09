import React, {createContext, useState} from 'react';

export type LoadingObject = { message: string, id: number };

interface LoadingContextProps {
  loadingMessages: LoadingObject[];
  addLoadingMessage: (message: string) => () => void;
  removeLoadingMessage: (key: number) => void;
}

export const LoadingContext = createContext<LoadingContextProps>({
  loadingMessages: [],
  addLoadingMessage: () => () => {
  },
  removeLoadingMessage: () => {
  }
});

export const LoadingContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [loadingMessages, setLoadingMessages] = useState<LoadingObject[]>([]);
  const removeLoadingMessage = (key: number) => {
    setLoadingMessages(loadingMessages.filter(m => m.id !== key));
  };

  const addLoadingMessage = (message: string): () => void => {
    const key = Math.random();
    setLoadingMessages([...loadingMessages, {message, id: key}]);
    return () => removeLoadingMessage(key);
  };

  return (
    <LoadingContext.Provider value={{loadingMessages, addLoadingMessage, removeLoadingMessage}}>
      {children}
    </LoadingContext.Provider>
  );
};
