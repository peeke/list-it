import React from 'react'

import css from './entity-features.scss'

function EntityFeatures(props) {
  return (
    <div className={css['entity-features']} aria-hidden={!props.expanded}>
      <label>
        <input type="checkbox" /> Every item is a list
      </label>
      <label>
        <input type="checkbox" /> Every item is a todo
      </label>
    </div>
  )
}

EntityFeatures.defaultProps = {
  expanded: false
}

export default EntityFeatures
