import React, { Component } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

export class reactClass extends Component {
	render(){
		return (
			<div id="chatroom" className="chatroom">
				<form>
					<FormGroup>
						<FormControl componentClass="textarea" placeholder="textarea" />
						<FormControl componentClass="input" type="text" placeholder="input" />
					</FormGroup>
				</form>
			</div>
		)
	}
}