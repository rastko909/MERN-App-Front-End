import React, { useState } from 'react';
import axios from 'axios';
import { async } from 'q';


export default function NewBusiness() {
  const [businessID, setBusinessID] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [abn, setAbn] = useState('');

  const handleSubmit = (e) => {
    console.log(businessID);
    console.log(businessName);
    console.log(abn);
    e.preventDefault();
    createBusiness(businessID, businessName, abn);
  }

  const createBusiness = async (businessID, businessName, abn) => {
    const data = { businessID, businessName, abn }
    let response;
    try {
      response = await axios.post(process.env.REACT_APP_API_URL + '/admin/business/new', data);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      console.log(response);
    }
  }

  return (
    <p>Add a new Business</p>
  )
}
