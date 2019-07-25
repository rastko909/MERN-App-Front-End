import React, { useEffect } from 'react';
import './Confirmation.css'
import { Button, Checkbox, FormControlLabel, OutlinedInput } from '@material-ui/core/';


export default function Confirmation(props) {

  const { secretKey, businessId } = props.data;

  const [button, setButton] = React.useState(false);
  const [viewKey, setViewKey] = React.useState(false);

  const handleCheckbox = () => {
    setButton(!button);
  }

  const handleSubmit = () => {
    setViewKey(!viewKey);
  }

  const handleExit = () => {
    props.parent.history.push('/');
  }

  const handleLogin = () => {
    props.parent.history.push('/claim');
  }

  useEffect(() => {
  }, [button, viewKey])

  if (viewKey === false) {
    return (
      <>
        <div className='form-container'>
          <div className="claim-heading">Claim Confirmation</div>
          <div className="confirmation-text">
            <p><strong>WHAT HAPPENS NOW?</strong></p>
            <p>
              A case manager will soon review your claim and inform the appropriate parties involved, we take security seriously and will only disclose
              any personal details according to the disclosure level you have selected. If you have any further questions, please feel free to email or call our hotline.
          </p>
            <p>If you want access to your claim, we have provided the following login details. You will be able to track the status of the claim and communicate with
            your case manager as per needed basis. Please check in on your claim regularly in case further information is required.
          </p>
            <p>
              Please note that once submitted, as per legal requirements, your claim is not subject to any editing from yourself or anyone else. You can however add
              further information and communicate with your case manager by using the comment section when you login to your claim.
          </p>
          </div>
          <div className="confirmation-text-alert">
            <p><strong>IMPORTANT</strong></p>
            <p>
              You will now be provided with a <strong>Secret Key</strong> and your <strong>Business ID</strong> - these will allow you access to login and view your claim.
        </p>
            <p>
              Please ensure that you store the login details of your claim somewhere secure, on a device or document only accesible to yourself. Do not store the login details on work or pubicly accessible devices, as this would compromise the security of your claim.
        </p>
          </div>
          <div className="confirmation-checkbox">
            <FormControlLabel
              control={<Checkbox onChange={handleCheckbox} />}
              label="Tick to confirm that you understand the security requirements in regards to your claim login details."
            />
          </div>
          <div className='confirmation-button'>
            <Button disabled={!button} className="submit-btn" variant="contained" onClick={handleSubmit} color="primary">
              View Secret Key
          </Button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='form-container'>
          <div className="claim-heading">Claim Login Details</div>
          <div className='confirmation-text'>
            Here are the login details for your claim - please make sure to store them somewhere safe.
          </div>
          <div className="login-details">
            <div className='login-row'>
              <div className='login-key'>Business ID:</div>
              <div className='login-value'>
                <OutlinedInput
                  autoFocus={true}
                  fullWidth={true}
                  readOnly={true}
                  required={true}
                  value={businessId}
                />
              </div>
            </div>

            <div className='login-row'>
              <div className='login-key'>Secret Key:</div>
              <div className='login-value'>
                <OutlinedInput
                  autoFocus={true}
                  fullWidth={true}
                  readOnly={true}
                  required={true}
                  value={secretKey}
                /></div>
            </div>
            <div className='final-button-row'>
              <Button className="submit-btn" variant="contained" onClick={handleLogin} color="primary">
                Login and View Claim
          </Button>

              <Button className="submit-btn" variant="contained" onClick={handleExit} color="primary">
                Return to Index
          </Button>
            </div>

          </div>
        </div>
      </>
    );
  }

}