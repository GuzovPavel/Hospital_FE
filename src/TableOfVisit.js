import React, { useState } from "react";
import {
  withStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const createData = (name, date, doctor, complaint, editing) => {
  return { name, date, doctor, complaint, editing };
};

const rows = [createData("Имя", "Дата", "Врач", "Жалоба", "Редактирование")];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableOfVisit = ({ visits, setVisits }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const onClickDel = (index) => {
    setOpen(true);
    setEditIndex(-1);
    setDeleteIndex(index);
  };

  const handleDeleteVisit = (id) => {
    let temp = [...visits];
    temp = temp.filter((item) => item._id !== id);

    setVisits(temp);
    setDeleteIndex(-1);
    setOpen(false);
  };

  const handleClose = () => {
    setDeleteIndex(-1);
    setOpen(false);
  };

  const onClickEdit = (index) => {
    setOpen(true);
    setDeleteIndex(-1);
    setEditIndex(index);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          {rows.map((collumn) => (
            <TableRow>
              <StyledTableCell align="center">{collumn.name}</StyledTableCell>
              <StyledTableCell align="center">{collumn.date}</StyledTableCell>
              <StyledTableCell align="center">{collumn.doctor}</StyledTableCell>
              <StyledTableCell align="center">
                {collumn.complaint}
              </StyledTableCell>
              <StyledTableCell align="center">
                {collumn.editing}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {visits.map((row, index) => (
            <StyledTableRow key={`visit-${index}`}>
              <StyledTableCell align="center">
                {row.patientName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.visitDate}</StyledTableCell>
              <StyledTableCell align="center">{row.doctorName}</StyledTableCell>
              <StyledTableCell align="center">{row.complaint}</StyledTableCell>
              <StyledTableCell align="center">
                <DeleteIcon onClick={() => onClickDel(index)} />
                <EditIcon onClick={() => onClickEdit(index)} />
              </StyledTableCell>
              {deleteIndex >= 0 && (
                <DeleteDialog
                  open={open}
                  setOpen={setOpen}
                  onDeleteVisit={handleDeleteVisit}
                  onClose={handleClose}
                  visit={visits[deleteIndex]}
                  setVisits={setVisits}
                  visits={visits}
                />
              )}
              {editIndex >= 0 && (
                <EditDialog
                  open={open}
                  setOpen={setOpen}
                  visits={visits}
                  visit={visits[editIndex]}
                  setVisits={setVisits}
                  index={editIndex}
                  setEditIndex={setEditIndex}
                />
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOfVisit;
