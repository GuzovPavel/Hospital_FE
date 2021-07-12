import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";

const EditDialog = ({
  open,
  setOpen,
  visits,
  setVisits,
  index,
  visit,
  setEditIndex,
}) => {
  const [currentDoctor, setCurrentDoctor] = useState(visit.doctorName);
  const [valueName, setValueName] = useState(visit.patientName);
  const [valueCurrent, setValueCurrent] = useState(visit.complaint);
  const [selectedDate, setSelectedDate] = useState(visit.visitDate);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditIndex(-1);
    setOpen(false);
  };

  const onClickSave = async () => {
    const token = localStorage.getItem("token");
    await axios
      .patch(
        "/visit/changeVisit",
        {
          patientName: valueName,
          visitDate: selectedDate,
          doctorName: currentDoctor,
          complaint: valueCurrent,
          _id: visits[index]._id,
        },
        { headers: { authorization: token } }
      )
      .then((res) => {
        visits[index] = res.data.changingVisit;
        setVisits(visits);
      });
    handleClose();
  };

  const doctors = [
    "Нефедов Сергей Васильевич",
    "Шайхмагомедов Денис Магомедович",
    "Астафьев Виталий Андреевич",
  ];

  const handleChange = (event) => {
    setCurrentDoctor(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Изменить запись</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Имя"
            value={valueName}
            onChange={(e) => setValueName(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            type="date"
            fullWidth
          />
          <Select
            labelId="demo-mutiple-name-label"
            value={currentDoctor}
            onChange={handleChange}
            input={<Input />}
          >
            {doctors.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            id="name"
            label="Жалоба"
            value={valueCurrent}
            onChange={(e) => setValueCurrent(e.target.value)}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отменить
          </Button>
          <Button onClick={onClickSave} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditDialog;
