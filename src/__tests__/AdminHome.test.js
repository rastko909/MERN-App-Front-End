import React from 'react';
import Home from '../Admin/Dashboard/components/Home';
import { create } from 'react-test-renderer'

const view = {
  view: {
    name: undefined,
    id: undefined,
    data: undefined
  }
}

const functions = () => {
  return {
    setView: this.setView,
    convertStatus: this.convertStatus,
    convertPriority: this.convertPriority,
  };
}

describe('Admin Home snapshot test',()=>{
    test('testing Admin Home', () => {
    let tree = create(<Home view={view} functions={functions}  />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})