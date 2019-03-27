import { PureComponent } from 'react'
import { connect } from 'react-redux'

import { loginCallback } from 'actions/authActions'

import DefaultTemplate from 'components/templates/DefaultTemplate'

class Callback extends PureComponent {
  componentDidMount() {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      this.props.loginCallback(window.location.hash, '/')
    }
  }

  render() {
    return (
      <DefaultTemplate>
        <h1>Working on it...</h1>
      </DefaultTemplate>
    )
  }
}

export default connect(
  null,
  { loginCallback }
)(Callback)
