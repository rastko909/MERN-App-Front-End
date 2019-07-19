import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import axios from 'axios';
axios.defaults.withCredentials = true;

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const getClaimData = async (functions, view) => {
  let claimId = view.id;

  try {
    const claim = await axios.get(process.env.REACT_APP_API_URL + '/claim/find', {headers: {id: claimId}});
    console.log("Here's the claim data response", claim.data);
    functions.setView({ name: "viewclaim", id: claim.data.id, data: claim.data });
  } catch (error) {

  } finally {
  }
}

export default function ViewClaim({ view, functions }) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setAge(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  useEffect(() => {
    if (!view.data)
      getClaimData(functions, view);

  }, [functions, view])

  const renderClaimData = () => {
    if (!view.data)
      return null;

    const claim = view.data;

    return (
      <>
        <form autoComplete="off">
          <Button className={classes.button} onClick={handleOpen}>
            Open the select
          </Button>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select">Age</InputLabel>
            <Select
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={age}
              onChange={handleChange}
              inputProps={{
                name: 'age',
                id: 'demo-controlled-open-select',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </form>
        
        <h1>{claim.id}</h1>

        <h3>Categories</h3>
        {Object.keys(claim.categories).map((category, index) => {
          return <p key={index}>{category}</p>
        })}

        <h3>Answers</h3>
        {Object.values(claim.details).map((answer, index) => {
          return <p key={index}>{answer}</p>
        })}
      </>
    );
  }

  return (
    <>
      {renderClaimData()}
    </>
  );
}



// <div className={'categories'}>
// {Object.keys(claimData.categories).map((category, index) => {
//   return (<p key={index}>{category}</p>);
// })}