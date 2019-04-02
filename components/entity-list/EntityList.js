import React, { PureComponent, useState } from 'react'
import { connect } from 'react-redux'

import css from './entity-list.scss'

import { getEntityById, populateEntity } from 'selectors/entitySelectors'
import { createEntity } from 'actions/entityActions'

import Icon from 'components/icon/Icon'
import Button from 'components/button/Button'
import List from 'components/list/List'
import Entity from 'components/entity/Entity'

class EntityList extends PureComponent {
  static defaultProps = {
    entityId: null
  }

  state = {
    showFilterPanel: false
  }

  onEntitySave = text => {
    this.props.createEntity({ text }, this.props.list.id)
  }

  toggleFilterPanel = () => {
    this.setState({ showFilterPanel: !this.state.showFilterPanel })
  }

  render() {
    const { list, loggedIn } = this.props

    return (
      <div className={css['entity-list']}>
        {this.renderHeader()}

        <div
          className={css['entity-list__filters']}
          aria-hidden={!this.state.showFilterPanel}
        >
          Filter panel
        </div>

        <List {...list} key={list.id}>
          {list.entities.map(this.renderEntity)}
          {loggedIn && (
            <Entity id="new" editing={true} onSave={this.onEntitySave} />
          )}
        </List>
      </div>
    )
  }

  renderHeader() {
    const { list, loggedIn } = this.props

    return (
      <header className={css['entity-list__header']}>
        <h2>{list.text}</h2>
        {loggedIn && (
          <Button type="icon" onClick={this.toggleFilterPanel}>
            <Icon icon="filters" />
          </Button>
        )}
      </header>
    )
  }

  renderEntity = ({ id, ...props }) => <Entity key={id} id={id} {...props} />
}

export default connect(
  (state, ownProps) => {
    const entity = getEntityById(state.entities, ownProps.entityId)
    const populatedEntity = populateEntity(entity, state.entities)
    return {
      list: populatedEntity,
      loggedIn: state.auth.loggedIn
    }
  },
  { createEntity }
)(EntityList)
