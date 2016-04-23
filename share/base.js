var React = require('react')

module.exports = React.createClass({
  displayName: 'BaseElement',
  propTypes: {
    locals: React.PropTypes.object,
    view: React.PropTypes.element.isRequired
  },
  childContextTypes: { locals: React.PropTypes.object },
  getChildContext: function () {
    return { locals: this.props.locals }
  },
  render: function () {
    return React.cloneElement(this.props.view)
  }
})
