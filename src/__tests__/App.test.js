import React from 'react';
import App from '.././App';
import { create } from 'react-test-renderer'

describe('App snapshot test',()=>{
    test('testing App', () => {
    let tree = create(<App  />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})