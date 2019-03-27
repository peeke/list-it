import React, { PureComponent } from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import css from './form.scss'

const cx = classNames.bind(css)

class Footer extends PureComponent {
  render() {
    const className = cx('form-footer', {
      formFooterCentered: this.props.center
    })

    return <div className={className}>{this.props.children}</div>
  }
}

class Form extends PureComponent {
  static Footer = Footer

  static defaultProps = {
    onSubmit: () => {}
  }

  onSubmit = e => {
    const valid = e.target.checkValidity()
    valid ? this.props.onSubmit(e) : e.preventDefault()
  }

  render() {
    const { children, action, ...props } = this.props

    return (
      <form
        action={action}
        className={css.form}
        noValidate
        onSubmit={this.onSubmit}
        {...props}
      >
        {children}
      </form>
    )
  }
}

Form.propTypes = {
  action: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
}

Form.Footer.propTypes = {
  centered: PropTypes.bool
}

export default Form
