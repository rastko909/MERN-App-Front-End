
import React, { /*useEffect*/ } from 'react';
// import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewListIcon from '@material-ui/icons/ViewList';
import BallotIcon from '@material-ui/icons/Ballot';

import ClaimsList from './ClaimsList';
import BusinessesList from './BusinessesList';

import ViewClaim from './ViewClaim';
import ViewBusiness from './ViewBusiness';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Home({view, functions}) {
  const classes = useStyles();
  console.log("Home view values: (name/id/data)", view.name, view.id, view.data);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Adminstration Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }}>
        <div className={classes.toolbar} />
        <List>
          <ListItem button onClick={() => functions.setView({ name: 'claims' })}>
            <ListItemIcon><ViewListIcon /></ListItemIcon>
            <ListItemText primary='Claims' />
          </ListItem>
          <ListItem button onClick={() => functions.setView({ name: 'businesses' })}>
            <ListItemIcon><BallotIcon /></ListItemIcon>
            <ListItemText primary='Businesses' />
          </ListItem>
        </List>
      </Drawer>

       <main className={classes.content}>
        <div className={classes.toolbar} />
        {view.name === "claims" && <ClaimsList functions={functions} />}
        {view.name === "businesses" && <BusinessesList functions={functions} />}
        {view.name === "viewclaim" && <ViewClaim view={view} functions={functions} />}
        {view.name === "viewbusiness" && <ViewBusiness view={view} />}
       </main>
       
    </div>
  );
}