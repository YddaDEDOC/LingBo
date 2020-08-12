function Player (tag, id){
    this.tag = tag;
    this.id = id;
    this.opponent = null;
    return {name: this.tag, ID: this.id, opponent: this.opponent};

}

var playerManager = {
    active_players: new Map(),
   // active_player_sets: new Map(),
   // player_grouper: [],
    set_opponent: function(Player1, Player2){
        Player1.opponent = Player2.ID;
        Player2.opponent = Player1.ID;
    },

    create_player: function(discord_id, tag) {
      var ret = this.get_player(discord_id);
      if (ret != null) {
        return ret;
      } else {
        ret = Object.create(Player(discord_id, tag));
        this.active_players.set(discord_id, ret);
        return ret;
      } 
    },

    get_player: function(discord_id) {
       if (this.active_players.has(discord_id)) {
         return this.active_players.get(discord_id); // whot, it was 'number' b4
       }
       return null;
    },

    is_player: function(discord_id) {
      return this.get_player(discord_id) != null;
    },

    get_players: function(discord_id){
        return this.active_players.get(discord_id);
    },
    remove_players: function(mCode){
        this.active_players.delete(mCode);
    }

}

module.exports = playerManager;


/* var playerManager = {
  active_players: [],
  active_player_sets: new Map(),
  player_grouper: [],
  set_opponent: function(Player1, Player2){
      Player1.opponent = Player2.ID;
      Player2.opponent = Player1.ID;
  },
  add_players: function(Player){
      //if (this.player_grouper.includes(Player)) return;
      this.player_grouper.push(Player)
      console.log(this.player_grouper);
      if (this.player_grouper.length == 2){
          console.log(this.player_grouper[0].ID)
          //this.set_opponent(this.player_grouper[0], this.player_grouper[1]);
          this.active_player_sets.set(this.player_grouper[0].ID, this.player_grouper);
          this.player_grouper.splice(0, this.player_grouper.length);
          console.log(this.active_player_sets);

      }

  },
  get_players: function(p){
      return this.active_player_sets.get(p);
  },
  remove_players: function(mCode){
      this.active_player_sets.delete(mCode);
  }

} */