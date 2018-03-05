import React, { Component } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

export class ChatRoom extends Component {
	render(){
		return (
			<form>
				<FormGroup>
					<FormControl componentClass="textarea" placeholder="textarea" />
					<FormControl componentClass="input" type="text" placeholder="input" />
				</FormGroup>
			</form>
		)
	}
}