import React, { PureComponent } from 'react'

import css from './entity.scss'

class Entity extends PureComponent {
  editable = React.createRef()

  static defaultProps = {
    text: '',
    editing: false,
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

  render() {
    const { id, editing } = this.props
    return (
      <div id={id} className={css.entity}>
        {editing ? (
          <p
            ref={this.editable}
            onKeyDown={this.onKeyDown}
            contentEditable="true"
            data-placeholder="Add another one"
          />
        ) : (
          <p>{this.props.text}</p>
        )}
      </div>
    )
  }
}

export default Entity
