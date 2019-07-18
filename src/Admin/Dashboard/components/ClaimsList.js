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

axios.defaults.withCredentials = true;

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

const handleClick = (id) => {
  alert("Hey, you just clicked " + id);
}

const createData = (id, name, businessId, status, date, priority) => {
  return {id, name, businessId, status, date, priority };
}

const rows = [];
  
const getClaims = async (functions) => {
  try {
    const claims = await axios.get(process.env.REACT_APP_API_URL + '/admin/dashboard');
    let businessName = undefined;
    
    for(let claim of claims.data) {
      const businessId = claim.businessId;

      try {
        const business = await axios.get(process.env.REACT_APP_API_URL + '/business/find', {headers: {id: businessId}})
        console.log("Here's the business name:", business.data);
        businessName = business.data.name;
      } catch (error) {
        console.log(error.message);
      } finally {
        rows.push(createData(claim.id, businessName, claim.businessId, functions.convertStatus(claim.status), claim.timestamps.createdAt, functions.convertPriority(claim.priority)));
      }
    }

  } catch (error) {
    console.log("An exception was caught:", error);
  } finally {
    functions.setView("home");
  }
}


export default function ClaimsList({ functions }) {
  const classes = useStyles();
  
  useEffect(() => {
    if (rows.length < 1)
      getClaims(functions);
  }, [functions]) 

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Claim ID</TableCell>
            <TableCell>Business Name</TableCell>
            <TableCell align="center">Business ID</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Lodgement Date</TableCell>
            <TableCell align="right">Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} className="table-row">
              <TableCell><span onClick={() => handleClick(row.id)} className={'monospaced'}>{row.id}</span></TableCell>
              <TableCell onClick={() => handleClick(row.businessId)} align="left">{row.name}</TableCell>
              <TableCell align="center">
                <span onClick={() => handleClick(row.businessId)} className={'monospaced'}>{row.businessId}</span>
              </TableCell>
              <TableCell align="center"><span className={'status ' + row.status}>{row.status}</span></TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right"><span className={'priority'}>{row.priority}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}