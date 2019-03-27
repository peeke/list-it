import css from './form-field.scss'

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class FormSelect extends PureComponent {
  static defaultProps = {
    onChange: () => {},
    onFocus: () => {},
    onValidityChange: () => {}
  }

  input = React.createRef()

  get invalid() {
    return this.input.current ? !this.input.current.validity.valid : false
  }

  onChange = e => {
    this.props.onChange(e)
    this.props.onValidityChange(this.input.current.validity)
  }

  onInvalid = () => {
    this.props.onValidityChange(this.input.current.validity)
  }

  render() {
    const { onValidityChange, options, placeholder, ...props } = this.props
    if (!options) return null

    return (
      <select
        {...props}
        ref={this.input}
        className={css['form-field']}
        aria-invalid={this.invalid}
        onChange={this.onChange}
        onInvalid={this.onInvalid}
      >
        {/* {placeholder &&
          this.renderOption({ label: placeholder, disabled: true }, -1)} */}
        {options.map(this.renderOption)}
      </select>
    )
  }

  renderOption = (props, key) => {
    const { label, ...optionProps } = props
    return (
      <option {...optionProps} key={key}>
        {label}
      </option>
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

FormSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  disabled: PropTypes.bool,
  customError: PropTypes.string,
  required: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  describedBy: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onInvalid: PropTypes.func
}

export default FormSelect
