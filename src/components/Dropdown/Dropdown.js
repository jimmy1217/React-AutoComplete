import * as React from 'react'
import Autocomplete from './../Autocomplete'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <Autocomplete
      {...this.props}
      type="dropdown"
      searchAddon={<span className="defaultTriangle"></span>} />
  }
}

export default Dropdown