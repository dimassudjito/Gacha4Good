import { gql } from "apollo-server-core";
import { compareSync } from "bcrypt";
import { User } from "./models/User.js";

//const User = require('../../models/User')
//const {
//validateRegisterInput,
//validateLoginInput
//} = require('../../util/validators')

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

    type LoginResult {
        user: User!
        token: String!
    }

    type Mutation {
        login(username: String!, password: String!): LoginResult
        register(username: String!, password: String!): LoginResult

        createGameRoom(gameId: ID!): GameRoom
        joinGameRoom(gameRoomId: ID!): GameRoom
        boxingKingSendMove(gameRoomId: ID!): GameRoom
    }
`;
function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
}

let gameRoomCache = new Map();

export const resolvers = {
    Query: {
        user: async () => User.LogIn("testuser1", "asdf"),
        gameRooms: () => {},
    },
    Mutation: {
        login: async (_, { username, password }) => {
            const user = await User.LogIn(username, password);

            // check if password is correct
            const match = compareSync(password, user.password);
            if (!match) {
                throw new UserInputError("Wrong credentials");
            }

            // issue token
            const token = generateToken(user);

            return { user, token };
        },

        register: async (_, { username, password }) => {
            // validate user data
            // const { errors, valid } = validateRegisterInput(username, password);
            // if (!valid) {
            //     throw new UserInputError("Errors", { errors });
            // }

            // check if username is already taken
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError("Username is already used");
            }

            // hash password and get auth token
            const newUser = await User.CreateUser(username, password);
            const token = generateToken(newUser);

            return { newUser, token };
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
