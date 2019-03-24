import React, { PureComponent } from 'react'

import css from './item.scss'

class Item extends PureComponent {
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
      <div id={id} key={id} className={css.item} onKeyDown={this.onKeyDown}>
        <p ref={this.editable} contentEditable={true} />
      </div>
    )
  }

  componentDidMount() {
    this.editable.current.innerHTML = this.props.text
  }
}

export default Item
