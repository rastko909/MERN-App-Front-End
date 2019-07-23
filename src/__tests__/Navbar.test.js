import React from 'react';
import NavBar from '../Home/components/NavBar/index';
import { create } from 'react-test-renderer'

describe('NavBar snapshot test',()=>{
    test('testing navbar', () => {
    let tree = create(<NavBar  />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})