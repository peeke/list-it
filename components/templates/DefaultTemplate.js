import Head from 'next/head'

import css from './default-templates.scss'

export default function DefaultTemplate(props) {
  return (
    <div className={css.template}>
      <Head>
        <title>List.it!</title>
      </Head>
      {props.children}
    </div>
  )
}
