import Head from 'next/head'
import { connect } from 'react-redux'

import css from './default-templates.scss'

import HeaderLoggedIn from 'components/_containers/HeaderLoggedIn'
import HeaderLoggedOut from 'components/_containers/HeaderLoggedOut'

function DefaultTemplate({ children, loggedIn }) {
  return (
    <div className={css.template}>
      <Head>
        <title>List.it!</title>
      </Head>
      {loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
      {children}
    </div>
  )
}

export default connect(state => ({
  loggedIn: state.auth.loggedIn
}))(DefaultTemplate)
