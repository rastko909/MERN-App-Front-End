import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

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

const createData = (businessId, name, claimId, status, date, priority) => {
  return { businessId, name, claimId, status, date, priority };
}

const rows = [];
  
const getClaims = async (props) => {
  try {
    const claims = await axios.get(process.env.REACT_APP_API_URL + '/admin/dashboard')
    console.log("Here's the claims!", claims.data);
    // createData
    for(let claim of claims.data) {
      rows.push(createData(claim.businessId, '{getBusinessName}', claim.claimId, claim.status, claim.timestamps.createdAt, '{PRIORITY}'));
    }

    // return claims
  } catch (error) {
    console.log(error)
  } finally {
    props.setView("test")
  }
}


export default function ClaimsList(props) {
  const classes = useStyles();
  // const [, updateState] = React.useState();

  console.log("REST:", props);

  useEffect(() => {
    if (rows.length < 1)
      getClaims(props);
  }, [props]) 

  // if (rows.length < 1)
  //   return null;

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