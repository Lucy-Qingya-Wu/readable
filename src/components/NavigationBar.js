import React, {Component} from 'react'
import {Link} from 'react-router-dom'
const NavigationBar = (props) => {
	return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container">

				<Link className="title-link" to={{pathname : "/"}}>

						Readable

				</Link>
      </div>
    </nav>

	)
}
export default NavigationBar