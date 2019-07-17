import axios from 'axios';


const checkToken = async (pathName) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + pathName) 
    console.log(response)
    return true
  } catch (error) { 
    console.log('Auth Failed. Error:', error.message)
  }
}

export default checkToken;
