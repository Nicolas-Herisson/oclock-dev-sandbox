import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface IErrorsContext {
  isLoading: boolean;
  isRequestError: boolean;
  isServerError: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsRequestError: Dispatch<SetStateAction<boolean>>;
  setIsServerError: Dispatch<SetStateAction<boolean>>;
}

const ErrorsContext = createContext<IErrorsContext | undefined>(undefined);

export const ErrorsProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);

  return (
    <ErrorsContext.Provider
      value={{
        isLoading,
        isRequestError,
        isServerError,
        setIsLoading,
        setIsRequestError,
        setIsServerError,
      }}
    >
      {children}
    </ErrorsContext.Provider>
  );
};

export const useErrorsContext = () => {
  const context = useContext(ErrorsContext);
  if (context === undefined) {
    throw new Error('useErrorsContext must be used within an ErrorsProvider');
  }
  return context;
};
