import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import innerHtml from 'util/innerHtml'
import FormInput from './FormInput'
import FormSelect from './FormSelect'

import css from './form-item.scss'
const cx = classNames.bind(css)

class FormItem extends PureComponent {
  static defaultProps = {
    onValidityChange: () => {},
    onFocus: () => {},
    onBlur: () => {}
  }

  state = {
    touched: false,
    hasFocus: false,
    validity: { valid: true }
  }

  constructor(...args) {
    super(...args)
    this.state.touched = Boolean(this.props.value)
  }

  onFocus = (...args) => {
    this.setState({ hasFocus: true })
    this.props.onFocus(...args)
  }

  onBlur = (...args) => {
    this.setState({ hasFocus: false })
    this.props.onBlur(...args)
  }

  onValidityChange = validity => {
    this.setState({ validity })
    this.props.onValidityChange(validity)
  }

  getValidationError() {
    const error =
      typeof this.props.error === 'string'
        ? { default: this.props.error }
        : this.props.error

    // If no error messages are defined, bail out
    if (!error) return null

    // First check for a client side error, since this usually provides the most information
    const entry = Object.entries(error)
      .filter(entry => entry[1])
      .find(entry => this.state.validity[entry[0]])

    if (entry) return entry[1]

    // If none of the above:
    return error.default || null
  }

  inputComponent() {
    switch (this.props.type) {
      case 'select':
        return FormSelect
      default:
        return FormInput
    }
  }

  render() {
    const {
      onValidityChange,
      id,
      label,
      description,
      error: _,
      customError,
      onBlur,
      onFocus,
      ...inputProps
    } = this.props

    const { validity, hasFocus } = this.state

    const error = !validity.valid && this.getValidationError()
    const showError = !hasFocus && error

    const Input = this.inputComponent()

    const className = cx('form-item', {
      'form-item-disabled': this.props.disabled,
      'form-item-readonly': this.props.readonly,
      ['form-item-' + this.props.type]: this.props.type
    })

    return (
      <div className={className}>
        {label && (
          <label htmlFor={id} className={css.formItemLabel}>
            {label}
          </label>
        )}

        <Input
          {...inputProps}
          id={id}
          customError={customError}
          onValidityChange={this.onValidityChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={cx('form-field', {
            ['form-field-' + this.props.type]: this.props.type
          })}
          aria-describedby={description ? id + '-description' : null}
        />

        {description && (
          <label
            id={id + '-description'}
            htmlFor={id}
            className={css['form-item-description']}
            {...innerHtml(description)}
          />
        )}

        {showError && <div className={css['form-item-error']}>{error}</div>}
      </div>
    )
  }
}

FormItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  customError: PropTypes.string,
  required: PropTypes.bool,
  readonly: PropTypes.bool,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  describedBy: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onInvalid: PropTypes.func,
  onValidityChange: PropTypes.func
}

export default FormItem
