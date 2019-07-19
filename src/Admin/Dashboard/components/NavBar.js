import React from 'react';
import axios from 'axios';

import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography, InputBase } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

    setTimeout(() => {functions.setView({ name: "openclaims" })}, 1500);
    
  } catch(error) {
    console.log("Caught an error requesting data to be seeded:\n", error.message);
  }
}

export default function NavBar({functions}) {

  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>Adminstration Dashboard</Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>

          <Button color="inherit" onClick={() => functions.setView({ name: 'newbusiness' })}>Create Business</Button>
          <Button color="inherit" onClick={() => functions.setView({ name: 'newclaim' })}>Create Claim</Button>
          <Button color="inherit" onClick={() => seedData(functions)}><strong>DELETE AND SEED DATA</strong></Button>
        </Toolbar>
      </AppBar>
    </>
  );
}