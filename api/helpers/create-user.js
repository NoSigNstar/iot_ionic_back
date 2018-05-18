var bcrypt = require('bcryptjs')

module.exports = {


  friendlyName: 'Create user',


  description: '',


  inputs: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    username: {
      type: 'string'
    },
    firstName:{
      type: 'string'
    },
    lastName:{
      type: 'string'
    }

  },


  exits: {
    invalid: {
      responseType:'badRequest',
      description: "Email and/or password invalid"
    },
    EmailAlreadyInUse: {
      statusCode: 409,
      description: "Email already in use"
    },
  },


  fn: async function (inputs, exits) {
    var attr = {
      email: inputs.email.toLowerCase(),
      password: inputs.password,
      username: inputs.username,
      firstName: inputs.firstName,
      lastName: inputs.lastName

    };

    if(inputs.password){
      inputs.password = await bcrypt.hash(inputs.password, 10)
      let user = await User.create(attr)
        .intercept('E_UNIQUE', () => 'EmailAlreadyInUse')
        .intercept({name: 'UsageError'}, () => 'Invalid')
        .fetch()
      console.log('mon attr:' + attr.firstName)
      return exits.success(user);
      console.log('succes:' + user)
    } else {
      return exits.invalid("Missing password")
    }

  }
};

