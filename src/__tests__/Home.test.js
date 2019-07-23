import React from 'react';
import Home from '../Home/index';
import { create } from 'react-test-renderer'

describe('Home page snapshot test',()=>{
    test('testing homepage', () => {
    let tree = create(<Home  />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})