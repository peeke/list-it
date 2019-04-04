import { PureComponent } from 'react'
import { connect } from 'react-redux'

import { reauthorize } from 'actions/authActions'

import DefaultTemplate from 'components/templates/DefaultTemplate'
import EntityList from 'components/_containers/entity-list/EntityList'

class Index extends PureComponent {
  render() {
    const { entityId } = this.props

    return (
      <DefaultTemplate>
        <EntityList entityId={entityId} />
      </DefaultTemplate>
    )
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.reauthorize()
    }
  }
}

export default connect(
  state => ({
    entityId: state.entities.rootEntity,
    loggedIn: state.auth.loggedIn
  }),
  {
    reauthorize
  }
)(Index)
