// @flow
import * as React from 'react'

type Props = {
  foo: number,
  bar?: string,
};

type State = {
  test: number
}

export default class ComponentNew extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      test: 222,
    }
  }
  render() {
    return (
      <div>
        {this.state.test}
      </div>
    )
  }
}
