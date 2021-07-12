import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import "date-fns";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "../App.scss";
import moment from "moment";
import { Button } from "@material-ui/core";
import axios from "axios";
import SnackBar from "../SnackBar";

axios.defaults.baseURL = "http://localhost:8000/";

const TaskBar = ({ visits, setVisits }) => {
  window.localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState("");
  const [valueName, setValueName] = useState("");
  const [valueCurrent, setValueCurrent] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    moment().format("yyyy-MM-DD")
  );
  const doctors = [
    "Нефедов Сергей Васильевич",
    "Шайхмагомедов Денис Магомедович",
    "Астафьев Виталий Андреевич",
  ];

  const handleChange = (event) => {
    setCurrentDoctor(event.target.value);
  };

  const getElement = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("/visit/allVisits", { headers: { authorization: token } })
      .then((res) => {
        setVisits(res.data.data);
      });
  };

  useEffect(() => getElement(), []);

  const onClickAdd = async () => {
    const token = localStorage.getItem("token");
    if (valueName && selectedDate && currentDoctor && valueCurrent) {
      await axios
        .post(
          "/visit/newVisit",
          {
            patientName: valueName,
            visitDate: selectedDate,
            doctorName: currentDoctor,
            complaint: valueCurrent,
          },
          { headers: { authorization: token } }
        )
        .then((res) => {
          const newVisit = [...visits];
          newVisit.push(res.data.visit);
          setVisits(newVisit);
          setCurrentDoctor("");
          setValueName("");
          setValueCurrent("");
          setSelectedDate(moment().format("yyyy-MM-DD"));
        });
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="TaskBar">
      <div class="inputName">
        <span>Имя:</span>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
        />
      </div>
      <div class="InputDate">
        <span>Дата:</span>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div class="inputDoctor">
        <span> Врач: </span>
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
      </div>
      <div class="inputComplaint">
        <span>Жалобы</span>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={valueCurrent}
          onChange={(e) => setValueCurrent(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        href="#contained-buttons"
        onClick={() => onClickAdd()}
      >
        <span>Добавить</span>
      </Button>
      <SnackBar open={open} setOpen={setOpen} message={"Заполните все поля"} />
    </div>
  );
};

export default TaskBar;
