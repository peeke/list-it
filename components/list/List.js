import { PureComponent, Children } from 'react'

import Button from 'components/button/Button'

import css from './list.scss'

let id = 0

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
    id += 1
    this.props.onAddItem({ id, value: this.state.newItem })
  }

  render() {
    const { children, title } = this.props
    return (
      <div className={css.list}>
        <h2>{title}</h2>
        <div>
          <ul>
            {Children.map(children, this.renderItem)}
            <li>
              <input
                type="text"
                onChange={this.onNewItemChange}
                value={this.state.newItem}
              />
              <Button onClick={this.onAddItem}>Add list item</Button>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  renderItem(child, i) {
    return <li key={i}>{child}</li>
  }
}

export default List
