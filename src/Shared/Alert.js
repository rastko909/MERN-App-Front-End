import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import './Alert.css'
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    background: 'red',
    marginTop: '64px'
  }
};

let openOrNot = true;

class Notifier extends React.Component {

  handleSnackbarClose = () => {
    openOrNot = false;
    this.setState({})
  };

  componentWillUnmount() {
    console.log('in unmount')
  }

  componentDidUpdate() {
    openOrNot = true;
  }

  render() {
    console.log('in alert')
    const { classes } = this.props;
    console.log(styles)
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        message={this.props.message}
        onClose={this.handleSnackbarClose}
        open={openOrNot}
        ContentProps={{
          classes: {
            root: classes.root
          }
        }}
      />
    );
  }
}

export default withStyles(styles)(Notifier);
