import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const StyledTableContainer = styled(TableContainer)`
  margin-bottom: 15px;
`;

function Row({ row, index }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell component="th" scope="row">
          {row.question}
        </TableCell>
        {row.type === 1 && (
          <TableCell align="center">{row.answer ? "True" : "False"}</TableCell>
        )}
        {row.type === 4 && <TableCell align="center">{row.answer}</TableCell>}
        {(row.type === 2 || row.type === 3) && (
          <TableCell align="center">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        <TableCell align="center">{row.points}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <colgroup>
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "50%" }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(row.answer) &&
                    row.answer.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" component="th" scope="row">
                          {item.answer}
                        </TableCell>
                        <TableCell align="center">
                          {item.correct ? (
                            <CheckCircleOutlineIcon style={{ fill: "green" }} />
                          ) : (
                            <HighlightOffIcon style={{ fill: "red" }} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function QuestionTable({ rows }) {
  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Question</TableCell>
            <TableCell align="center">Answer</TableCell>
            <TableCell align="center">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={row.id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
