import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Container, Typography, makeStyles } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';

axios.defaults.withCredentials = true;

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {

  const [form, setValues] = useState({
    email: '',
    password: '',
    valid: true
  })

  // const [flag, setFlag] = useState(true);

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    adminLogin(form.email, form.password);
  }

  const updateField = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const adminLogin = async (email, password) => {
    const data = { email, password }
    let response;
    try {
      response = await axios.post(process.env.REACT_APP_API_URL + '/admin/login', data, {withCredentials: true});
      console.log("This is the adminLogin response:", response);
    }
    catch (error) {
      console.log('Error in catch: ', error);
    }

    if (!response || response.status !== 200) {
      alert('Unauthorized.')
    } else if (response.status === 200) {
      props.history.push('/admin/dashboard/');
    }
  }

  // review when i understand hookds better 
  // useEffect(() => { 
  //   if (document.cookie) {
  //     props.history.push('/admin/dashboard')
  //   }
  //  }, [])

  console.log("I AM RIGHT BEFORE THE RENDER!!!!!!!");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* {form.valid ? null : <AlertDialog message={'Invalid credentials.'} />}  */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Portal
        </Typography>
        {/* <form className={classes.form} method="post" noValidate> */}
        <form className={classes.form}>
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
            onChange={updateField}
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
            onChange={updateField}
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
            className={classes.submit}
            onClick={handleSubmit}
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
