import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';
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
  console.log("Businesses handleClick:", id);
  if (type === "business")
    functions.setView({ name: 'viewclaim', id: id, data: undefined })
  else if (type === "business")
    functions.setView({ name: 'viewbusiness', id: id, data: undefined })
}

const rows = [];

const createBusinessRow = (id, name, abn, claims) => {
  return { id, name, abn, claims };
}

const getBusinesses = async (functions) => {
  try {
    let allBusinesses = await axios.get(process.env.REACT_APP_API_URL + '/business/all');
    const businessObject = await Object.assign({}, allBusinesses.data.businessArray);
    if (businessObject) {
      Object.values(businessObject).map((business) => {
        let bus = business.business;
        let claims = business.claimsCount;
        return rows.push(createBusinessRow(bus.id, bus.name, bus.abn, claims));
      })
    }
  }
  catch (error) {
    console.log('Error retrieving businesses: ', error.message);
  }
  finally {
    functions.setView({name: "businesses", id: undefined, data: rows});
  }
}


export default function BusinessesList({ functions }) {
  const classes = useStyles();

  useEffect(() => {
    if (rows.length < 1)
    getBusinesses(functions);
  }, [functions]);

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Business ID</TableCell>
              <TableCell align="right">Business Name</TableCell>
              <TableCell align="right">Business ABN</TableCell>
              <TableCell align="right">No. Of Claims</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} onClick={(e) => handleClick(e, row.id, functions, "claim")} className="table-row" >
                <TableCell><span onClick={(e) => handleClick(e, row.id, functions, "claim")} className={'monospaced link-hover'}>{row.id}</span></TableCell>
                <TableCell align="right"><span onClick={(e) => handleClick(e, row.businessId, functions, "business")} className={'link-hover'}>{row.name}</span></TableCell>
                <TableCell align="right">
                  <span onClick={(e) => handleClick(e, row.businessId, functions, "business")} className={'monospaced link-hover'}>{row.abn}</span>
                </TableCell>
                <TableCell align="right">{row.claims}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}