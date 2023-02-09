import React, { createContext, useState, useContext } from 'react';

interface Error {
  message: string;
  id: number;
}

interface ErrorContextType {
  errors: Error[];
  addError: (error: Error) => void;
}

const ErrorContext = createContext<ErrorContextType>({
  errors: [],
  addError: () => {},
});

const ErrorProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const addError = (error: Error) => {
    console.error(error);
    setErrors((prevErrors) => [...prevErrors, error]);
  };

  return (
    <ErrorContext.Provider value={{ errors, addError }}>
      {children}
    </ErrorContext.Provider>
  );
};

const useError = () => {
  const { errors, addError } = useContext(ErrorContext);

  return {
    errors,
    addError,
  };
};

export { ErrorProvider, useError, ErrorContext };
