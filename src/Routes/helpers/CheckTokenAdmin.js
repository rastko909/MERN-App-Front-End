import axios from 'axios';

const checkToken = async () => {
  try {
    let response = await axios.get(process.env.REACT_APP_API_URL + '/admin/dashboard')
    if (response.status === 200) {
      console.log("Oi, we got a 200 status:", response)
      return true
    } else {
      console.log("We didn't get a 200 status:", response)
      return false
    }
  } catch (error) { 
    return false
  }
}

export default checkToken;
