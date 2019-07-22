import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';

import ViewListIcon from '@material-ui/icons/ViewList';
import BallotIcon from '@material-ui/icons/Ballot';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
}))

export default function SideBar({functions}) {
  const classes = useStyles();

  return (
    <>
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }}>
      <div className={classes.toolbar} />
        <List>
          <ListItem button onClick={() => functions.setView({ name: 'openclaims' })}>
            <ListItemIcon><ViewListIcon /></ListItemIcon>
            <ListItemText primary='Claims' />
          </ListItem>
          <ListItem button onClick={() => functions.setView({ name: 'businesses' })}>
            <ListItemIcon><BallotIcon /></ListItemIcon>
            <ListItemText primary='Businesses' />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}