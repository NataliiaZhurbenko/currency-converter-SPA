import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_ERROR_DIALOG } from "../../store/types";

export default function ErrorDialog() {
  const [open, setOpen] = React.useState(false);
  const errorMessage = useSelector((state) => state.errorMessage);
  const dispatch = useDispatch();
  const isErrorDialogOpen = useSelector((state) => state.isErrorDialogOpen);

  useEffect(() => {
    setOpen(isErrorDialogOpen);
  }, [isErrorDialogOpen]);

  const handleClose = () => {
    dispatch({ type: CLOSE_ERROR_DIALOG });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">ERROR</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>{errorMessage}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
