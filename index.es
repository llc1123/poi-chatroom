import React, { Component } from 'react'
import { join } from 'path-extra'
import { FormGroup, FormControl } from 'react-bootstrap'

export class reactClass extends Component {
	render(){
		return (
			<form id="chatroom" className="chatroom">
			<link rel="stylesheet" href={join(__dirname, 'index.css')} />
				<FormGroup id="chatroom-form">
					<FormControl componentClass="textarea" readonly="readonly" placeholder="textarea" />
					<FormControl componentClass="input" type="text" placeholder="input" />
				</FormGroup>
			</form>
		)
	}
}