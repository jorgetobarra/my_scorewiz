import { React, useContext } from 'react';
import { Snackbar, Button } from '@mui/material';
import SnackbarContext from '../../contexts/SnackbarContext';

export default function CustomSnackBar() {
  const { text, opened, setOpenSnackbar } = useContext(SnackbarContext);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={opened}
      autoHideDuration={3000}
      message={text}
      action={(
        <Button color="inherit" size="small" onClick={() => setOpenSnackbar(false)}>
          Close
        </Button>
            )}
      onClose={() => setOpenSnackbar(false)}
      key="snackbar"
    />
  );
}
CustomSnackBar.defaultProps = {
};
