import css from './button.scss'
import classNames from 'classnames'

const cx = classNames.bind(css)

const Button = props => {
  const { text, children, type, ...handlers } = props
  const className = classNames(css.button, {
    [css['button--icon']]: type === 'icon'
  })
  return (
    <button {...handlers} className={className}>
      {children}
    </button>
  )
}

export default Button
