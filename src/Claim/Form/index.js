import React from 'react';
import './Form.css';
import { Button, Checkbox, FormControlLabel, FormGroup, OutlinedInput } from '@material-ui/core/';
import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone';
import NavBar from '../../Home/components/NavBar';
import Question from './components/Question';
import DisclosureLevel from './components/DisclosureLevel';
import Confirmation from './components/Confirmation';
import Notifier  from '../../Shared/Notifier';

axios.defaults.withCredentials = true;

const questions = [
  'This is Question 1',
  'This is Question 2',
  'This is Question 3',
  'This is Question 4',
  'This is Question 5',
  'This is Question 6',
  'This is Question 7',
  'This is Question 8',
  'This is Question 9',
  'This is Question 10',
  'This is Question 11',
  'This is Question 12',
  'This is Question 13',
  'This is Question 14',
  'This is Question 15',
  'This is Question 16',
  'This is Question 17'
]

class Form extends React.Component {

  constructor(props) {
    super();

    console.log("Props from the Form Constructor:", props);

    this.state = {
      alert: {
        notified: false,
        ref: undefined,
      },
      complete: false,
      files: [],
      pagination: {
        page: {
          currentPage: 0,
          maxPage: 10
        },
      },
      newClaim: {
        business_id: "",
        questions: questions,
        answers: { answer_1: "", answer_2: "", answer_3: "", answer_4: "", answer_5: "", answer_6: "", answer_7: "", answer_8: "", answer_9: "", answer_10: "", answer_11: "", answer_12: "", answer_13: "", answer_14: "", answer_15: "", answer_16: "", answer_17: "" },
        categories: {},
        priority: 0,
        disclosureLevel: "",
        claimantDetails: {},
      },
      confirmationData: {
        secretKey: '',
        businessId: '',
      },
      refs: {
        businessId: React.createRef(),
      },
    }
  }

  handleDestroyNotifier = () => {
    this.setState({ alert: { notified: false, ref: undefined }});
  }

