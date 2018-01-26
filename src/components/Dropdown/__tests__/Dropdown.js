import React from 'react';
import renderer from 'react-test-renderer'
import { Dropdown } from './../../index.js'

describe('render 測試', () => {
  it('Dropdown render Snapshot', () => {
    const component = renderer.create(<Dropdown />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})