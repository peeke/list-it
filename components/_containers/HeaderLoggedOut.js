import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

import { authorize } from 'actions/authActions'

import Header from 'components/header/Header'
import Button from 'components/button/Button'

class HeaderLoggedOut extends PureComponent {
  renderNavigation = () => (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
  )

  renderUserActions = () => <Button onClick={this.onLogin}>Login</Button>

  onLogin = e => {
    e.preventDefault()
    this.props.authorize('/')
  }

  render() {
    return (
      <Header
        navigation={this.renderNavigation()}
        userActions={this.renderUserActions()}
      />
    )
  }
}

export default connect(
  null,
  { authorize }
)(HeaderLoggedOut)
