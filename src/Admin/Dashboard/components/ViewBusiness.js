import React, { useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';

// import axios from 'axios';
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


export default function ViewBusiness({ businessId, functions }) {
  // const classes = useStyles();
  
  useEffect(() => {
  }, []) 

  return (
    <>
      <h1>Load business: {businessId}</h1>
    </>
  );
}