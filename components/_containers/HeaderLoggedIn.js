import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

import { logout } from 'actions/authActions'

import Header from 'components/header/Header'
import Button from 'components/button/Button'
import ProfileBadge from 'components/profile-badge/ProfileBadge'

class HeaderLoggedIn extends PureComponent {
  renderNavigation = () => (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
  )

  renderUserActions = () => (
    <>
      <ProfileBadge {...this.props.user} />
      <Button onClick={this.onLogout}>Logout</Button>
    </>
  )

  onLogout = e => {
    e.preventDefault()
    this.props.logout()
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
  ({ auth }) => ({ user: auth.user }),
  { logout }
)(HeaderLoggedIn)
