/*
 * File Name: contact.js
 * Author's Name: David Yu 200286902
 * Website Name:http://tomassignment3.azurewebsites.net/
 * File Desciption: this is the schema for the MongoDB contact table.
 */

//require the moongose object
var mongoose = require('mongoose');

//create a schema for the the business contact list
var contactSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Contact name is required'
    },
    number: {
        type: String,
        default: '',
        trim: true,
        required: 'Contact number is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email Address is required'
    }
});

// make this file public
module.exports = mongoose.model('Contact', contactSchema);