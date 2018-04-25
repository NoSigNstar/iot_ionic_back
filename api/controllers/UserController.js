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
      email: req.body.email
    })
    if (!user) return res.notFound()

    await bcrypt.compare(req.body.password, user.password)

    let token = jwt.sign({id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName}, sails.config.jwt.jwtSecret, {expiresIn: sails.config.jwt.jwtExpiresIn})
    return res.ok(token)
  },
  logout: function (req, res) {

  },
  signup: async function (req, res) {
    if (_.isUndefined(req.body.email)) {
      return res.badRequest('mail manquant')
    }
    if (_.isUndefined(req.body.password)) {
      return res.badRequest('met un mdp')
    }
    if (req.body.email.length < 2) {
      return res.badRequest('mdp de merde')
    }

    console.log('***')
    console.log(req.body.email)
    let user = await
    sails.helpers.createUser.with({
      email: req.body.email,
      password: req.body.password
      }
    )
    let token = jwt.sign({id: user.id, email: user.email}, sails.config.jwt.jwtSecret, {expiresIn: sails.config.jwt.jwtExpiresIn})
    return res.ok(token)

  },

}

