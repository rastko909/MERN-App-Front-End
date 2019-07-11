import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Container, Typography, makeStyles } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

class AdminLogin extends React.Component {
  state = {} 

  // useStyles = makeStyles(theme => ({
  //   '@global': {
  //     body: {
  //       backgroundColor: theme.palette.common.white,
  //     },
  //   },
  //   paper: {
  //     marginTop: theme.spacing(8),
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //   },
  //   avatar: {
  //     margin: theme.spacing(1),
  //     backgroundColor: theme.palette.secondary.main,
  //   },
  //   form: {
  //     width: '100%', // Fix IE 11 issue.
  //     marginTop: theme.spacing(1),
  //   },
  //   submit: {
  //     margin: theme.spacing(3, 0, 2),
  //   },
  // }));

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  
  handleSubmit = (event) => {
    event.preventDefault();
    this.sendLogin();
  }

  render = () => { 
    // const classes = this.useStyles();
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={'classes.paper'}>
        <Avatar className={'classes.avatar'}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Portal
        </Typography>
        <form className={'classes.form'} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={'classes.submit'}
            onClick={this.handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    )
  }
}
export default AdminLogin;
