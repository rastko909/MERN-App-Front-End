import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, FormControlLabel } from '@material-ui/core/';

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
  try {
    let claimId = view.id;
    const claim = await axios.get(process.env.REACT_APP_API_URL + '/claim/find', {headers: {id: claimId}});
    console.log("Here's the claim data response", claim.data);
    functions.setView({ name: "viewclaim", id: claim.data.id, data: claim.data });
  } catch (error) {

  } finally {

  }
}

const updatePriority = async (view) => {
  try {
    let claimId = view.id;
    const response = await axios.post(process.env.REACT_APP_API_URL + '/claim/update/priority', {id: claimId, priority: view.data.priority});
    console.log("Axios updateprioty reponse", response);
  } catch (error) {

  }
}

const updateStatus = async (view) => {
  try {
    let claimId = view.id;
    const response = await axios.post(process.env.REACT_APP_API_URL + '/claim/update/status', {id: claimId, status: view.data.status});
    console.log("Axios updateprioty reponse", response);
  } catch (error) {

  }
}

const addComment = async (view, comment) => {
  try {
    let claimId = view.id;
    const response = await axios.post(process.env.REACT_APP_API_URL + '/claim/add/comment', {id: claimId, comment: comment});
    console.log("Axios updateprioty reponse", response);
  } catch (error) {

  }
}

export default function ViewClaim({ view, functions }) {
  const classes = useStyles();
  const [priority, setPriority] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [openPriority, setOpenPriority] = React.useState(false);
  const [openStatus, setOpenStatus] = React.useState(false);
  const [comment, setComment] = React.useState('');

  function handlePriorityChange(event) {
    view.data.priority = event.target.value;
    updatePriority(view);
    setPriority(event.target.value);
  }

  function handleAddComment() {
    addComment(view, comment)
  }

  function handlePriorityClose() {
    setOpenPriority(false);
  }

  function handlePriorityOpen() {
    setOpenPriority(true);
  }

  function handleCommentUpdate(event) {
    setComment(event.target.value);
  }

  function handleStatusChange(event) {
    view.data.status = event.target.value;
    updateStatus(view);
    setStatus(event.target.value);
  }

  function handleStatusClose() {
    setOpenStatus(false);
  }

  function handleStatusOpen() {
    setOpenStatus(true);
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
              open={openPriority}
              onClose={handlePriorityClose}
              onOpen={handlePriorityOpen}
              value={view.data.priority}
              onChange={handlePriorityChange}
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

        <form autoComplete="off">
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="status-select">Status</InputLabel>
            <Select
              open={openStatus}
              onClose={handleStatusClose}
              onOpen={handleStatusOpen}
              value={view.data.status}
              onChange={handleStatusChange}
              inputProps={{
                name: 'status',
                id: 'status-select',
              }} >
              <MenuItem value={0}>New</MenuItem>
              <MenuItem value={1}>Open</MenuItem>
              <MenuItem value={2}>Pending</MenuItem>
              <MenuItem value={3}>Closed</MenuItem>
            </Select>
          </FormControl>
        </form>

        
        <div id={'comments'} className='comments'>
          <div>Add Comment</div>
        </div>
        <FormControlLabel className='answer'
          control={<TextareaAutosize
          onChange={handleCommentUpdate}
          id={'addComment'} // + props.index}
          className='answer'
          aria-label="Minimum height"
          rows={5} />}
          labelPlacement='top'
        />
        <Button className="submit-btn" variant="contained" onClick={() => handleAddComment(view, functions)} color="primary">Submit</Button>

        <h3>Comments</h3>
        {Object.values(claim.comments).map((comment, index) => {
          return <p key={index}>{comment.timestamp}: {comment.text}</p>
        })}

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