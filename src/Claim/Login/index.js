import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
// import AlertDialog from '../Shared/Alert';

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

export default function ClaimLogin(props) {

  const [businessId, setBusinessId] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [claimData, setClaimData] = useState(null);

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(businessId, secretKey);
  }

  const login = async (businessId, secretKey) => {
    const data = { businessId, secretKey }
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/claim/login', data);

      if (response.status !== 200)
        console.log(`{ RENDER VIEW FOR ERROR: ${response.status} }`);
      else {
        console.log("Authenticated, here's your data: ", response.data);
        setClaimData(response.data)
      }
    }
    catch (error) {
      console.log(`{ RENDER VIEW FOR ERROR: ${error.message} }`);
    }

  }

  const renderLogin = () => {
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Claims Portal
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="bus_id"
            label="Business ID"
            name="bus_id"
            autoComplete="bus_id"
            autoFocus
            onChange={e => setBusinessId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Secret Key"
            type="password"
            id="secret_key"
            autoComplete="current-password"
            onChange={e => setSecretKey(e.target.value)}
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
        </form>
      </div>
    </Container>
    );
  }

  const renderClaimData = () => {

    const { claimBusId, categories, details } = claimData;

    return (
      <div className="simple-container">
        <h1>Claim for {claimBusId}</h1>

        <h3>Categories:</h3>
        {Object.keys(categories).map((category, index) => {
          console.log("Category:", category);
          return <p key={index}>{category}</p>  
        })}

        <h3>Answers:</h3>
        {Object.values(details).map((answer, index) => {
          console.log("Answer:", answer);
          return (<p key={index}>{answer}</p>);
        })}
      </div>
    );
  }

  return (
    <>
      {claimData === null ? renderLogin() : renderClaimData()}
    </>
  );
}