import { gql } from "apollo-server";
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
        balance: Int!
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
        healthPoints: Int!
        attackPower: Int!
        cardPicture: String!
        headPicture: String!
    }

    type BoxingKingCardPack {
        cardPackId: ID!
        name: String!
        price: Int!
        cards: [CardChanceTuple!]!
    }

    type GameRoom {
        gameRoomId: ID!
        startTime: Int!
        endTime: Int
        players: [User]
    }

    type CardChanceTuple {
        cardId: ID!
        chance: Float
    }

    type Query {
        user: User
        gameRooms: [GameRoom]
    }

    type Mutation {
        login(username: String!, password: String!): String
        register(username: String!, password: String!): String

        createGameRoom(gameId: ID!): GameRoom
        joinGameRoom(gameRoomId: ID!): GameRoom
        boxingKingSendMove(gameRoomId: ID!): GameRoom
    }
`;

let gameRoomCache = new Map();

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
        createGameRoom: async (_, { gameId }) => {
            if (gameId === BOXING_GAME_ID) {
                const newRoom = await BoxingKingGameRoom.NewRoom(user.id);
                gameRoomCache.set(newRoom._id, newRoom);
                return newRoom;
            }
        },
        joinGameRoom: async (_, { gameRoomId }) => {
            const gameRoom = gameRoomCache.get(gameRoomId);

            if (gameRoom) {
                gameRoom.AddPlayer(user.id);
            } else {
                return null;
            }
        },
        boxingKingSendMove: async (_, { gameRoomId, action }) => {
            const gameRoom = gameRoomCache.get(gameRoomId);

            if (gameRoom) {
                gameRoom.AddAction(user.id, action);
            } else {
                return null;
            }
        },
    },
};
