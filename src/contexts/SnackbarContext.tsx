import React from "react";

interface SnackbarContextType {
  text: string;
  openSnackbar: (message?: string) => void;
  opened: boolean;
  closeSnackbar: () => void;
}

export const SnackbarContext = React.createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [opened, setOpenSnackbar] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>("");
  const openSnackbar = (message = "") => {
    setText(message);
    setOpenSnackbar(true);
  };
  const closeSnackbar = () => {
    setOpenSnackbar(false);
    setText("");
  }

  return (<SnackbarContext.Provider value={{
    text,
    openSnackbar,
    opened,
    closeSnackbar,
  }}>
    {children}
  </SnackbarContext.Provider>);
};

export const useSnackbarContext = (): SnackbarContextType => {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbarContext must be used within a SnackbarContextProvider');
  }
  return context;
};
