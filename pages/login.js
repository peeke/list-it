import { PureComponent } from 'react'
import { connect } from 'react-redux'

import { login } from 'actions/authActions'

import DefaultTemplate from 'components/templates/DefaultTemplate'
import Button from 'components/button/Button'

class Login extends PureComponent {
  render() {
    return (
      <DefaultTemplate>
        <h1>Login</h1>
        <Button onClick={this.props.login}>Login</Button>
      </DefaultTemplate>
    )
  }
}

export default connect(
  null,
  { login }
)(Login)