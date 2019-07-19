import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
}))

export default function NavBar({view, functions}) {

  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Adminstration Dashboard
        </Typography>
        <Button color="inherit" onClick={() => functions.setView({ name: 'newbusiness' })}>Create Business</Button>
        <Button color="inherit" onClick={() => functions.setView({ name: 'newclaim' })}>Create Claim</Button>
      </Toolbar>
      </AppBar>
    </>
  );
}