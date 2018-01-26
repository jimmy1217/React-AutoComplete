import React from 'react';
import renderer from 'react-test-renderer'
import { Autocomplete } from './../../index.js'

describe('render 測試', () => {
  it('Autocomplete Snapshot', () => {
    const component = renderer.create(<Autocomplete />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})