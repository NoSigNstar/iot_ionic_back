/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

module.exports = {

  login: async function (req, res) {
    var user = await User.findOne({
      email: req.param('email')
    })
    if (!user) return res.notFound()

    await bcrypt.compare(req.param('password', user.password))

    let token = jwt.sign({user: user.id}, sails.jwt.jwtSecret, {expiresIn: sails.jwt.jwtExpiresIn})
  },
  logout: function (req, res) {

  },
  register: function (req, res) {
    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('mail manquant')
    }
    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('met un mdp')
    }
    if (req.param('email').length < 4) {
      return res.badRequest('mdp de merde')
    }

    let user = await
    sails.helpers.createUser({
        email: req.param('email'),
        password: req.param('password')
      }
    )
    let token = jwt.sign({user: user.id}, sails.jwt.jwtSecret, {expiresIn: sails.jwt.jwtExpiresIn})
    return res.ok(token)

  },

}

