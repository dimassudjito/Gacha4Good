import { gql } from "apollo-server";
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


export const types = gql`
    type User {
        userId: ID!
        username: String!
        balance: Integer!
        # inventory: Inventory
    }
    interface GameData {
        gameId: ID!
        name: String!
    }
    type BoxingKingGameData implements GameData {
        gameId: ID!
        name: String!
        cards: [BoxingKingGameCard!]!
        shop: [BoxingKingCardPack!]!
    }
    type BoxingKingGameCard {
        cardId: ID!
        name: String!
        healthPoints: Integer!
        attackPower: Integer!
        cardPicture: String!
        headPicture: String!
    }
    type BoxingKingCardPack {
        cardPackId: ID!
        name: String!
        price: Integer!
        cards: [CardChanceTuple!]!
    }
    type GameRoom {
        gameRoomId: ID!
        startTime: Date!
        endTime: Date
        players: [User]
    }
    type CardChanceTuple {
        cardId: ID!
        chance: Float
    }
`;


export const resolvers = {
    Query: {
        user: async () => User.LogIn("testuser1", "asdf"),
        gameRooms: () => {},
    },
    Mutation: {
        login: async (_, { username, password }) => {
        // validate user data
        const { errors, valid } = validateLoginInput(username, password)
        if (!valid) {
            throw new UserInputError('Errors', { errors })
        }

        const user = await User.LogIn(username, password);

        // check if password is correct
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw new UserInputError('Wrong credentials')
        }

        // issue token
        const token = generateToken(user)

        return { ...user._doc, id: user._id, token }
        },

        register: async (_, { username, password }) => {
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
        const newUser = await User.CreateUser(username,password)
        const token = generateToken(res)

        return { ...res._doc, id: res._id, token }
        },
        // UserAddBalance,
        // UserBuyItem,
        // UserDeleteItem,
        createGameRoom: async (_, { gameId }) => {},
        joinGameRoom: async (_, { gameRoomId }) => {},
        boxingKingSendMove: async (_, { gameRoomId }) => {},
    },
};
