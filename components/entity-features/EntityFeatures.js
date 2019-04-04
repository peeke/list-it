import React, { PureComponent } from 'react'

import css from './entity-features.scss'

class EntityFeatures extends PureComponent {
  static defaultProps = {
    expanded: false
  }

  render() {
    return (
      <div
        className={css['entity-features']}
        aria-hidden={!this.props.expanded}
      >
        <label>
          <input type="checkbox" /> Every item is a list
        </label>
        <label>
          <input type="checkbox" /> Every item is a todo
        </label>
      </div>
    )
  }
}

export default EntityFeatures
