import React, { PureComponent, useState } from 'react'
import { connect } from 'react-redux'

import css from './entity-list.scss'

import { getEntityById, populateEntity } from 'selectors/entitySelectors'
import { createEntity, toggleEntity } from 'actions/entityActions'

import Icon from 'components/icon/Icon'
import Button from 'components/button/Button'
import List from 'components/list/List'
import Entity from 'components/entity/Entity'
import EntityFeatures from 'components/entity-features/EntityFeatures'

class EntityList extends PureComponent {
  static defaultProps = {
    entityId: null,
    level: 1
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

  toggle = () => {
    this.props.toggleEntity(this.props.entityId)
  }

  render() {
    const { list, loggedIn } = this.props

    return (
      <div className={css['entity-list']}>
        {this.renderHeader()}

        <EntityFeatures expanded={this.state.showFilterPanel} />

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
    const { list, loggedIn, rootEntity } = this.props
    const H = `h${this.props.level}`

    return (
      <header className={css['entity-list__header']}>
        {!rootEntity && (
          <Button type="icon" onClick={this.toggle}>
            <Icon icon="caret-down" />
          </Button>
        )}
        <H>{list.text}</H>
        {loggedIn && (
          <Button type="icon" onClick={this.toggleFilterPanel}>
            <Icon icon="filters" />
          </Button>
        )}
      </header>
    )
  }

  renderEntity = ({ id, ...props }) => {
    return props.expanded ? (
      <ConnectedEntityList
        key={id}
        entityId={id}
        level={this.props.level + 1}
      />
    ) : (
      <Entity key={id} id={id} {...props} />
    )
  }
}

const ConnectedEntityList = connect(
  (state, ownProps) => {
    const entity = getEntityById(state.entities, ownProps.entityId)
    const populatedEntity = populateEntity(entity, state.entities)
    return {
      list: populatedEntity,
      loggedIn: state.auth.loggedIn,
      rootEntity: entity.id === state.entities.rootEntity
    }
  },
  { createEntity, toggleEntity }
)(EntityList)

export default ConnectedEntityList
