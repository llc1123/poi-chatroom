import React, { Component } from 'react'
import { join } from 'path-extra'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl, InputGroup, Panel, Label } from 'react-bootstrap'
import openSocket from 'socket.io-client'

const ipAddress = 'localhost'
const port = 3000
const socket = openSocket(`http://${ipAddress}:${port}`)

export const reactClass = connect(
  () => (state, props) => ({
    nickname: state.info.basic.api_nickname,
    server: state.info.server.name,
  })
)(class Chatroom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      input: '',
      username: '',
      realname: `${props.nickname}@${props.server}`,
      login: false,
      numUsers: 0,
    }
  }

  componentDidMount() {
    socket.on('login', numUsers => this.setState({ login: true, numUsers }))
    socket.on('new message', (data) => {
      this.setState({
        messages: this.state.messages.concat(data),
      })
    })
    socket.on('self message', (data) => {
      this.setState({
        messages: this.state.messages.concat(data),
      })
    })
  }

  componentWillUnmount() {
    socket.off('login')
    socket.off('new message')
    socket.off('self message')
  }

  sendMessage() {
    if (this.state.input !== '') {
      socket.emit('new message', this.state.input)
      this.setState({ input: '' })
    }
  }

  handleLogin() {
    socket.emit('add user', {
      name: this.state.username ? this.state.username : this.state.realname,
      real: !this.state.username,
    })
  }

  renderMessages() {
    return (
      <div id="chat-text">
        {this.state.messages.map(i => (i.trusted === 'self' ? this.renderSelfMessage(i) : this.renderMessage(i)))}
      </div>
    )
  }

  renderSelfMessage = (data) => {
    const d = new Date(data.timestamp)
    const shortTime = `${d.getHours()}:${(`0${d.getMinutes()}`).substr(-2)}`
    return (
      <Panel className="self-message">
        <Panel.Body>
          {data.message}
          <Label className="shortTime">{shortTime}</Label>
        </Panel.Body>
      </Panel>
    )
  }

  renderMessage = (data) => {
    const d = new Date(data.timestamp)
    const shortTime = `${d.getHours()}:${(`0${d.getMinutes()}`).substr(-2)}`
    return (
      <Panel className="message">
        <Panel.Body>
          <span className={data.trusted === 'trusted' ? 'trusted' : 'untrusted'}>{data.username}: </span>
          {data.message}
          <Label className="shortTime">{shortTime}</Label>
        </Panel.Body>
      </Panel>
    )
  }

  renderInput() {
    return (
      <InputGroup id="chat-input">
        <FormControl type="text" value={this.state.input} onChange={event => this.setState({ input: event.target.value })} />
        <InputGroup.Button>
          <Button type="submit" onClick={() => this.sendMessage()}><i className="fa fa-comment" /></Button>
        </InputGroup.Button>
      </InputGroup>
    )
  }

  renderChat() {
    return (
      <FormGroup id="chatroom-form">
        {this.renderMessages()}
        {this.renderInput()}
      </FormGroup>
    )
  }

  renderLogin() {
    return (
      <FormGroup id="chatroom-login">
        <FormControl
          componentClass="input"
          type="text"
          value={this.state.username}
          onChange={event => this.setState({ username: event.target.value })}
          placeholder={this.state.realname}
        />
        <Button type="submit" onClick={() => this.handleLogin()}><i className="fa fa-comment" /></Button>
      </FormGroup>
    )
  }

  render() {
    return (
      <form id="chatroom" className="chatroom">
        <link rel="stylesheet" href={join(__dirname, 'index.css')} />
        {this.state.login ? this.renderChat() : this.renderLogin()}
      </form>
    )
  }
})
