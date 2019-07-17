import axios from 'axios';


const checkToken = async () => {
  try {
    let response = await axios.get(process.env.REACT_APP_API_URL + "/admin/dashboard");
    return (response.status === 200 ? true : false);
  } catch (error) { 
    return false
  }
}

export default checkToken;
