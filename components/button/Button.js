import css from './button.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(css)

function Button(props) {
  const { text, children, type, ...handlers } = props
  const className = cx('button', {
    'button--icon': type === 'icon'
  })

  return (
    <button {...handlers} className={className}>
      {children}
    </button>
  )
}

export default Button
