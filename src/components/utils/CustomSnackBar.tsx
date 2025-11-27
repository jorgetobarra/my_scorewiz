import { Button, Snackbar } from "@mui/material";
import React from "react";
import { useSnackbarContext } from "../../contexts/SnackbarContext";

export default function CustomSnackBar(): React.ReactElement {
  const { text, opened, closeSnackbar } = useSnackbarContext();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={opened}
      autoHideDuration={3000}
      message={text}
      action={
        <Button color="inherit" size="small" onClick={closeSnackbar}>
          Close
        </Button>
      }
      onClose={closeSnackbar}
      key="snackbar"
    />
  );
}