  handleClaimantDetails = (event) => {
    let newState = this.state;
    newState.newClaim.claimantDetails[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleDisclosureLevel = (event) => {
    let newState = this.state;
    newState.newClaim.disclosureLevel = event.target.value;
    this.setState(newState);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let exists = await this.checkId();

    if (exists) {
      this.sendAnswers();
    } else {
      this.setState({ alert: { notified: true, ref: this.state.refs.businessId }})
      this.state.refs.businessId.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
      this.state.refs.businessId.current.
      console.log(`{ RENDER ID NOT FOUND NOTIFICATION FOR ID: ${this.state.newClaim.business_id} }`);
    }
  }

  checkBusiness = (event) => {
    if (event.target.value === null) {
      console.log('need business id')
    }
  }

  checkId = async () => {
    const { business_id } = this.state.newClaim;
    const response = await axios.get(process.env.REACT_APP_API_URL + "/business/check", { headers: { business_id } })
    return response.data.exists;
  }

  sendAnswers = async () => {
    console.log(this.state.newClaim)
    const response = await axios.post(process.env.REACT_APP_API_URL + "/claim/new", this.state.newClaim);
    let claimId = response.data.claimId;
    const { business_id } = this.state.newClaim;

    if (response.status !== 200) {
      console.log(`{ RENDER VIEW FOR ERROR: ${response.status} }`);
    }
    else {
      let formData = new FormData()
      let files = this.state.files
      for (const file of files) {
        formData.append('file', file)
      }
      await this.uploadImages(claimId, business_id, formData)
      this.state.confirmationData.secretKey = response.data.secretKey;
      this.state.confirmationData.businessId = business_id
      this.setState({ complete: true })
    }
  }

  uploadImages = async (claimId, businessId, formData) => {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/upload", formData, { headers: { claimId, businessId } })
    if (response.status !== 200)
      console.log(`{ RENDER VIEW FOR ERROR: ${response.status} }`);
    else
      console.log(response.data, 'File upload success');
  }

  handleBusinessID = (event) => {
    let newState = this.state;
    newState.newClaim[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleUpload(files) {
    let newState = this.state;
    newState.files = files;
    console.log('check state:', newState);
    this.setState(newState);
  };

  handleChange = (event) => {
    if (event.target.type === "checkbox") {
      let newState = this.state;
      if (newState.newClaim.categories[event.target.id]) {
        newState.newClaim.categories[event.target.id] = {
          checked: event.target.checked,
          label: event.target.value
        }
      } else {
        newState.newClaim.categories[event.target.id] = {
          checked: !newState.newClaim.categories[event.target.id],
          label: event.target.value
        }
      }
      this.setState(newState);
    } else {
      let newState = this.state;
      newState.newClaim.answers[event.target.id] = event.target.value;
      this.setState(newState);
    }
  }

  handleCancel = () => {
    window.location.pathname = '/';
  }

  render = () => {

    const { alert } = this.state;

    if (this.state.complete === true) {
      return (
        <>
          <NavBar />
          <Confirmation data={this.state.confirmationData} parent={this.props} />
        </>
      )
    } else {
      
      return (
        <>
          <NavBar />
          {/* <Notifier message="Business ID is incorrect or does not exist" variant="success" /> */}
          {alert.notified && <Notifier destroy={this.handleDestroyNotifier} message="Business ID is incorrect or does not exist" variant="success" />}
          <FormGroup className="form-container">
            <div className="claim-heading" id="business-notifier" ref={this.state.refs.businessId}>Business ID</div>
            <div className="business-id-container">

              <FormControlLabel className='answer'
                control={<OutlinedInput
                  id="business_id"
                  autoFocus={true}
                  fullWidth={true}
                  onBlur={this.handleBusinessID}
                  placeholder='Please use the Business ID supplied by your company, or call our hotline for help.' />}
                labelPlacement='top'
                required={true}
              />              

            <div className="category-container">
              <div className="claim-heading">Categories</div>

              <DisclosureLevel setDetails={this.handleClaimantDetails} setLevel={this.handleDisclosureLevel} />
            </div>

            </div>
            <div className="category-container">
              <div className="claim-heading">Categories</div>
              <p className="category-text">Please select any of the following categories that apply to your claim: </p>
              <div className="categories">
                <div className="category-column">
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="misconduct" value="Misconduct" />}
                    label="Misconduct"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="improper" value="An improper state of affairs" />}
                    label="An improper state of affairs"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="bullying" value="Bullying" />}
                    label="Bullying"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="discrimination" value="Discrimination" />}
                    label="Discrimination"
                  />
                </div>
                <div className="category-column">
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="harrasment" value="Harrasment" />}
                    label="Harrasment"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="health" value="Health/Safety/Environment issues" />}
                    label="Health/Safety/Environment issues"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="influence" value="Abuse of influence" />}
                    label="Abuse of influence"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="bribery" value="Bribery" />}
                    label="Bribery"
                  />
                </div>
                <div className="category-column">
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="corruption" value="Corruption" />}
                    label="Corruption"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="fraud" value="Fraud" />}
                    label="Fraud"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="theft" value="Theft" />}
                    label="Theft"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChange} id="other" value="Other" />}
                    label="Other"
                  />
                </div>
              </div>

            </div>
            <div className="questions-container">
              <div className="claim-heading">Questions</div>

              {questions.map((question, index) => {
                return <Question key={index} question={question} index={index + 1} handleChange={this.handleChange} />
              })}

              <div className="claim-heading">Attachments</div>
              <div className="dropzone-container">
                <p id="dropzone-description" className='question'>
                  Please attach any relevant documents below:</p>

                <DropzoneArea
                  showPreviews={true}
                  showPreviewsInDropzone={false}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  dropzoneText={''}
                  dropzoneClass={'dropzone-custom'}
                  maxFileSize={25000000}
                  onChange={this.handleUpload.bind(this)}
                />
              </div>

              <div className="button-row">
                <Button className="submit-btn" variant="contained" onClick={this.handleSubmit} color="primary">
                  Submit
              </Button>
                <Button className="cancel-btn" variant="contained" onClick={this.handleCancel} color="secondary">
                  Cancel
              </Button>
              </div>

            </div>
          </FormGroup>

        </>
      )
    }
  }
}

export default Form;