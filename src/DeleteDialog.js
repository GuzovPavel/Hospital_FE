import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";

const DeleteDialog = ({ open, onDeleteVisit, visit, onClose }) => {
  const onClickAgree = async () => {
    const token = localStorage.getItem("token");
    await axios
      .delete(`/visit/deleteVisit?_id=${visit._id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        onDeleteVisit(visit._id);
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Вы действительно хотите удалить запись?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Если вы удалите запись, восстановить ее будет невозможно, подумайте
            об этом
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отменить
          </Button>
          <Button onClick={() => onClickAgree()} color="primary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteDialog;
