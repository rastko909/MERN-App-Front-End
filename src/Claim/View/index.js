import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NavBar from '../../Home/components/NavBar';
import './index.css'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },

}));


export default function ViewClaim(props) {
  const classes = useStyles();
  const { claimBusId, timestamps, status, categories, details, questions } = props.data
  return (
    <>
    <NavBar />
    <div className="view-claim-container">
      <div className="view-claim-paper">
        <Paper className={classes.root}>
          <div className="claim-heading-container">
            <Typography variant="h4" component="h3">
              Claim
          </Typography>
          </div>
          <div className="table">
            <Table>
              <TableBody>
                <TableRow hover={true}>
                  <TableCell><strong>Business ID:</strong> </TableCell>
                  <TableCell>{claimBusId}</TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell><strong>Lodgedment Date:</strong> </TableCell>
                  <TableCell>{timestamps.createdAt}</TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell><strong>Status:</strong></TableCell>
                  <TableCell><span className="status">{status}</span></TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell><strong>Categories: </strong> </TableCell>
                  <TableCell>
                    {Object.values(categories).map((category, index) => {
                      console.log(category)
                      return (
                        <span key={index} className="category">{category.label},</span>
                      )})}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

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
              )})}
        </Paper>
      </div>
    </div>
    </>
  );
}