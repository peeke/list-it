import DefaultTemplate from 'components/templates/DefaultTemplate'

class Error extends React.PureComponent {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  error({ statusCode }) {
    return statusCode
      ? `An error ${statusCode} occurred on server`
      : 'An error occurred on client'
  }

  render() {
    return (
      <DefaultTemplate>
        <p>{this.error(this.props)}</p>
      </DefaultTemplate>
    )
  }
}

export default Error
