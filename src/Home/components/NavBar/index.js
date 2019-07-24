import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// import { white } from '@material-ui/core/colors';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ffffff' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {

  const classes = useStyles();

  const handleOnClick = (event) => {
    console.log(props)
  }

  return (
    <div className={classes.root}>
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <i className="fas fa-hands-helping icon"></i>
            Disclosure Platform
          </Typography>
          <Button onClick={handleOnClick} color="inherit">Home</Button>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Your Rights</Button>
          <Button color="inherit">FAQ</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </div>
  );
}