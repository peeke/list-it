import { PureComponent, Children } from 'react'

import css from './list.scss'

class List extends PureComponent {
  render() {
    const { children, title } = this.props
    return (
      <div className={css.list}>
        <h2>{title}</h2>
        <ul>
          {Children.map(children, child => (
            <li key={child.props.id}>{child}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List
