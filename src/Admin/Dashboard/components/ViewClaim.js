import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  const [priority, setPriority] = React.useState('');
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    view.data.priority = event.target.value;
    setPriority(event.target.value);
  }

  function handlePriorityClose() {
    setOpen(false);
  }

  function handlePriorityOpen() {
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
        <h1>{claim.id}</h1>

        <form autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="priority-select">Priority</InputLabel>
            <Select
              open={open}
              onClose={handlePriorityClose}
              onOpen={handlePriorityOpen}
              value={view.data.priority}
              onChange={handleChange}
              inputProps={{
                name: 'priority',
                id: 'priority-select',
              }} >
              <MenuItem value={3}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={1}>High</MenuItem>
              <MenuItem value={0}>Urgent</MenuItem>
            </Select>
          </FormControl>
        </form>
        <h3>Categories</h3>
        {Object.values(claim.categories).map((category, index) => {
          return <p key={index}>{category.label}</p>
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