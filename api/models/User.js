/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    email: {
      type: 'string',
      unique: true,
      required: true,
      isEmail: true,
      maxLength: 255,
      example: 'toto@gmail.com'
    },
    firstName: {
      type: 'string',
      maxLength: 255,
      example: 'Johnn'
    },
    lastName: {
      type: 'string',
      maxLength: 255,
      example: 'Doe'
    },
    username: {
      type: 'string',
      maxLength: 255,
      example: 'Ezob'
    },
    dateOfBirth: {
      type: 'number',
      isBefore: new Date()
    },
    sex: {
      type: 'string',
      isIn: ['male', 'female']
    },
    password: {
      type: 'string',
      maxLength: 255,
      required:true,
      encrypt: true
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    team: {
      model: "team"
    }

  },

}

