import React from 'react';

interface SnackbarContextType {
  text: string;
  openSnackbar: (message?: string) => void;
  opened: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default React.createContext<SnackbarContextType>({
  text: '',
  openSnackbar: () => {},
  opened: false,
  setOpenSnackbar: () => {},
});

interface OpenSnackBarReturn {
  text: string;
  useSnackbar: {
    openSnackbar: (message?: string) => void;
  };
  opened: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function OpenSnackBar(): OpenSnackBarReturn {
  const [opened, setOpenSnackbar] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const useSnackbar = React.useMemo(
    () => ({
      openSnackbar: (message = '') => {
        setText(message);
        setOpenSnackbar(true);
      },
    }),
    [],
  );
  return {
    text, useSnackbar, opened, setOpenSnackbar,
  };
}
