import css from './button.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(css)

import Icon from 'components/icon/Icon'

function Button(props) {
  const { text, children, icon, ...handlers } = props
  const className = cx('button', {
    'button--icon': icon
  })

  return (
    <button {...handlers} className={className}>
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  )
}

export default Button
