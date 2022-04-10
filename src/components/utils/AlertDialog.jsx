import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({
  header, text, open, setOpen, yesText, noText, onYes, onNo,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    onYes();
    setOpen(false);
  };
  const handleDisagree = () => {
    onNo();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!!handleDisagree && <Button color="secondary" onClick={handleDisagree}>{noText}</Button>}
          {!!handleAgree && (
          <Button onClick={handleAgree} autoFocus>
            {yesText}
          </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
AlertDialog.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  yesText: PropTypes.string,
  noText: PropTypes.string,
  onYes: PropTypes.func,
  onNo: PropTypes.func,
};
AlertDialog.defaultProps = {
  yesText: 'Ok',
  noText: 'Cancel',
  onYes: () => {},
  onNo: () => {},
};
