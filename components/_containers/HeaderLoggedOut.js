import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

import { authorize } from 'actions/authActions'

import Header from 'components/header/Header'
import Button from 'components/button/Button'

class HeaderLoggedOut extends PureComponent {
  onLogin = e => {
    e.preventDefault()
    this.props.authorize('/')
  }

  render() {
    return (
      <Header>
        <Header.Navigation>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Header.Navigation>

        <Header.UserActions>
          <Button onClick={this.onLogin}>Login</Button>
        </Header.UserActions>
      </Header>
    )
  }
}

export default connect(
  null,
  { authorize }
)(HeaderLoggedOut)
