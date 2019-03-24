import { PureComponent, Children } from 'react'

import Button from 'components/button/Button'

import css from './list.scss'

class List extends PureComponent {
  static defaultProps = {
    onAddItem: () => {}
  }

  state = {
    newItem: ''
  }

  onNewItemChange = e => {
    this.setState({ newItem: e.target.value })
  }

  onAddItem = () => {
    this.props.onAddItem({ value: this.state.newItem })
    this.setState({ newItem: '' })
  }

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
