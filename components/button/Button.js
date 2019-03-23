import css from './button.scss'

const Button = props => {
  const { text, children, ...handlers } = props
  return (
    <button {...handlers} className={css.button}>
      {children}
    </button>
  )
}

export default Button
