import React, {
  createContext, useCallback, useContext, useState
} from 'react';

const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, [setLoading]);

  const stopLoading = useCallback(() => {
    // set delay for testing purposes
    // setTimeout(() => {
    //   setLoading(false);
    // }, 500);
    setLoading(false);
  }, [setLoading]);

  const value = { loading, startLoading, stopLoading };

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
};

// creates custom hook to give access to loading & startLoading & stopLoading
const useLoader = () => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within LoadingProvider');
  }
  return context;
};

export { LoaderProvider, useLoader };
