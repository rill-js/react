'use strict'

var assert = require('assert')
var agent = require('supertest')
var Rill = require('rill')
var React = require('react')
var create = require('create-react-class')
var PropTypes = require('prop-types')
var View = create({
  contextTypes: {
    locals: PropTypes.object
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

describe('@rill/react', function () {
  it('should work on the server', function () {
    var serverViews = require('../server')
    var request = agent(
      Rill()
        .use(serverViews())
        .get('/', function (ctx, next) {
          ctx.locals['ctx'] = 'locals'
          ctx.res.body = React.createElement(View, { hello: 'world' })
        })
        .listen()
    )

    return request
      .get('/')
      .expect(200)
      .expect('content-type', 'text/html; charset=UTF-8')
      .expect(function (res) {
        var body = res.text.split('</body>')[0].split('>').pop()
        assert.equal(
          body,
          'worldlocals'
        )
      })
  })

  it('should work in the browser', function () {
    global.requestAnimationFrame = function (cb) { setTimeout(cb, 0) }

    var clientViews = require('../client')
    var request = agent(
      Rill()
        .use(clientViews())
        .get('/', function (ctx, next) {
          ctx.locals['ctx'] = 'locals'
          ctx.res.body = React.createElement(View, { hello: 'world' })
        })
        .listen()
    )

    return request
      .get('/')
      .expect(200)
      .expect('content-type', 'text/html; charset=UTF-8')
      .expect(function (res) {
        assert.equal(
          document.body.innerHTML,
          'worldlocals'
        )
      })
  })
})
