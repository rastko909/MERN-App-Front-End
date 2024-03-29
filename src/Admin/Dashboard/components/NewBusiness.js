import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Container, Typography, makeStyles, Paper } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';

import './NewBusiness.css'

axios.defaults.withCredentials = true;

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    // marginTop: theme.spacing(8),
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

export default function NewBusiness({ view, functions }) {
  const [businessName, setBusinessName] = useState('');
  const [abn, setAbn] = useState('');

  const classes = useStyles();
  
  const handleSubmit = (e) => {
    console.log(businessName);
    console.log(abn);
    e.preventDefault();
    createBusiness(businessName, abn);
  }

  const createBusiness = async (businessName, abn) => {
    const data = { businessName, abn }

    try {
      let response = await axios.post(process.env.REACT_APP_API_URL + '/business/new', data);
      console.log(response);
      functions.setView({ name: "viewbusiness", id: response.data.id });
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper className={'paper'}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add New Business
      </Typography>
      <form className={classes.form} noValidate>

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="business_name"
        label="Business Name"
        name="business_name"
        autoComplete="business_name"
        autoFocus
        onChange={(e) => setBusinessName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="business_abn"
        label="Business ABN"
        name="business_abn"
        autoComplete="business_abn"
        onChange={(e) => setAbn(e.target.value)}
      />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Register Business
        </Button>
      </form>
    </div>
  </Container>
  </Paper>
  )
}
