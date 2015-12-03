/*
 * File Name: todo.js
 * Author's Name: David Yu 200286902
 * Website Name:http://todolistangular.azurewebsites.net/
 * File Desciption: this is the schema for the MongoDB todo table.
 */
// Todo Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	name: String,
	completed: Boolean,
	note: String,
	username: String,
	updated: {type: Date, default: Date.now}
}, {
	collection: 'todos'
});

module.exports = mongoose.model('Todo', TodoSchema);
