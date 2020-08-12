var GamePlayer = function(player) {

  game = null;
  discord_id = player.discord_id;

  function getOpponent() {
    if (game == null) {
      throw new Error("Player is not in a game!");
    }
    return game.getOpponent(this);
  }

};

const MoveType = function(name) {

  this.name = () => {
    if (name == null || name.trim().length == 0) {
      throw new Error("Name cannot be null or empty!");
    }
    return name;
  }
}

MoveType.prototype.equals = function(object) {
  if (typeof object != MoveType) {
    return false;
  }
  return this.name === object.name;
}

const MoveTypes = {

  MoveTypes() {
    this.types = [attacking(), block(), charge(), block_charge()];
  },

  attacking() {
    return MoveType("Attacking");
  },

  attacking_charge() {
    return MoveType("Attacking+Charge");
  },

  block() {
    return MoveType("Defence");
  },

  charge() {
    return MoveType("Charge");
  },

  block_charge() {
    return MoveType("Block+Charge");
  },

  isCharge(moveType) {
    return moveType.name.includes("Charge");
  }


};

const Move = function(name, moveType) {

  function Move() {
    if (name == null || name == undefined || name.trim().length == 0) {
      throw new Error("Move name cannot be null, undefined, or empty!");
    }
    if (moveType == null || moveType == undefined) {
      throw new Error("MoveType cannot be null or undefined!");
    }
    this.name = name;
    this.moveType = moveType;
  }

  function handleMove(gameData1, gameData2, move1, move2) {
    throw new Error("Prototype should have overrode this function!");
  }

}

const GameData = {

  _executed: [],
  _charges: new Map(),


  getExecutedMoves: function() {
    return this._executed.map(identity);
  },

  handleMoveExecution: function(move, opponent_move) {
    return move.handleMove(this, opponent_move);
  },

  getCharges(move) {
    if (_charges.includes(move)) {
      return _charges.get(move.map(identity))
    } else {
      return 0;
    }
  },

  setCharges(move, amount) {
    if (amount < 0 || !Number.isInt(amount)) {
      throw new Error("Amount must be a positive integer!");
    }
    if (amount == 0) {
      this._charges.remove(move);
      return;
    }
    if (typeof move != Move) {
      throw new TypeError(move + " is not a move!")
    }
    var charges = amount;
    this._charges.set(move, charges);
  },

  clearCharges(move) {
    this._charges.remove(move);
  },

  addCharge(move) {
    addCharge(moveType);
  },

  addCharge(move, amount) {
    if (amount < 0) {
      throw new Error("Amount must be greater than 0!");
    }
    if (amount == 0) {
      this._charges.remove(move);
      return;
    }
    if (typeof move != Move) {
      throw new TypeError(move + " is not a move!")
    }
    var charges = amount;
    if (this._charges.includes(move)) {
      charges = this._charges.get(move) + amount;
    }
    this.setCharges(move, charges);
  },

  consumeCharge(move) {
    removeCharge(move, 1);
  },

  consumeCharge(move, amount) {
    if (amount < 1) {
      throw new Error("Amount must be greater than 0!");
    }
    if (amount > this.getCharges(move)) {
      throw new Error("Cannot consume more charges than charged!");
    }
    if (typeof move != Move) {
      throw new TypeError(move + " is not a move!")
    }
    if (this._charges.includes(move)) {
      charges = this._charges.get(move) - amount;
    }
    this.setCharges(move, charges);
  }

}
 
const Game = function(channel, player1, player2) {

  this.player1 = player1;
  this.player2 = player2;
  this.channel = channel;

  {
    player1.game = this;
    player2.game = this;
  }

  function getOpponent(player) {
    if (!this.isPlayer(player)) {
      throw new Error("Player is not in this game!");
    }
    return player == this.player1 ? this.player2 : this.player1;
  };

  function isPlayer(player) {
    return player == this.player1 || player == this.player2;
  };

};

const GameManager = {

  playerMap: new Map(),
  games: [],
  active_game_channels: [],

  createGame: function(channel, player1, player2) {
    if (this.isInGame(player1, player2, channel)) {
      throw new Error("One of the players is already in a game!");
    }
    const game = Game(channel, player1, player2);
    this.active_game_channels.push(channel);
    this.playerMap.set(player1, game);
    this.playerMap.set(player2, game);
    return game;
  },

  getGame: function(player) {
    return this.playerMap.get(player);
  },
  checkOrGet_active_channels: function(channel){
    for(var i = 0; i < this.active_game_channels.length; i++){
      if(this.active_game_channels[i] == channel){
        return this.active_game_channels[i];
      }
    }
    return false;
  },
  // changed to accept channel 
  isInGame: function(p1, p2, channel) {
    for (const player in arguments) {
      if (this.playerMap.has(player) || this.active_game_channels.includes(channel)) {
        return true;
      }
    }
    return false;
  },
}

module.exports = GameManager;

