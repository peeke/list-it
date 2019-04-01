import React from 'react'

import css from './profile-badge.scss'

export default function ProfileBadge({ email, name, picture }) {
  return (
    <div className={css['profile-badge']}>
      <div>
        <strong id="profile-badge-name" className={css['profile-badge__name']}>
          {name}
        </strong>
        <span className={css['profile-badge__email']}>{email}</span>
      </div>
      <div className={css['profile-badge__image']}>
        <img src={picture} aria-labelledby="profile-badge-name" />
      </div>
    </div>
  )
}
