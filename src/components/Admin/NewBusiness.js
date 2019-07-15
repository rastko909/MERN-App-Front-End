import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Container, Typography, makeStyles } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';

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

export default function NewBusiness() {
  const [businessID, setBusinessID] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [abn, setAbn] = useState('');

  const classes = useStyles();
  
  const handleSubmit = (e) => {
    console.log(businessID);
    console.log(businessName);
    console.log(abn);
    e.preventDefault();
    createBusiness(businessID, businessName, abn);
  }

  const createBusiness = async (businessID, businessName, abn) => {
    const data = { businessID, businessName, abn }
    let response;
    try {
      response = await axios.post(process.env.REACT_APP_API_URL + '/admin/business/new', data, { withCredentials: true });
    }
    catch (error) {
      console.log(error);
    }
    finally {
      console.log(response);
    }
  }

  return (
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
          id="business_abn"
          label="Business ABN"
          name="business_abn"
          autoComplete="business_abn"
          autoFocus
          onChange={(e) => setBusinessID(e.target.value)}
        />
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
          id="business_id"
          label="Asssign Business ID"
          name="business_id"
          autoComplete="business_id"
          autoFocus
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
  )
}
