import React, { PureComponent } from 'react'

import css from './entity.scss'

class Entity extends PureComponent {
  editable = React.createRef()

  static defaultProps = {
    text: '',
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
    const { id } = this.props
    return (
      <div id={id} key={id} className={css.entity} onKeyDown={this.onKeyDown}>
        <p
          ref={this.editable}
          contentEditable={true}
          data-placeholder="Add another list"
        />
      </div>
    )
  }

  componentDidMount() {
    this.editable.current.innerHTML = this.props.text
  }
}

export default Entity
