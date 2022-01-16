import { gql } from "apollo-server";

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
        login: async (_, { username, password }) => {},
        register: async (_, { username, password }) => {},
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
