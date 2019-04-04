import React, { PureComponent } from 'react'

import css from './header.scss'

class Header extends PureComponent {
  static Navigation = HeaderNavigation
  static UserActions = HeaderUserActions

  render() {
    return (
      <header className={css['header']}>
        <div className={css['header__logo']}>
          List it! {/* TODO: add svg */}
        </div>
        {this.props.children}
      </header>
    )
  }
}

function HeaderNavigation({ children }) {
  if (!children) return null
  return <nav className={css['header__navigation']}>{children}</nav>
}

function HeaderUserActions({ children }) {
  if (!children) return null
  return <nav className={css['header__user-actions']}>{children}</nav>
}

export default Header
