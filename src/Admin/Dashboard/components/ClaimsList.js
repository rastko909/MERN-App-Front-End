import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

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

const handleClick = (e, id, functions, type) => {
  e.stopPropagation();
  console.log("ClaimsList handleClick:", id);
  if (type === "claim")
    functions.setView({ name: 'viewclaim', id: id, data: undefined })
  else if (type === "business")
    functions.setView({ name: 'viewbusiness', id: id, data: undefined })
}

const createClaimRow = (id, businessName, businessId, status, date, priority) => {
  return { id, businessName, businessId, status, date, priority };
}

const getOpenClaims = async (functions) => {
  try {
    const rows = [];
    const claims = await axios.get(process.env.REACT_APP_API_URL + '/claim/all/open');

    for (let claim of claims.data)
      rows.push(createClaimRow(claim.id, claim.businessName, claim.businessId, functions.convertStatus(claim.status), claim.date, functions.convertPriority(claim.priority)));

  } catch (error) {
    console.log("An exception was caught:", error);
  } finally {
    functions.setView({ name: "openclaims", id: undefined, data: rows });
  }
}

export default function ClaimsList({ view, functions }) {
  const classes = useStyles();

  useEffect(() => {
    if (!view.data)
      getOpenClaims(functions);
  }, [functions]) 

  if (!view.data)
    return (<LinearProgress />);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Claim ID</TableCell>
            <TableCell align="right">Business Name</TableCell>
            <TableCell align="right">Business ID</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Lodgement Date</TableCell>
            <TableCell align="right">Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {view.data.map((row, index) => (
            <TableRow key={index} onClick={(e) => handleClick(e, row.id, functions, "claim")} className="table-row" >
              <TableCell><span onClick={(e) => handleClick(e, row.id, functions, "claim")} className={'monospaced link-hover'}>{row.id}</span></TableCell>
              <TableCell align="right"><span onClick={(e) => handleClick(e, row.businessId, functions, "business")} className={'link-hover'}>{row.businessName}</span></TableCell>
              <TableCell align="right">
                <span onClick={(e) => handleClick(e, row.businessId, functions, "business")} className={'monospaced link-hover'}>{row.businessId}</span>
              </TableCell>
              <TableCell align="right"><div className={'status ' + row.status}>{row.status}</div></TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="right"><span className={'priority'}>{row.priority}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}