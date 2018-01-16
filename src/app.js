import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

import './css/demo'

setTimeout(()=> {
    ReactDOM.render(
        <Root/>,
        document.getElementById("root")
    )    
}, 800)
