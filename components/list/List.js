import { PureComponent, Children } from 'react'

import Icon from 'components/icon/Icon'

import css from './list.scss'

class List extends PureComponent {
  render() {
    const { children, title } = this.props
    return (
      <div className={css.list}>
        <header className={css['list__header']}>
          <h2>{title}</h2>
          <Icon icon="cog" />
          <Icon icon="filters" />
        </header>
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
