import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, LinearProgress } from '@material-ui/core/';

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
  functions.setView({ name: 'viewbusiness', id: id, data: undefined })
}

const createBusinessRow = (id, name, abn, claims) => {
  return { id, name, abn, claims };
}

const getBusinesses = async (functions) => {
  const rows = [];

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


export default function BusinessesList({ view, functions }) {
  const classes = useStyles();

  useEffect(() => {
    if (!view.data)
    getBusinesses(functions);
  }, [view, functions]);

  if (!view.data)
    return <LinearProgress />

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
            {view.data.map((row, index) => (
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