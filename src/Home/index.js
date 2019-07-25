import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import NavBar from './components/NavBar';
import HelpIcon from '@material-ui/icons/Help';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ListAltIcon from '@material-ui/icons/ListAlt';
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
        <div className="home-inner-container">
        <div className="disclosure-text">
         <h1>
          Welcome to <strong>Disclosure Platform</strong>
         </h1>

         <div className="description-text">
           <div className="description-header">
           <PersonPinIcon /><h3>Who are we?</h3>
           </div>

           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
         </div>

         <div className="description-text">
           <div className="description-header">
           <HelpIcon /><h3>How can we help you?</h3>
           </div>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
         </div>

         <div className="description-text">
         <div className="description-header">
           <ListAltIcon /><h3>Have a claim?</h3>
           </div>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
         </div>

      <div className="buttons">

         <Button className='button' onClick={this.newClaim}>
            Lodge New Claim
        </Button>

        <Button className='button' onClick={this.viewClaim}>
          Login to Existing Claim
        </Button>
      </div>
        </div>

        </div>


        </div>
      </>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);