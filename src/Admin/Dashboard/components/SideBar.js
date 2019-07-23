import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
  small: {
    fontSize: '0.9rem',
  },
  toolbar: theme.mixins.toolbar,
}))


export default function SideBar({ view, functions }) {
  const classes = useStyles();

  const [openClaim, setOpenClaim] = React.useState(true);
  const [openBusiness, setOpenBusiness] = React.useState(true);

  function handleClaim() {
    setOpenClaim(!openClaim);
  }

  function handleBusiness() {
    setOpenBusiness(!openBusiness);
  }

  return (
    <>
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }}>
        <div className={classes.toolbar} />
        <List>
          <ListItem button onClick={handleClaim}>
            <ListItemIcon><ViewListIcon /></ListItemIcon>
            <ListItemText primary='Claims' />
            {openClaim ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openClaim} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText disableTypography onClick={() => functions.setView({ name: 'openclaims' })} primary="View Claims" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText disableTypography onClick={() => functions.setView({ name: 'newclaim' })}  primary="Create Claim" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handleBusiness}>
            <ListItemIcon><BallotIcon /></ListItemIcon>
            <ListItemText primary='Businesses' />
            {openBusiness ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBusiness} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText disableTypography onClick={() => functions.setView({ name: 'businesses' })} primary="View Businesses" />
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemText disableTypography onClick={() => functions.setView({ name: 'newbusiness' })} primary="Create Business" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  );
}