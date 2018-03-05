import React, { Component } from 'react'
import { join } from 'path-extra'
import { Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap'

export class reactClass extends Component {
	render(){
		return (
			<form id="chatroom" className="chatroom">
			<link rel="stylesheet" href={join(__dirname, 'index.css')} />
				<FormGroup id="chatroom-form">
					<FormControl id="chat-text" componentClass="textarea" readonly="readonly" placeholder="textarea" />
					<InputGroup id="chat-input">
						<FormControl componentClass="input" type="text" placeholder="input" />
						<InputGroup.Button>
							<Button>Send</Button>
						</InputGroup.Button>
					</InputGroup>
				</FormGroup>
			</form>
		)
	}
}