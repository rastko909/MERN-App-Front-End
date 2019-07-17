import axios from 'axios';


const checkToken = async (pathName) => {
  console.log('checking token')
  try {
    console.log('in try checktoken')
    const response = await axios.get(process.env.REACT_APP_API_URL + pathName) 
  } catch (error) { 
    console.log('Auth Failed. Error:', error.message)
  }
}

export default checkToken;
