import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

import { logout } from 'actions/authActions'

import Header from 'components/header/Header'
import Button from 'components/button/Button'
import ProfileBadge from 'components/profile-badge/ProfileBadge'

class HeaderLoggedIn extends PureComponent {
  onLogout = e => {
    e.preventDefault()
    this.props.logout()
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
          <ProfileBadge {...this.props.user} />
          <Button onClick={this.onLogout}>Logout</Button>
        </Header.UserActions>
      </Header>
    )
  }
}

export default connect(
  ({ auth }) => ({ user: auth.user }),
  { logout }
)(HeaderLoggedIn)
