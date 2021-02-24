import React from 'react'
import loginImg from '../../logo.png'
import { Button } from '@material-ui/core'

export class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: '',
      pass: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.signIn = this.signIn.bind(this)
  }
  handleUsernameChange (event) {
    this.setState({
      login: event.target.value
    })
  }

  handlePasswordChange (event) {
    this.setState({
      pass: event.target.value
    })
  }

  signIn (event) {
    event.preventDefault()
    fetch('http://127.0.0.1:4000/users/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.login,
        password: this.state.pass
      })
    })
      .then(r => r.json())
      .then(j => {
        if (!j.token) {
          localStorage.setItem('auth_token', '')
          alert(j.message)
        } else {
          localStorage.setItem('auth_token', j.token)
        }
        this.setState({
          login: '',
          pass: ''
        })
        window.location.reload()
      })
  }

  render () {
    return (
      <div className='base-container' ref={this.props.containerRef}>
        <div className='header' style={{ paddingBottom: 20 }}>
          Login
        </div>
        <div className='content'>
          <div className='image' style={{ paddingBottom: 20 }}>
            <img src={loginImg} style={{ height: 150, width: 150 }} />
          </div>
          <div className='form'>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                placeholder='username'
                value={this.state.login}
                onChange={this.handleUsernameChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                placeholder='password'
                value={this.state.pass}
                onChange={this.handlePasswordChange}
              />
            </div>
          </div>
        </div>
        <div className='footer'>
          <Button
            style={{
              border: '1px solid grey',
              backgroundColor: '#ff224d',
              color: 'white'
            }}
            type='submit'
            className='btn'
            onClick={this.signIn}
          >
            Login
          </Button>
        </div>
      </div>
    )
  }
}
