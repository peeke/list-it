import React from 'react'

import css from './number-badge.scss'

function NumberBadge(props) {
  return <div className={css['number-badge']}>{props.count || 0}</div>
}

export default NumberBadge
