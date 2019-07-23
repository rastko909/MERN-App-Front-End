import React from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom';

import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography, /*InputBase*/ } from '@material-ui/core/';
// import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}))

const seedData = async (functions) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/seed');
    console.log("Seed data response:", response);

    setTimeout(() => {functions.setView({ name: "openclaims" })}, 5000);
    
  } catch(error) {
    console.log("Caught an error requesting data to be seeded:\n", error.message);
  }
}

const logout = async () => {
  try {
    let response = await axios.get(process.env.REACT_APP_API_URL + '/admin/logout');
    console.log("Here's the logout response:", response.data);
  } catch(error) {
    console.log("Caught an error logging out:\n", error.message);
  } finally {
    return <Redirect to='/' />
  }
}

export default function NavBar({functions}) {

  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
          <i className="fas fa-hands-helping icon"></i>
          Adminstration Dashboard</Typography>
          <Button color="inherit" onClick={() => functions.setView({ name: 'newbusiness' })}>Create Business</Button>
          <Button color="inherit" onClick={() => functions.setView({ name: 'newclaim' })}>Create Claim</Button>
          <Button color="inherit" onClick={() => seedData(functions)}><strong>DELETE AND SEED DATA</strong></Button>
          <Button color="inherit" onClick={async() => {logout()}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}