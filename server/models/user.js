/*
 * File Name: user.js
 * Author's Name: David Yu 200286902
 * Website Name:http://tomassignment3.azurewebsites.net/
 * File Desciption: this is the schema for the MongoDB user table.
 */
//import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema; // Schema object

var UserSchema = new Schema({
	username: String,
	password: String,
	email: String,	
	salt: String,
	provider: String,
	providerId: String,
	providerData: {},
	created: Number,
	updated: Number
}, 
{
	collection: 'userInfo'
});

// Generating a Hash
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// Checking if password is valid
UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);