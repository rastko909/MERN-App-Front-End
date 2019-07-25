import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default class Notifier extends React.Component {

  state = {
    open: false,
  }

  render = () => {
    return (
      <>
        <Snackbar
          // open={this.state.open}
          // onMount={handleClick(Fade)}
          // onClose={handleClose}
          // TransitionComponent={state.Transition}
          // ContentProps={{
          //   'aria-describedby': 'message-id',
          // }}
          // message={<span id="message-id">I love snacks</span>}
        />
      </>
    );
  }
}

// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import Fade from '@material-ui/core/Fade';
// import Slide from '@material-ui/core/Slide';
// import Grow from '@material-ui/core/Grow';

// function SlideTransition(props) {
//   return <Slide {...props} direction="up" />;
// }

// function GrowTransition(props) {
//   return <Grow {...props} />;
// }

// export default function Notifier() {
//   const [state, setState] = React.useState({
//     open: false,
//     Transition: Fade,
//   });

//   const handleClick = Transition => () => {
//     setState({
//       open: true,
//       Transition,
//     });
//   };

//   function handleClose() {
//     setState({
//       ...state,
//       open: false,
//     });
//   }

//   console.log("Hello from Alert!");

//   return (
//     <>
//       <Button onClick={handleClick(GrowTransition)}>Grow Transition</Button>
//       <Button onClick={handleClick(Fade)}>Fade Transition</Button>
//       <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button>
//       <Snackbar
//         open={state.open}
//         onMount={handleClick(Fade)}
//         onClose={handleClose}
//         TransitionComponent={state.Transition}
//         ContentProps={{
//           'aria-describedby': 'message-id',
//         }}
//         message={<span id="message-id">I love snacks</span>}
//       />
//     </>
//   );

  // return (
  //   <div>
  //     <Button onClick={handleClick(GrowTransition)}>Grow Transition</Button>
  //     <Button onClick={handleClick(Fade)}>Fade Transition</Button>
  //     <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button>
  //     <Snackbar
  //       open={state.open}
  //       onClose={handleClose}
  //       TransitionComponent={state.Transition}
  //       ContentProps={{
  //         'aria-describedby': 'message-id',
  //       }}
  //       message={<span id="message-id">I love snacks</span>}
  //     />
  //   </div>
  // );
  // }


// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';

// export default function Notifier({ message, variant }) {
//   const [state, setState] = React.useState({
//     open: true,
//     vertical: 'top',
//     horizontal: 'center',
//   });

//   const { vertical, horizontal, open } = state;

//   const handleClick = newState => () => {
//     setState({ open: true, ...newState });
//   };

//   function handleClose() {
//     setState({ ...state, open: false });
//   }

//   return (
//     <>
//       <Snackbar
//         anchorOrigin={{ vertical, horizontal }}
//         key={`${vertical},${horizontal}`}
//         open={open}
//         onClose={handleClose}
//         variant="error"
//         autoHideDuration={6000}
//         ContentProps={{
//           'aria-describedby': 'message-id',
//         }}
//         message={<span id="message-id">I love snacks</span>}
//       />
//     </>
//     // <div>
//     //   <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>Top-Center</Button>
//     //   <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>Top-Right</Button>
//     //   <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
//     //     Bottom-Right
//     //   </Button>
//     //   <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
//     //     Bottom-Center
//     //   </Button>
//     //   <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}>Bottom-Left</Button>
//     //   <Button onClick={handleClick({ vertical: 'top', horizontal: 'left' })}>Top-Left</Button>
//     //   <Snackbar
//     //     anchorOrigin={{ vertical, horizontal }}
//     //     key={`${vertical},${horizontal}`}
//     //     open={open}
//     //     onClose={handleClose}
//     //     ContentProps={{
//     //       'aria-describedby': 'message-id',
//     //     }}
//     //     message={<span id="message-id">I love snacks</span>}
//     //   />
//     // </div>
//   );
// }