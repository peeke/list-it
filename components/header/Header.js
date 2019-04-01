import React, { PureComponent } from 'react'

import css from './header.scss'

class Header extends PureComponent {
  render() {
    return (
      <header className={css.header}>
        <div className={css['header__logo']}>
          List it! {/* TODO: add svg */}
        </div>
        {this.renderNavigation()}
        {this.renderUserActions()}
      </header>
    )
  }

  renderNavigation() {
    if (!this.props.navigation) return null
    return (
      <div className={css['header__navigation']}>{this.props.navigation}</div>
    )
  }

  renderUserActions() {
    if (!this.props.userActions) return null
    return (
      <div className={css['header__user-actions']}>
        {this.props.userActions}
      </div>
    )
  }
}

export default Header
