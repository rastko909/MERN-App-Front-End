import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import NavBar from './components/NavBar';
import './index.css';

const styles = (theme) => ({
  button: {
    // margin: this.props.theme.spacing(1),
  },
  input: {
    display: 'none',
  },
});

class Home extends React.Component {

  newClaim = () => {
    this.props.history.push('/claim/new');
  }

  viewClaim = () => {
    this.props.history.push('/claim');
  }


  render = () => {
    // const { classes } = this.props;
    return (
      <>
        <NavBar />
        <div className="home-container">
          <Paper className="home-dialog">
            <div className="left">
              <Button className='button' onClick={this.newClaim}>
                Lodge New Claim
              </Button>
              <img className="image1" src={require('./images/new-claim.svg')} alt="logo" />

            </div>

            <div className="right">
              <Button className='button' onClick={this.viewClaim}>
                Login to Existing Claim
              </Button>
              <img className="image" src={require('./images/view-claim.svg')} alt="logo" />

            </div>
          </Paper>
        </div>
      </>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);