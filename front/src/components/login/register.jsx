import React from 'react'
import loginImg from '../../logo.png'
import { Button } from '@material-ui/core'

export class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: '',
      pass: '',
      passr: '',
      fn: '',
      ln: ''
    }
    this.handleLoginChange = this.handleLoginChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handlePassRChange = this.handlePassRChange.bind(this)
    this.handleFNchange = this.handleFNchange.bind(this)
    this.handleLNchange = this.handleLNchange.bind(this)
    this.signUp = this.signUp.bind(this)
  }
  handleLoginChange (event) {
    this.setState({
      login: event.target.value
    })
  }

  handlePassChange (event) {
    this.setState({
      pass: event.target.value
    })
  }

  handlePassRChange (event) {
    this.setState({
      passr: event.target.value
    })
  }

  handleFNchange (event) {
    this.setState({
      fn: event.target.value
    })
  }

  handleLNchange (event) {
    this.setState({
      ln: event.target.value
    })
  }

  signUp (event) {
    event.preventDefault()
    fetch('http://127.0.0.1:4000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.login,
        password: this.state.pass,
        passwordRepeat: this.state.passr,
        firstName: this.state.fn,
        lastName: this.state.ln
      })
    })
      .then(r => r.json())
      .then(j => alert(j.message))
      .then(
        this.setState({
          login: '',
          pass: '',
          passr: '',
          fn: '',
          ln: ''
        })
      )
  }
  render () {
    return (
      <div className='base-container' ref={this.props.containerRef}>
        <div className='header' style={{ paddingTop: '20px' }}>
          Register
        </div>
        <div className='content'>
          <div className='form'>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                placeholder='username'
                value={this.state.login}
                onChange={this.handleLoginChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                placeholder='password'
                value={this.state.pass}
                onChange={this.handlePassChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='passwordRepeat'>Password repeat</label>
              <input
                type='password'
                name='passwordRepeat'
                placeholder='password'
                value={this.state.passr}
                onChange={this.handlePassRChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='firstName'>First name</label>
              <input
                type='text'
                name='firstName'
                placeholder='First name'
                value={this.state.fn}
                onChange={this.handleFNchange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last name</label>
              <input
                type='text'
                name='lastName'
                placeholder='Last name'
                value={this.state.ln}
                onChange={this.handleLNchange}
              />
            </div>
            <Button
              type='submit'
              className='btn'
              onClick={this.signUp}
              style={{
                border: '1px solid grey',
                backgroundColor: '#ff224d',
                color: 'white'
              }}
            >
              SignUp
            </Button>
          </div>
        </div>
        <div className='footer'></div>
      </div>
    )
  }
}
