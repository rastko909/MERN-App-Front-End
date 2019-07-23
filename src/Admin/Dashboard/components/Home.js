
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavBar from './NavBar';
import SideBar from './SideBar';

import ClaimsList from './ClaimsList';
import BusinessesList from './BusinessesList';

import ViewClaim from './ViewClaim';
import ViewBusiness from './ViewBusiness';

import NewBusiness from './NewBusiness';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Home({view, functions}) {
  const classes = useStyles();
  console.log("view.name is set to:", view.name);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar functions={functions} />
      <SideBar view={view} functions={functions} />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {view.name === "openclaims" && <ClaimsList view={view} functions={functions} />}
        {view.name === "businesses" && <BusinessesList view={view} functions={functions} />}
        {view.name === "viewclaim" && <ViewClaim view={view} functions={functions} />}
        {view.name === "viewbusiness" && <ViewBusiness view={view} functions={functions} />}
        {/* {view.name === "newbusiness" && <NewClaim view={view} functions={functions} />} */}
        {view.name === "newbusiness" && <NewBusiness view={view} functions={functions} />}
      </main>
       
    </div>
  );
}