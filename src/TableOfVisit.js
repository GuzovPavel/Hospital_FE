import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
          <TableRow>
            <StyledTableCell align="center">Имя</StyledTableCell>
            <StyledTableCell align="center">Дата</StyledTableCell>
            <StyledTableCell align="center">Врач</StyledTableCell>
            <StyledTableCell align="center">Жалоба</StyledTableCell>
            <StyledTableCell align="center">Редактирование</StyledTableCell>
          </TableRow>
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
                {console.log(editIndex)}
                {editIndex >= 0 && (
                  <EditDialog
                    open={open}
                    setOpen={setOpen}
                    visits={visits}
                    visit={visits[editIndex]}
                    setVisits={setVisits}
                    index={editIndex}
                    setEditIndex={setEditIndex}
                    // visit={visits[editIndex]}
                  />
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOfVisit;
