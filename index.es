import React, { Component } from 'react'
import { join } from 'path-extra'
import { Button, FormGroup, FormControl, InputGroup, Panel } from 'react-bootstrap'

export class reactClass extends Component {
	constructor(props){
		super(props)
		this.state = {
			messages: [],
			input: "",
			name: "You"
		}
	}

	sendMessage(){
		const messages = this.state.messages.slice()
		if (this.state.input != ""){
			this.setState({
				messages: messages.concat([{
					content: this.state.input,
					sender: this.state.name
				}]),
				input: ""
			})
		}
	}

	renderMessages(){
		return(
			<div id="chat-text">
				{this.state.messages.map((i) => this.renderMessage(i))}
			</div>
		)
	}

	renderMessage(message){
		return(
			<Panel className="message">
			    <Panel.Body>{message.content}</Panel.Body>
			</Panel>
		)
	}


	renderInput(){
		return(
			<InputGroup id="chat-input">
				<FormControl componentClass="input" type="text" value={this.state.input} onChange={event => this.setState({input: event.target.value})} />
				<InputGroup.Button>
					<Button onClick={() => this.sendMessage()}><i className="fa fa-comment" /></Button>
				</InputGroup.Button>
			</InputGroup>
		)
	}

	render(){
		return (
			<form id="chatroom" className="chatroom">
			<link rel="stylesheet" href={join(__dirname, 'index.css')} />
				<FormGroup id="chatroom-form">
					{this.renderMessages()}
					{this.renderInput()}
				</FormGroup>
			</form>
		)
	}
}