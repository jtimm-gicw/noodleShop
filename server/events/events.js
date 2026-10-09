// ONE shared event hub, just like Order Up! Pizzeria's modular events.js.
const { EventEmitter } = require('events');
module.exports = new EventEmitter();
