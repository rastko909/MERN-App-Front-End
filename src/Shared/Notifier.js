import React from 'react';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';

import "./Notifier.css";

export default class Notifier extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  componentWillMount = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    // this.setState({ open: false })
    this.props.destroy();
  }

  render = () => {
    return (
      <Snackbar
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={'top,center'}
        autoHideDuration={3500}
        className={"notifier"}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.message}</span>}
      />
    );
  }
}
