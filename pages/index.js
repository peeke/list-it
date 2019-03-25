import { PureComponent } from 'react'
import { connect } from 'react-redux'

import { createListItem, addList } from 'actions/listActions'
import { getListById } from 'selectors/listSelectors'

import DefaultTemplate from 'components/templates/DefaultTemplate'
import List from 'components/list/List'
import Item from 'components/item/Item'
import Button from 'components/button/Button'

class Index extends PureComponent {
  state = {
    newListName: '',
    items: []
  }

  addItem = (item, listId) => {
    this.props.createListItem(listId, item)
  }

  addList = () => {
    this.props.addList(this.state.newListName)
    this.setState({ newListName: '' })
  }

  onNewListNameChange = e => {
    this.setState({ newListName: e.target.value })
  }

  render() {
    const { lists } = this.props

    return (
      <DefaultTemplate>
        <h1>List it!</h1>
        {lists.map(list => (
          <div key={list.id}>
            <h2>{list.title}</h2>
            <List id={list.id} key={list.id}>
              {list.items.map(item => (
                <Item key={item.id} text={item.value} />
              ))}
              <Item
                key="new"
                onSave={value => this.addItem({ value }, list.id)}
              />
            </List>
          </div>
        ))}
        <input
          value={this.state.newListName}
          onChange={this.onNewListNameChange}
        />
        <Button onClick={this.addList}>Add list +</Button>
      </DefaultTemplate>
    )
  }
}

export default connect(
  state => {
    const lists = state.lists.allIds.map(id => getListById(state, id))
    const itemIds = [...state.items.allIds]
    return { lists, itemIds }
  },
  {
    createListItem,
    addList
  }
)(Index)
