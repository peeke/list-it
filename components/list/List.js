import { PureComponent, Children } from 'react'

import css from './list.scss'

const List = props => (
  <div>
    <ul className={css.list}>
      {Children.map(props.children, (child, i) => {
        return child ? <li key={child.props.id || i}>{child}</li> : null
      })}
    </ul>
  </div>
)

export default List
