import React, { useEffect } from 'react';

// Material UI depdencies 
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, FormControlLabel, Paper } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';

// Material UI icons
import SubjectIcon from '@material-ui/icons/Subject';
import MessageIcon from '@material-ui/icons/Message';
import AttachmentIcon from '@material-ui/icons/Attachment';


// Expansion Panel stuff
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Confirm comment dialog box
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';

import Comment from '../../Shared/Comment';
// Import CSS
import './index.css';

// Axios
import axios from 'axios';
axios.defaults.withCredentials = true;

// Styling for Material UI
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
  comments: {
    padding: '1rem',
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

export default function ViewClaim(props) {

  const classes = useStyles();

  const [comment, setComment] = React.useState('');
  const [confirmComment, setConfirmComment] = React.useState(false);
  const [newComments, setNewComments] = React.useState([]);

  const addComment = async (id, comment) => {
    try {
      let claimId = id;
      const response = await axios.post(process.env.REACT_APP_API_URL + '/claim/new/comment', { id: claimId, comment: comment, user: 'Claimant' });
      return response.data;
    } catch (error) {
      console.log("Caught an error requesting data:\n", error.message);
    }
  }

  // tab stuff
  const [value, setValue] = React.useState(0);

  // reference our comment input without messing with the state or render 
  const commentInput = React.createRef();

  function handleOpenConfirmComment() {
    setComment(commentInput.current.value);
    setConfirmComment(true);
  }

  function handleCloseConfirmComment() {
    setConfirmComment(false);
  }

  const handleAcceptCommentConfirm = async (id) => {
    let newComments = await addComment(id, comment);
    setNewComments(newComments);
    setConfirmComment(false);
  }

  function handleChange(event, newValue) {
    setValue(newValue);
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

  function renderComments() {
    let comments;
    if (newComments.length === 0) {
      comments = props.data.comments;
    } else {
      comments = newComments;
    }
    if (comments <= 0) {
      return (
        <>
          <p>There are currently no comments on this claim.</p>
        </>
      )
    }
    return (
      <>
        {comments.slice(0).reverse().map((comment, index) => {
          return (
            <Comment key={index} user={comment.user} date={comment.timestamp} comment={comment.text} />
          )
        })}
      </>
    );
  }

  // Hook useEffect provides state within this component - following Material UI convention
  useEffect(() => {
    console.log('in use effect')
  }, [comment, setNewComments]);

  const renderClaimData = () => {

    const { claimBusId, timestamps, status, categories, details, questions, id } = props.data

    const attachments = props.data.signedAttachments;

    console.log(attachments);

    return (
      <>
        <AppBar color="default" className={classes.adminBar} position="static">
          <Tabs value={value} onChange={handleChange} aria-label="Simple tabs example">
            <Tab label="Claim " icon={<SubjectIcon />} {...a11yProps(0)} />
            <Tab label="Comments" icon={<MessageIcon />} {...a11yProps(1)} />
            <Tab label="Attachments" icon={<AttachmentIcon />} {...a11yProps(2)} />
            <Tab disabled={true} className={classes.tabSpacer} />
          </Tabs>

          <div className="claim-options">

            <form autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="status-select">{status}</InputLabel>
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
                    <TableCell><strong>Business Name:</strong> </TableCell>
                    <TableCell>{null}</TableCell>
                  </TableRow>
                  <TableRow hover={true}>
                    <TableCell><strong>Business ID:</strong> </TableCell>
                    <TableCell>{claimBusId}</TableCell>
                  </TableRow>
                  <TableRow hover={true}>
                    <TableCell><strong>Lodgedment Date:</strong> </TableCell>
                    <TableCell>{timestamps.createdAt}</TableCell>
                  </TableRow>
                  <TableRow className={classes.bottom} hover={true}>
                    <TableCell className={classes.bottom} ><strong>Categories: </strong> </TableCell>
                    <TableCell className={classes.bottom} >

                      {Object.values(categories).map((category, index) => {
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
              <Typography component="div">
                {Object.values(details).map((answer, index) => {
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
          <Paper className={classes.comments}>
            {renderComments()}
            <FormControlLabel
              className='answer'
              control={<TextareaAutosize
                ref={commentInput}
                id={'addComment'}
                className='answer'
                aria-label="Minimum height"
                rows={5} />}
              labelPlacement='top'
            />
            <Button className="comment-submit-btn" variant="contained" onClick={() => handleOpenConfirmComment(id, comment)} color="primary">Submit</Button>
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
                <Button onClick={() => handleAcceptCommentConfirm(id)} color="primary" autoFocus>
                  Submit
            </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Paper className={classes.comments}>
          <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attachment #</TableCell>
                  <TableCell align="right">Attachment Preview</TableCell>
                  <TableCell align="right">Attachment Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(attachments).map((attachment, index) => {
                  console.log(attachment);
                  return (
                    <TableRow key={index} hover={true}>
                      <TableCell>{index}</TableCell>
                      <TableCell align="right"><img className="preview" src={attachment.data} alt="attachment" /></TableCell>
                      <TableCell align="right"><strong><a href={attachment.data}>View Attachment</a></strong></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Paper>
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