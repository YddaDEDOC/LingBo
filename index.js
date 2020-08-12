const Discord = require('discord.js');
const clientB = new Discord.Client();
const token = "NzQwMjAxMDk5MTg5MDI2ODM2.Xylj_g.xzQ_Nv9jYIlZJxtS68hSAakNkOY";
const prefix = '-';
const fs = require('fs');
var vipList = [];
clientB.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    clientB.commands.set(command.name, command);
}

clientB.on('ready', () =>{
    console.log('bot is online!');
});

var players = require('./player.js');
var game = require('./game.js');

function Invite(ms, opponent){
    this.challenger = [ms.author.tag, ms.author.id];
    this.challenged = [opponent.tag, opponent.id];
    this.accepting_channel = ms.channel.id;
    this.accepting = true;
};

var inviteManager = {
    activeInvites: [],
    createInvite: function(ms, opponent){
        var rett = new Invite(ms, opponent);
        this.activeInvites.push(rett);
        console.log(this.activeInvites);
        ms.channel.send(rett.challenger[0] + " challenges " + rett.challenged[0] + " to a battle!");
    },
    execute_invite: function(invited, ms){
        var inv = this.get_invited(invited);
        if (inv.accepting_channel != ms.channel.id){
            ms.channel.send("WRONG CHANNEL NEGGA, please be in the same channel");
            return;
        }
        this.remove_invite(inv);
        var P1 = players.create_player(inv.challenger[1],inv.challenger[0]);
        var P2 = players.create_player(inv.challenged[1],inv.challenged[0]);
        game.createGame(inv.accepting_channel, P1, P2);
        ms.channel.send(inv.challenger[0] + " accepted " + inv.challenged[0] + " 's invite!");
    },
    is_accepting: function(){
        return this.accepting;
    },
    check_invites: function(invite){
        for(var I = 0; I < this.activeInvites.length; I++){
            if(this.activeInvites[I].challenger[1] == invite){
                return true;
            }
        }
        return false;
    }, 
    check_invited: function(invite){
        for(var I = 0; I < this.activeInvites.length; I++){
            if(this.activeInvites[I].challenged[1] == invite){
                return true;
          }
        return false;
        }
    },
    get_invited: function(invite){
        for(var I = 0; I < this.activeInvites.length; I++){
            if(this.activeInvites[I].challenged[1] == invite){
                    return this.activeInvites[I]; 
          }
        return false;
        }
    },
    remove_invite: function(inn){
        this.activeInvites.splice(this.activeInvites.indexOf(inn), 1);
    }
}




var initGame = function(msg, cmd){
    var tempN;
    if (inviteManager.check_invites(msg.author.id) != true && cmd == 'startgame'){
        if (game.checkOrGet_active_channels(msg.channel)){return;}
        console.log("starting");
        var mentions = msg.mentions.users.first();
        console.log(mentions);
        if (mentions == null) {return;};
        inviteManager.createInvite(msg, mentions); 
       // clientB.commands.get('game').execute(msg, args);
    } else if (inviteManager.check_invited(msg.author.id) == true && cmd == 'accept') {
        inviteManager.execute_invite(msg.author.id, msg);
        console.log("done!");
      // msg.channel.send(pL[0].name + ' VS ' + pL[1].name);
    } 
}

clientB.on('message', msg =>{
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    initGame(msg, command);

    switch (command){
        case 'time':
            function n(i){
                msg.channel.send(i);
            }
            clientB.commands.get('time').execute(n);
            break;
        case 'test':
            let mentions = msg.mentions.users.first();
            console.log(mentions.tag);
            break;
        case 'g':
            clientB.commands.get('g').execute(msg, args);
            break;
        case 'getid':
            clientB.commands.get('getid').execute(msg, args);
            break;
        case 'rbot':
            if (msg.author.id !== 383557863953399808) return;
            msg.channel.send('Restarted.').then(() => {
             process.exit(1);  
            })
            break;
    }
});

clientB.login(token);