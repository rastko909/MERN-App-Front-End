import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from "@material-ui/core/styles";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Tooltip from "@material-ui/core/Tooltip";
import './DisclosureLevel.css'

const useStyles = makeStyles(theme => ({
  customWidth: {
    maxWidth: 500,
    fontSize: "1rem",
    background: '#f44336',
    padding: "1rem",
  },
  noMaxWidth: {
    maxWidth: "none",
    fontSize: "2rem"
  }
}));

export default function DisclosureLevel() {
  const classes = useStyles();
  const [anonymityLevel, setAnonymityLevel] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);

  // Disclosure level messages for our tooltips
  const full = "Fully disclose your information to your case manager and be mentioned in the reports the reports written for your organisation";
  const partial = "Provide your contact details to your case manager so they are able to easily communicate with you throughout the process of your claim.";
  const anon = "Remain completely anonymous to your case manager and reports to your organisation. But understand that we can be limited in our capacity to communicate with you about the progress of your disclosure."

  function handleChange(event) {
    setAnonymityLevel(event.target.value);
    if (event.target.value !== 'completely-anonymous') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function renderUserFields(disabled) {
    return (
      <>
        <div className="user-input-container">
          <TextField variant="outlined" margin="normal" disabled={disabled} fullWidth id="first-name" label={ disabled ? "Disabled" : "First Name" } name="first-name" onChange={(e) => setFirstName(e.target.value)} />
          <TextField variant="outlined" margin="normal" disabled={disabled} fullWidth id="last-name" label={ disabled ? "Disabled" : "Last Name" } name="last-name" onChange={(e) => setLastName(e.target.value)} />
          <TextField variant="outlined" margin="normal" disabled={disabled} fullWidth id="phone-number" label={ disabled ? "Disabled" : "Phone Number" } name="phone-number" onChange={(e) => setPhoneNumber(e.target.value)} />
          <TextField variant="outlined" margin="normal" disabled={disabled} fullWidth id="email-address" label={ disabled ? "Disabled" : "Email Address" } name="email-address" onChange={(e) => setEmailAddress(e.target.value)} />
        </div>
      </>
    );
  }

  useEffect(() => {

  }, [disabled])

  return (
 
    <div className="user-disclosure-container">
      <FormControl fullWidth component="fieldset">
        <div className="radio-group">
          <div className="radio-buttons">
            <RadioGroup className="radio-group" aria-label="position" name="position" value={anonymityLevel} onChange={handleChange} row>
            <Tooltip title={anon} classes={{ tooltip: classes.customWidth }}>
              <FormControlLabel
                value="completely-anonymous"
                control={<Radio color="primary" />}
                label="Completely Anonymous"
                labelPlacement="bottom"
              />
            </Tooltip>
            <Tooltip title={partial} classes={{ tooltip: classes.customWidth }}>
              <FormControlLabel
                value="partially-anonymous"
                control={<Radio color="primary" />}
                label="Partially Anonymous"
                labelPlacement="bottom"
              />
              </Tooltip>
              <Tooltip title={full} classes={{ tooltip: classes.customWidth }}>
              <FormControlLabel
                value="full-disclosure"
                control={<Radio color="primary" />}
                label="Full Disclosure"
                labelPlacement="bottom"
              />
              </Tooltip>

            </RadioGroup>
          </div>

        </div>
        {renderUserFields(disabled)}
        {/* {(anonymityLevel !== "completely-anonymous" && anonymityLevel !== "") && renderUserFields()} */}
      </FormControl>

    </div>

  );
}