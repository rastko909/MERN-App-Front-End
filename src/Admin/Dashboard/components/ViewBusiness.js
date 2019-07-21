import React, { useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import axios from 'axios';
// axios.defaults.withCredentials = true;

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing(3),
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 650,
//   },
// }));

// const handleClick = (e, id) => {
//   e.stopPropagation();
//   alert("Hey, you just clicked " + id);
// }

// const createData = (id, name, businessId, status, date, priority) => {
//   return {id, name, businessId, status, date, priority };
// }

// const rows = [];
  
// const getClaims = async (functions) => {
//   try {
//     const claims = await axios.get(process.env.REACT_APP_API_URL + '/admin/dashboard');
//     let businessName = undefined;
    
//     for(let claim of claims.data) {
//       const businessId = claim.businessId;

//       try {
//         const business = await axios.get(process.env.REACT_APP_API_URL + '/business/find', {headers: {id: businessId}})
//         console.log("Here's the business name:", business.data);
//         businessName = business.data.name;
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         rows.push(createData(claim.id, businessName, claim.businessId, functions.convertStatus(claim.status), claim.timestamps.createdAt, functions.convertPriority(claim.priority)));
//       }
//     }

//   } catch (error) {
//     console.log("An exception was caught:", error);
//   } finally {
//     functions.setStateFromChild("claimData", rows);
//     // functions.setView("claims");
//   }
// }



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