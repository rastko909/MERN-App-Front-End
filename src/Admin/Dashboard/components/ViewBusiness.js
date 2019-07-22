import React, { useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import axios from 'axios';

const getBusinessData = async(view, functions) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/business/find', {headers: {id: view.id}});
    console.log("response.data", response.data);
    functions.setView({ name: "viewbusiness", id: response.data.id, data: response.data })
  } catch(error) {
    console.log("Caught an error requesting data:\n", error.message);
  }
}

export default function ViewBusiness({ view, functions }) {
  
  useEffect(() => {
    if (!view.data)
      getBusinessData(view, functions);
  }, [view, functions]) 

  if (!view.data)
    return (<LinearProgress />);

  const businessData = view.data;

  return (
    <>
      <h1>({businessData.id}) {businessData.name}</h1>
      <h3>ABD: {businessData.abn}</h3>
      <p>Open claims: {businessData.openClaims}</p>
    </>
  );
}