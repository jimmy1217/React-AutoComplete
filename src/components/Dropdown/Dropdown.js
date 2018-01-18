import * as React from 'react'
import Autocomplete from './../Autocomplete'

export default (props) => {
  return (
    <Autocomplete
      {...props}
      type="dropdown"
      searchAddon={<span className="defaultTriangle"></span>} />
  )
}