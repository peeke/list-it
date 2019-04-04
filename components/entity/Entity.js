import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { toggleEntity, deleteEntity } from 'actions/entityActions'

import css from './entity.scss'

import Icon from 'components/icon/Icon'
import Button from 'components/button/Button'
import NumberBadge from 'components/number-badge/NumberBadge'

class Entity extends PureComponent {
  editable = React.createRef()

  static defaultProps = {
    text: '',
    editing: false,
    entities: [],
    onSave: () => {}
  }

  onKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.save(e.target.textContent)
      this.editable.current.innerHTML = ''
    }
  }

  save(value) {
    this.props.onSave(value)
  }

  toggle = () => {
    this.props.toggleEntity(this.props.id)
  }

  delete = () => {
    this.props.deleteEntity(this.props.id)
  }

  render() {
    const { id, editing, text, entities, loggedIn } = this.props
    const showCaret = Boolean(loggedIn && entities.length)
    return (
      <div id={id} className={css['entity']}>
        {editing ? (
          <span
            ref={this.editable}
            onKeyDown={this.onKeyDown}
            contentEditable="true"
            data-placeholder="Add another one"
          />
        ) : (
          <>
            {showCaret && (
              <Button type="icon" onClick={this.toggle}>
                <Icon icon="caret-right" />
              </Button>
            )}
            <span>{text}</span>
            {Boolean(entities.length) && (
              <NumberBadge count={entities.length} />
            )}
            {loggedIn && (
              <Button type="icon" onClick={this.delete}>
                <Icon icon="trash" />
              </Button>
            )}
          </>
        )}
      </div>
    )
  }
}

export default connect(
  state => ({ loggedIn: state.auth.loggedIn }),
  { toggleEntity, deleteEntity }
)(Entity)
