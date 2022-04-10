import React from 'react';

export default React.createContext({
  text: '', openSnackbar: () => {}, opened: false, setOpenSnackbar: () => {},
});

export function OpenSnackBar() {
  const [opened, setOpenSnackbar] = React.useState(false);
  const [text, setText] = React.useState('');
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
