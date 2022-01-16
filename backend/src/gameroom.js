const { AuthenticationError, UserInputError } = require('apollo-server');

const gameroom = require('../../models/gameroom');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getGameroom() {
      try {
        const gamerooms = await gameroom.find().sort({ createdAt: -1 });
        return gamerooms;
      } catch (err) {
        throw new Error(err);
      }
    },  
  },

  Mutation: {
    async createGameRoom (_, { gameId }){
      if (gameId.trim() === '') {
        throw new Error('Game must not be empty');
      }

      const newGameroom  = await BoxingKingGameRoom.NewRoom(user.id); 

      const room = await newGameroom.save();

      return room;
    },

  }
}