import { PureComponent } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

import { addNewEntityToList, createList } from 'actions/listActions'
import { reauthorize } from 'actions/authActions'
import { getAllListsPopulated } from 'selectors/listSelectors'

import DefaultTemplate from 'components/templates/DefaultTemplate'
import List from 'components/list/List'
import Entity from 'components/entity/Entity'
import Button from 'components/button/Button'

class Index extends PureComponent {
  state = {
    newListName: '',
    entities: []
  }

  addEntity = (entity, listId) => {
    this.props.addNewEntityToList(listId, entity)
  }

  addList = () => {
    this.props.createList(this.state.newListName)
    this.setState({ newListName: '' })
  }

  onNewListNameChange = e => {
    this.setState({ newListName: e.target.value })
  }

  render() {
    const { lists, loggedIn } = this.props

    return (
      <DefaultTemplate>
        <h1>List it!</h1>
        {lists.map(list => (
          <div key={list.id}>
            <h2>{list.title}</h2>
            <List id={list.id} key={list.id}>
              {list.entities.map(entity => (
                <Entity key={entity.id} text={entity.value} />
              ))}
              <Entity
                key="new"
                onSave={value => this.addEntity({ value }, list.id)}
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

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.reauthorize()
    }
  }
}

export default connect(
  state => ({
    lists: getAllListsPopulated(state.lists, state.entities),
    loggedIn: state.auth.loggedIn
  }),
  {
    addNewEntityToList,
    createList,
    reauthorize
  }
)(Index)
