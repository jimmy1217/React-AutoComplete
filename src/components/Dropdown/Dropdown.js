import * as React from 'react'
import Autocomplete from './../Autocomplete'

export default (props) => {
  return (
    <Autocomplete
      {...props}
      type="dropdown"
      clickReset={true}
      searchAddon={<span className="defaultTriangle"></span>} />
  )
}