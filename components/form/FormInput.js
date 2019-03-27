import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import copyObjectWithGetterResults from 'util/copyObjectWithGetterResults'

import css from './form-field.scss'
const cx = classNames.bind(css)

class FormInput extends PureComponent {
  static defaultProps = {
    type: 'text',
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    onInvalid: () => {},
    onValidityChange: () => {}
  }

  state = {
    valid: null
  }

  input = React.createRef()

  onBlur = e => {
    this.props.onBlur(e)
    this.onValidityChange()
  }

  onFocus = e => {
    this.setState({ valid: true })
    this.props.onFocus(e)
  }

  onInvalid = e => {
    if (document.activeElement === e.target) return // Bail out if the input still has focus
    e.preventDefault()
    this.onValidityChange()
    this.props.onInvalid(e)
  }

  onValidityChange = () => {
    const validity = copyObjectWithGetterResults(this.input.current.validity)
    validity[this.input.current.validationMessage] = validity.customError
    this.props.onValidityChange(validity)
    this.setState({ valid: validity.valid })
  }

  render() {
    const {
      onValidityChange,
      onFocus,
      onBlur,
      customError,
      mask,
      maskChar,
      ...props
    } = this.props

    const Input = this.props.type === 'textarea' ? 'textarea' : 'input'
    const className = cx('form-field', {
      ['form-field-' + this.props.type]: this.props.type
    })

    return (
      <Input
        {...props}
        ref={this.input}
        className={className}
        aria-invalid={this.state.valid === false}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onInvalid={this.onInvalid}
      />
    )
  }

  componentDidMount() {
    if (this.props.type === 'checkbox' || this.props.type === 'radio') return
    if (this.props.value) {
      this.input.current.checkValidity()
      this.input.current.dispatchEvent(
        new CustomEvent('blur', { bubbles: true })
      )
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.customError !== prevProps.customError) {
      this.input.current.setCustomValidity(this.props.customError || '')
      this.input.current.checkValidity()
    }
  }
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  customError: PropTypes.string,
  required: PropTypes.bool,
  readonly: PropTypes.bool,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  describedBy: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onInvalid: PropTypes.func
}

export default FormInput
