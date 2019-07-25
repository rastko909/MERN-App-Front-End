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

  state = {
    showNotifier: false,
  }

  componentWillMount = () => {
    this.setState({ showNotifier: true });
  }

  componentWillUnmount = () => {
    this.setState({ showNotifier: false })
  }

  handleNotifierClose = () => {
    this.setState({ showNotifier: false });
  }

  // componentWillUnmount() {
  //   console.log('in unmount')
  // }

  // componentDidUpdate() {
  //   openOrNot = true;
  // }

  render = () => {
    if (!this.state.showNotifier)
      return null;

    console.log('in alert')
    const { classes } = this.props;
    console.log("Notifier 'this.props':", this.props);

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        message={this.props.message}
        onClose={this.handleNotifierClose}
        open={this.state.showNotifier}
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
