import React, { Component } from 'react';
import classNames from 'classnames'

class Example extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            collapse: true
        }
    }
    render() {
        const { children, title, code } = this.props;
        return (
            <div className="example pb-40 mb-40">
                <h5 className="example-title text-white pt-10 pb-10 pl-10 ls-2 mb-15">
                    {title}
                    <span className="pull-right pr-10 cursorPointer fw-900" onClick={()=>{
                        this.setState({
                            collapse:!this.state.collapse
                        });
                    }}>&#10094;/&#10095;</span>
                </h5>
                {children}
                <div className={classNames("code", { hidden: this.state.collapse })}>
                    <pre>
                        {code}
                    </pre>
                </div>
            </div>
        );
    }
}

export default Example;