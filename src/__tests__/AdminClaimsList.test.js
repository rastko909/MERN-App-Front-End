import React from 'react';
import ClaimsList from '../Admin/Dashboard/components/ClaimsList';
import { create } from 'react-test-renderer'


const rows = [
  { id: "AF5LW6LX", businessName: "Westpac",businessId: "LJH567", status: 0, date: "Tue Jul 23 2019 17:39:27 GMT+1000 (Australian Eastern Standard Time)", priority: 0}, 
  { id: "9GF2LGE7", businessName: "Westpac", businessId: "LJH567", status: 1, date: "Wed Jul 24 2019 11:36:04 GMT+1000 (Australian Eastern Standard Time)", priority: 1},
  { id: "ND73W2P2", businessName: "Coder Academy", businessId: "WNC943", status: 2, date: "Tue Jul 23 2019 17:38:48 GMT+1000 (Australian Eastern Standard Time)", priority: 2}, 
  { id: "FCGGQGMN", businessName: "Coder Academy", businessId: "WNC943", status: 3, date: "Tue Jul 23 2019 17:38:49 GMT+1000 (Australian Eastern Standard Time)", priority: 3},
  { id: "X2V7V7JP", businessName: "KPMG", businessId: "TJY435", status: 4, date: "Wed Jul 24 2019 11:36:04 GMT+1000 (Australian Eastern Standard Time)", priority: 4}, 
  { id: "PZ2XPF3E", businessName: "KPMG", businessId: "TJY435", status: 1, date: "Tue Jul 23 2019 17:39:27 GMT+1000 (Australian Eastern Standard Time)", priority: 2}
]

const state = {
  view : {
    name: "openclaims",
    id: undefined,
    data: rows
  }
}

const setView = (viewObject) => {
  state.view ={
    name: viewObject.name || undefined,
    id: viewObject.id || undefined,
    data: viewObject.data || undefined,
  }
}

const functions = () => {
  return {
    setView: setView
  };
}

describe('Admin Dashboard ClaimsList snapshot test',()=>{
  test('testing Admin Dashboard ClaimsList', () => {
  let tree = create(<ClaimsList view={state.view} functions={functions}  />)
  expect(tree.toJSON()).toMatchSnapshot();
})
})