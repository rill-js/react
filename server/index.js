var React = require('react')
var dom = require('react-dom/server')
var statuses = require('statuses')
var base = require('../share/base')
var wrap = require('../share/wrap')

module.exports = function (opts) {
  return function renderReact (ctx, next) {
    var res = ctx.res
    return next().then(function () {
      if (
        !React.isValidElement(res.body) ||
        statuses.redirect[res.status] ||
        statuses.empty[res.status] ||
        res.get('Location')
        ) return

      try {
        res.body = '<!DOCTYPE html>' + dom.renderToString(
          React.createElement(base, {
            session: ctx.session,
            locals: ctx.locals,
            view: res.body
          })
        )
        res.set('Content-Type', 'text/html; charset=UTF-8')
      } catch (err) {
        res.body = undefined
        throw err
      }
    })
  }
}
module.exports.wrap = wrap
