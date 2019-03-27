import { PureComponent } from 'react'
import { connect } from 'react-redux'

import { logout } from 'actions/authActions'

import DefaultTemplate from 'components/templates/DefaultTemplate'
import Button from 'components/button/Button'

class Logout extends PureComponent {
  render() {
    return (
      <DefaultTemplate>
        <h1>Logout</h1>
        <Button onClick={this.props.logout}>Logout</Button>
      </DefaultTemplate>
    )
  }
}

export default connect(
  null,
  { logout }
)(Logout)
