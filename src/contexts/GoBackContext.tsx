import React from 'react';

interface GoBackContextType {
  disableBack: boolean;
  setDisableBack: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GoBackContext = React.createContext<GoBackContextType | undefined>(undefined);


export function GoBackContextProvider({ children }: React.PropsWithChildren<{}>) {
  const [disableBack, setDisableBack] = React.useState<boolean>(false);
  return (<GoBackContext.Provider value={{ disableBack, setDisableBack }}>
    {children}
  </GoBackContext.Provider>
  );
}

export const useGoBackContext = (): GoBackContextType => {
  const context = React.useContext(GoBackContext);
  if (context === undefined) {
    throw new Error('useGoBackContext must be used within a GoBackContextProvider');
  }
  return context;
};
