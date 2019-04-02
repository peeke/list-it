import React from 'react'
import css from './icon.scss'

const Icon = ({ icon }) => (
  <img className={css.icon} src={`/static/icons/${icon}.svg`} />
)

export default Icon
