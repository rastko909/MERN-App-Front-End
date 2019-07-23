import React from 'react';
import './Form.css';
import { Button, Checkbox, FormControlLabel, FormGroup, OutlinedInput } from '@material-ui/core/';
import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone';
import NavBar from '../../Home/components/NavBar';
import Question from './components/Question/Question';

axios.defaults.withCredentials = true;

const questions = [
  'Are you or anyone else in physical danger? If so, please call 000 immediately',
  'What is the concern/incident that you wish to disclose? Please provide a full description of your concerns/incident and why you identify them as the type of disclosure that you have, above?',
  'When did this concern occur? Please provide exact dates/times, did it arise in work hours/after hours?',
  'Where did the issue occur? Please be as specific as possible – was it on the organisation’s premises? If so, exactly where? Via email or social media? During/after work hours? At a social event?',
  'Who was involved? What were the names and positions of those involved, if known?',
  'Who do you consider is responsible for the conduct you wish to report? What were the names and positions of those responsible, if known?',
  'Were there any witnesses? What were the names and positions of those involved, if known?',
  'How did this incident occur? Please explain the process/steps?',
  'Is there any physical documentation or evidence of the incident occurring? (What? Where?)',
  'Have you reported the incident/s internally, or through any other channels?',
  'Who would you normally report this incident to within the organisation?',
  'Have you raised this issue with someone in the organisation? If so, with whom have you raised the issue?',
  'Have you reported this to any external agencies or government departments? If so, which departments? What is the status of the complaint within the agency or department?',
  'Has this issue occurred before? (If so, with what frequency and during what period of time? Please provide as much detail as possible.',
  'Will follow-up action identify you as the person reporting the incident? If so, how might this arise?',
  'Is this incident contrary to your organisation’s policies or procedures? If so, which policies or procedures (eg Code of Conduct? Anti-Sexual Harassment Policy? Anti-Bullying Policy? Conflict of Interest Policy?)',
  'Has anyone been injured as a result of this or similar issues?',
]

class Form extends React.Component {

  state = {
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
      answers: {},
      categories: {},
    },
    
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const exists = await this.checkId();

    if (exists)
      this.sendAnswers();
    else {
      console.log(`{ RENDER ID NOT FOUND NOTIFICATION FOR ID: ${this.state.newClaim.business_id} }`);
    }
  }

  checkId = async () => {
    const { business_id } = this.state.newClaim;
    const response = await axios.get(process.env.REACT_APP_API_URL + "/business/check", { headers: { business_id } })
    return response.data.exists;
  }

  sendAnswers = async () => {
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
      console.log(`{ RENDER 'Secret key with disclaimer': ${response.data.secretKey}`);
    }
      
  }
  
  uploadImages = async (claimId, businessId, formData) => {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/upload", formData, {headers: { claimId, businessId  }})
    if (response.status !== 200)
      console.log(`{ RENDER VIEW FOR ERROR: ${response.status} }`);
    else
      console.log(response.data, 'File upload success');
  }

  handleBusinessID = (event) => {
    let newState = this.state;
    newState.newClaim[event.target.id] = event.target.value
    this.setState(newState)
  }

  handleUpload(files) {
    let newState = this.state
    newState.files = files
    console.log('check state:', newState)
    this.setState(newState);
    };

  handleChange = (event) => {
    if (event.target.type === "checkbox") {
      let newState = this.state;
      if (newState.newClaim.categories[event.target.id]) {
        console.log('first inner if')
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
    return (
      <>
        <NavBar />
        <FormGroup className="form-container">
          <div className="claim-heading">Business ID</div>
          <div className="business-id-container">
            <FormControlLabel className='answer'
              control={<OutlinedInput id="business_id"
                autoFocus={true}
                fullWidth={true}
                onChange={this.handleBusinessID}
                placeholder='Please use the Business ID supplied by your company, or call our hotline for help.' />}
              labelPlacement='top'
              required={true}
            />
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
              index++;
              return (
                <Question key={index} question={question} index={index} handleChange={this.handleChange} />
              )
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

export default Form;