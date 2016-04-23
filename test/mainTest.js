var assert = require('assert')
var agent = require('supertest')
var Rill = require('rill')
var React = require('react')
var serverViews = require('../server')

describe('Rill/React', function () {
  it('should work on the server', function (done) {
    var View = React.createClass({
      contextTypes: {
        locals: React.PropTypes.object
      },
      render: function () {
        var locals = this.context.locals
        var props = this.props
        return React.createElement('html', null,
          React.createElement('head'),
          React.createElement('body', null, props.hello + locals.ctx)
        )
      }
    })

    var request = agent(
      Rill()
        .use(serverViews())
        .get('/', function (ctx, next) {
          ctx.locals['ctx'] = 'locals'
          ctx.res.body = React.createElement(View, { hello: 'world' })
        })
        .listen()
    )

    request
      .get('/')
      .expect(200)
      .expect(function (res) {
        var body = res.text.split('</body>')[0].split('>').pop()
        assert.equal(
          body,
          'worldlocals'
        )
      })
      .expect('content-type', 'text/html; charset=UTF-8')
      .end(done)
  })
})
