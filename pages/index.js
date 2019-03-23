import { PureComponent } from 'react'

import DefaultTemplate from 'components/templates/DefaultTemplate'
import List from 'components/list/List'
import Button from 'components/button/Button'

class Index extends PureComponent {
  state = {
    items: []
  }

  addItem = item => {
    // TODO: state is temporarily kept in the page, for dev purposes
    this.setState({
      items: this.state.items.concat(item)
    })
  }

  render() {
    return (
      <DefaultTemplate>
        <h1>List it!</h1>
        <List id={1} title="Your first list" path={[]} onAddItem={this.addItem}>
          {this.state.items.map(({ id, value }) => (
            <div key={id}>{value}</div>
          ))}
        </List>
        <Button>Add list +</Button>
      </DefaultTemplate>
    )
  }
}

export default Index
