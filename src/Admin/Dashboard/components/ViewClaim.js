import React, { useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, FormControlLabel, Paper } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';

import SubjectIcon from '@material-ui/icons/Subject';
import MessageIcon from '@material-ui/icons/Message';
import AttachmentIcon from '@material-ui/icons/Attachment';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Import styles
import './ViewClaim.css';


// Confirm Comment Dialog Box
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';

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
    color: 'white',
  },
  label: {
    color: 'white',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  adminBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  select: {
    '&:hover': {
      borderColor: 'white',
    },
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    }
  },
  icon: {
    fill: 'white',
  },
  claimExpand: {
    marginTop: '1rem',
  },
  bottom: {
    border: '0px',
  }
}));

const getClaimData = async (functions, view) => {
  try {
    let claimId = view.id;
    let claim = await axios.get(process.env.REACT_APP_API_URL + '/claim/find', { headers: { id: claimId } });
    console.log("Here's the claim data response", claim.data);
    claim.data.comments = claim.data.comments.reverse();
    functions.setView({ name: "viewclaim", id: claim.data.id, data: claim.data });
  } catch (error) {
    console.log("Caught an error requesting data:\n", error.message);
  }
}

const updatePriority = async (view) => {
  try {
    let claimId = view.id;
    const response = await axios.post(process.env.REACT_APP_API_URL + '/claim/update/priority', { id: claimId, priority: view.data.priority });
    console.log("Axios updateprioty reponse", response);
  } catch (error) {
    console.log("Caught an error requesting data:\n", error.message);
  }
}

const updateStatus = async (view) => {
  try {
    let claimId = view.id;
    const response = await axios.post(process.env.REACT_APP_API_URL + '/claim/update/status', { id: claimId, status: view.data.status });
    console.log("Axios updateprioty reponse", response);
  } catch (error) {
    console.log("Caught an error requesting data:\n", error.message);
  }
}

const addComment = async (view, comment, functions) => {
  try {
    let claimId = view.id;
    const response = await axios.post(process.env.REACT_APP_API_URL + '/claim/add/comment', { id: claimId, comment: comment });
    console.log("Axios updateprioty reponse", response);
    functions.setView({ name: 'viewclaim', id: claimId })
  } catch (error) {
    console.log("Caught an error requesting data:\n", error.message);
  }
}

export default function ViewClaim({ view, functions }) {

  const theme = useTheme();
  const classes = useStyles(); // eslint-disable-next-line
  const [priority, setPriority] = React.useState(''); // eslint-disable-next-line
  const [status, setStatus] = React.useState(''); 
  const [openPriority, setOpenPriority] = React.useState(false);
  const [openStatus, setOpenStatus] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [confirmComment, setConfirmComment] = React.useState(false);

  // tab stuff
  const [value, setValue] = React.useState(0);

  function handlePriorityChange(event) {
    view.data.priority = event.target.value;
    updatePriority(view);
    setPriority(event.target.value);
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

  function handleOpenConfirmComment() {
    setConfirmComment(true);
  }

  function handleCloseConfirmComment() {
    setConfirmComment(false);
  }

  function handleAcceptCommentConfirm() {
    addComment(view, comment, functions)
    setConfirmComment(false);
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  useEffect(() => {
    if (!view.data)
      getClaimData(functions, view);

  }, [functions, view])


  function renderComments(claim) {
    return (
      <>
        <h3>Comments</h3>
        {claim.comments.map((comment, index) => {
          return <p key={index}>{comment.timestamp}: {comment.text}</p>
        })}
      </>
    );
  }

  const renderClaimData = (props) => {
    if (!view.data)
      return null;

    const claim = view.data;
    const questions = view.data.questions;

    return (
      <>
        <AppBar color="default" className={classes.adminBar} position="static">
          <Tabs value={value} onChange={handleChange} aria-label="Simple tabs example">
            <Tab
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              label="Claim " icon={<SubjectIcon />} {...a11yProps(0)} />
            <Tab label="Comments" icon={<MessageIcon />} {...a11yProps(1)} />
            <Tab label="Attachments" icon={<AttachmentIcon />} {...a11yProps(2)} />
            <Tab disabled={true} className={classes.tabSpacer} />
          </Tabs>
          <div className="claim-options">
            <form autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="status-select">Priority</InputLabel>
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
          </div>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Paper className={classes.root}>
            <div className="table">
              <Table>
                <TableBody>
                  <TableRow hover={true}>
                    <TableCell><strong>Claim ID:</strong> </TableCell>
                    <TableCell>{claim.id}</TableCell>
                  </TableRow>
                  <TableRow hover={true}>
                    <TableCell><strong>Business ID:</strong> </TableCell>
                    <TableCell>{claim.businessId}</TableCell>
                  </TableRow>
                  <TableRow hover={true}>
                    <TableCell><strong>Lodgedment Date:</strong> </TableCell>
                    <TableCell>{claim.timestamps.createdAt}</TableCell>
                  </TableRow>
                  <TableRow className={classes.bottom} hover={true}>
                    <TableCell className={classes.bottom} ><strong>Categories: </strong> </TableCell>
                    <TableCell className={classes.bottom} >

                      {Object.values(claim.categories).map((category, index) => {
                        console.log(category)
                        return (
                          <span key={index} className="category">{category.label}</span>
                        )
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
            </div>
            </Paper>
            <ExpansionPanel className={classes.claimExpand}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>View Claim</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {Object.values(claim.details).map((answer, index) => {
                    return (
                      <div key={index} className="question-answer-container">
                        <div key={index} className="question">
                          <Typography component="p" key={index}><strong>Q{index + 1}: {questions[index]}</strong></Typography>
                        </div>
                        <div className="answer">
                          <Typography component="p" key={index}>{answer}</Typography>
                        </div>
                      </div>
                    )
                  })}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

        </TabPanel>
        <TabPanel value={value} index={1}>
          {claim.comments.length > 0 && renderComments(claim)}
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
          <Button className="submit-btn" variant="contained" onClick={() => handleOpenConfirmComment(view, functions)} color="primary">Submit</Button>
          <Dialog
            open={confirmComment}
            onClose={handleCloseConfirmComment}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"You are about to reply to a claim with this comment"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {comment}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmComment} color="primary">
                Cancel
            </Button>
              <Button onClick={handleAcceptCommentConfirm} color="primary" autoFocus>
                Submit
            </Button>
            </DialogActions>
          </Dialog>
        </TabPanel>
        <TabPanel value={value} index={2}>
          ATTACHMENTS GO HERE
        </TabPanel>
      </>
    );
  }

  return (
    <>
      {renderClaimData()}
    </>
  );
}