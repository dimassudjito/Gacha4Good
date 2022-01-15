const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError, addErrorLoggingToSchema } = require('apollo-server')

const User = require('../../models/User')
const {
  validateRegisterInput,
  validateLoginInput
} = require('../../util/validators')

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  )
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      // validate user data
      const { errors, valid } = validateLoginInput(username, password)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      // check if password is correct
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        throw new UserInputError('Wrong credentials')
      }

      // issue token
      const token = generateToken(user)

      return { ...user._doc, id: user._id, token }
    },
    async register(_, { registerInput: { username, password } }) {
      // validate user data
      const { errors, valid } = validateRegisterInput(username, password)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      // check if username is already taken
      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('Username is already used')
      }

      // hash password and get auth token
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        username,
        password,
        createdAt: new Date().toISOString()
      })
      const res = await newUser.save()
      const token = generateToken(res)

      return { ...res._doc, id: res._id, token }
    }
  }
}
