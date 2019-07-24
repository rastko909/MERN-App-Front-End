import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

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

    setTimeout(() => { functions.setView({ name: "openclaims" }) }, 5000);

  } catch (error) {
    console.log("Caught an error requesting data to be seeded:\n", error.message);
  }
}

const logout = async (functions) => {
  try {
    let response = await axios.get(process.env.REACT_APP_API_URL + '/admin/logout');
    console.log("Here's the logout response:", response.data);
  } catch (error) {
    console.log("Caught an error logging out:\n", error.message);
  } finally {
    functions.setView({ name: 'logout' });
  }
}

export default function NavBar({ functions }) {

  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            <i className="fas fa-hands-helping icon"></i>
            Adminstration Dashboard
          </Typography>
          <Button color="inherit" onClick={() => seedData(functions)}><strong>DELETE AND SEED DATA</strong></Button>
          <Button color="inherit" onClick={() => logout(functions)}>Logout</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}