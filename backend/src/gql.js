import { gql } from "apollo-server";

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
        login: async (_, { username, password }) => {},
        register: async (_, { username, password }) => {},
        // UserAddBalance,
        // UserBuyItem,
        // UserDeleteItem,
        createGameRoom: async (_, { gameId }) => {},
        joinGameRoom: async (_, { gameId }) => {},
        deleteGameRoom: async (_, { gameId }) => {},
        boxingKingSendMove: async (_, { gameRoomId }) => {},
    },
};
