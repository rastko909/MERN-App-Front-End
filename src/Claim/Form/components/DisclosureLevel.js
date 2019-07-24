import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import './DisclosureLevel.css'

export default function DisclosureLevel() {
  
  const [anonymityLevel, setAnonymityLevel] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');

  function handleChange(event) {
    setAnonymityLevel(event.target.value);
  }

  function renderDisclosureInfo() {
    switch(anonymityLevel) {
      case "full-disclosure":
        return "Fully disclose your information to your case manager and be mentioned in the reports the reports written for your organisation";

      case "partially-anonymous":
        return "Provide your contact details to your case manager so they are able to easily communicate with you throughout the process of your claim.";
        
      case "completely-anonymous":
        return "Remain completely anonymous to your case manager and reports to your organisation. But understand that we can be limited in our capacity to communicate with you about the progress of your disclosure.";

      default:
        return 
    }
  }

  function renderUserFields() {
    return (
      <>
        <TextField variant="outlined" margin="normal" fullWidth id="first-name" label="First Name" name="first-name" onChange={(e) => setFirstName(e.target.value)} />
        <TextField variant="outlined" margin="normal" fullWidth id="last-name" label="Last Name" name="last-name" onChange={(e) => setLastName(e.target.value)} />
        <TextField variant="outlined" margin="normal" fullWidth id="phone-number" label="Phone Number" name="phone-number" onChange={(e) => setPhoneNumber(e.target.value)} />
        <TextField variant="outlined" margin="normal" fullWidth id="email-address" label="Email Address" name="email-address" onChange={(e) => setEmailAddress(e.target.value)} />
      </>
    );
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="position" name="position" value={anonymityLevel} onChange={handleChange} row>
        <FormControlLabel
          value="completely-anonymous"
          control={<Radio color="primary" />}
          label="Completely Anonymous"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="partially-anonymous"
          control={<Radio color="primary" />}
          label="Partially Anonymous"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="full-disclosure"
          control={<Radio color="primary" />}
          label="Full Disclosure"
          labelPlacement="bottom"
        />
      </RadioGroup>

      <div className={"disclosure-info"}>{renderDisclosureInfo()}</div>

      {(anonymityLevel !== "completely-anonymous" && anonymityLevel !== "") && renderUserFields()}

    </FormControl>
  );
}