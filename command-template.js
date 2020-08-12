const { Message } = require("discord.js")

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Invalid Input handler 
var InvalidInputError = /** @class */ (function (_super) {
    __extends(InvalidInputError, _super);
    function InvalidInputError(message) {
        return _super.call(this, message) || this;
    }
    return InvalidInputError;
}(Error));
// Error handler 
var CommandExecutionError = /** @class */ (function (_super) {
    __extends(CommandExecutionError, _super);
    function CommandExecutionError(message) {
        return _super.call(this, message) || this;
    }
    return CommandExecutionError;
}(Error));
// Abstract for command-sender
var CommandSender = /** @class */ (function () {
    function CommandSender() {
    }
    CommandSender.prototype.sendMessage = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        for (var msg in message) {
            this.sendSingleMessage(msg);
        }
    };
    ;
    return CommandSender;
}());
;
// Type 
function identity(arg) {
    return arg;
}
// Person class, works apparently?
var Person = {
    name: null,
    age: -1,
    constructor: function (name, age) {
        if (name == null || name.trim().length == 0) {
            throw new Error("Name cannot be null or empty!");
        }
        if (age < 0 || age > 100) {
            throw new Error("Invalid age! Out of bounds!");
        }
        this.name = name;
        this.age = age;
    }
};
// Person register object - using an object as a class
var person_registrar = {
    _register: [],
    getpersonByName: function (name) {
        if (this._registrar.includes(name.toLowerCase)) { // Case insentive search for exisitng entry 
            return this._registrar[(this._registary.indexOf(name))]; // retrive registered person by name, test later
        }
        return null;
    },
    registerPerson: function (person) {
        if (this._registrar.includes(person)) {
            throw new Error("Person already registered!");
        }
        this._registrar.push(person);
    },
    RregisterPerson: function (person) {
        if (this._registrar.includes(person)) {
            throw new Error("Person already registered!");
        }
        this._registrar.push(person);
    }
};
var ctx_resolver = {
    _resolvers: new Map(),
    constructor: function (input) {
        this.input = input;
        this.register_resolver(function (input) { return input; }); // Resolver for a string
        this.register_resolver(function (input) {
            try {
                return Number(input);
            }
            catch (error) {
                throw new InvalidInputError(error.message);
            }
        });
        this.register_resolver("person", function (input) { // What?
            var ret = person_registrar.getpersonByName(input);
        });
    },
    resolve: function identity(input) {
        var required = {};
        var resolvers = this._resolvers;
        var func = resolvers.get(required);
        if (func != null) {
            return func.apply(input);
        }
        return null;
    },
    register_resolver: function (resolver_name, resolver) {
        this._resolvers.remove(resolver_name);
        if (typeof resolver == "function") {
            if (resolver.arguments.length > 1) {
                throw new Error("Function length is > 1!");
            }
        }
        this._resolvers.put(resolver_name, resolver);
    }
};
var command_manager = {
    handleInput: function (input) {
        if (input == null || !input.startsWith("/") || input.length < 2) {
            return;
        }
        var inputs = input.split(" ");
        var label;
        if (inputs.length == 0) {
            label = input.substr(1);
        }
        else {
            label = inputs[0].substr(1);
        }
        var command = this.get_command(label);
        if (command != null) {
            var resolved_args = [];
            var types = this._type_registrar.get();
            for (var param_type in types) {
                var resolved = ctx_resolver.resolve;
            }
        }
    },
    // Command label --> executor
    _label_registrar: new Map(),
    _type_registrar: new Map(),
    // Comand label --> aliases
    _alias_registrar: new Map(),
    register_command: function (executor, params, label) {
        var aliases = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            aliases[_i - 3] = arguments[_i];
        }
        for (var param in params) {
            var type_name = typeof param;
            if (!this._command_registrar.contains(type_name)) { // Check if resolver exists, else throw error
                throw new Error("No resolver found for type: " + type_name);
            }
        }
        this._type_registar.set(label, params);
        this._label_registrar.set(label, executor);
        for (var entry in this._alias_registrar) { // Check for existing aliases
            var arr = entry[1]; // Take the "value"
            var index = arr.indexOf(entry[0]); // Get the indexof the key
            if (index != -1) {
                arr.splice(index, 1); // Remove the alias as command labels take precendence!
            }
        }
        this._alias_registrar.set(label, aliases);
    },
    unregister_command: function (name, use_labels) {
        this._label_registar.remove(name);
        this._alias_registrar.remove(name);
        if (use_labels) {
            var toRemove = [];
            for (var entry in this._alias_registrar) {
                var aliases = entry[1];
                if (aliases.indexOf(name) != -1) {
                    toRemove.push(entry[0]); // Add the label to remove
                }
            }
            for (var label in toRemove) { // Remove all the labels, ignoring the aliases.
                this.unregister_command(label, false);
            }
        }
    },
    get_command: function (name) {
        var cmd = this.label_registrar.get(name);
        if (cmd != null) {
            return cmd;
        }
        for (var entry in this._alias_registrar) {
            if (entry[1].includes(name)) {
                return this.get_command(entry[0]);
            }
        }
        return null;
    }
};
function registerCreateCommand() {
    var executor = function (name, age) {
        return Person.constructor(name, age);
    };
    var params = {};
    command_manager.register_command(executor, params, "addperson", "ap");
}
this.registerCreateCommand();

function closureGen(){
    
}

module.exports = {
    name: 'command',
    description: "given command",
    execute(msg, args){

        msg.channel.send('Starting game with ' + pOne.name + ' as player 1!');

    }
}