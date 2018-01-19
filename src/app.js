import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

// import './css/demo'

// ....可以不需setTimeout,但網路太快會讓 template 的 mask-wrapper 像是白寫了....
setTimeout(()=> {
    ReactDOM.render(
        <Root/>,
        document.getElementById("root")
    )    
}, 600)
