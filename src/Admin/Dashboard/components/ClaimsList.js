import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './ClaimsList.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function createData(businessId, name, claimId, status, date, priority) {
  return { businessId, name, claimId, status, date, priority };
}

const rows = [
  createData('COA123', 'Coder Academy', '009120', 'new', '27/08/2019', 'urgent'),
  createData('COA123', 'Coder Academy', '009120', 'open', '27/08/2019', 'high'),
  createData('COA123', 'Coder Academy', '009120', 'pending', '27/08/2019', 'medium'),
  createData('COA123', 'Coder Academy', '009120', 'pending', '27/08/2019', 'low'),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Business ID</TableCell>
            <TableCell align="right">Business Name</TableCell>
            <TableCell align="right">Claim ID </TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Lodgement Date</TableCell>
            <TableCell align="right">Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.businessId}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.claimId}</TableCell>
              <TableCell align="right"><span className={'status ' + row.status}>{row.status}</span></TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right"><span className={'priority'}>{row.priority}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}