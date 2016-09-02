'use strict'

var React = require('react')
var dom = require('react-dom')
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
      return new Promise(function (resolve, reject) {
        try {
          dom.render(
            React.createElement(base, {
              locals: ctx.locals,
              view: res.body
            }),
            document, resolve
          )
          res.set('Content-Type', 'text/html; charset=UTF-8')
        } catch (err) {
          res.body = undefined
          reject(err)
        }
      })
    })
  }
}
module.exports.wrap = wrap
