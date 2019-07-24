import React from 'react';
import Dashboard from '../Admin/Dashboard/index';
import { create } from 'react-test-renderer'

describe('Admin Dashboard snapshot test',()=>{
    test('testing Admin Dashboard', () => {
    let tree = create(<Dashboard  />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})