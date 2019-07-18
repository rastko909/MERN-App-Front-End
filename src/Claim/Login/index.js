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
import ViewClaim from '../View';

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

  // FOR STYLING AND TESTING - RASTKO

  // busid: CVY426
  // secretkey: QJGA3KKV
  // const dudClaim = {
  //   comments: [],
  //   attachments: [],
  //   _id: 'wahtever',
  //   id: 'Y6R7XJHP',
  //   businessId: 'CVY426',
  //   disclosureLevel: '1',
  //   categories: { misconduct: true, health: true, influence: true },
  //   details: {
  //     answer_1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_5: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_6: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_7: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_8: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_9: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_10: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_11: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_12: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_13: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_14: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_15: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_16: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     answer_17: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  //       'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
  //       'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  //       'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
  //       'in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
  //       'nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
  //       'sunt in culpa qui officia deserunt mollit anim id est laborum.'
  //   },
  //   status: 'new',
  //   confirmed: true,
  //   timestamps: {
  //     createdAt: 'Thu Jul 18 2019 12:12:36 GMT+1000 (Australian Eastern Standard Time)',
  //     updatedAt: 'Thu Jul 18 2019 12:12:36 GMT+1000 (Australian Eastern Standard Time)',
  //     actionedAt: 'undefined',
  //     closedAt: 'undefined'
  //   },
  //   secretKey: '$2b$10$piEIT2TI8k9hAK9Q5dk20emwXdC9ngk17K8xygX7YGLSbtWVlQSRW',
  //   __v: 0
  // }

  const renderLogin = () => {
    // FOR STYLING AND TESTING - RASTKO

    // setClaimData(dudClaim)
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

  return (
    <>
      {claimData === null ? renderLogin() : <ViewClaim data={claimData} />}
    </>
  );
}