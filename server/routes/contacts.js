/*
 * File Name: contacts.js
 * Author's Name: David Yu 200286902
 * Website Name:http://tomassignment3.azurewebsites.net/
 * File Desciption: this is the handler that handles all the business contact list pages.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

// create a mongoose object and contact object to reference to the model
var mongoose = require('mongoose');
var Contact = require('../models/contact');




/* A function that authenticates the sensitive area of the website */
function requireAuth(req, res, next) {

    // check if the user is logged in
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    }
    next();
}


/* GET business contacts list view page */
router.get('/', requireAuth, function (req, res, next) {

    // Use contact.js to retrive all the records in the contacts database
    Contact.find(function (err, contacts) {
        // send a message when error occurs
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //display the view
            res.render('contacts/index', {
                title: 'Contacts',
                contacts: contacts,
                displayName: req.user ? req.user.username : ''
            });
        }
    });

});

/* GET delete a business contact */
router.get('/delete/:id', requireAuth, function (req, res, next) {
    //get the id from url
    var id = req.params.id;

    //use contact.js within the model folder to delete the record
    Contact.remove({
        _id: id
    }, function (err) {
        //if there is an error, print out the error message
        if (err) {
            console.log(err);
            res.end(err);
        }
        //if no error, redirect to the home page
        else {
            res.redirect('/contacts');
        }
    });
});

/* GET direct to the update form */
router.get('/update/:id', requireAuth, function (req, res, next) {
    //get the id
    var id = req.params.id;

    //if there is an error, pint out the error message. Otherwise, direct to the update page
    Contact.findById(id, function (err, Contact) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('contacts/update', {
                title: 'Contact Details',
                contact: Contact,
                displayName: req.user ? req.user.username : ''
            })
        }
    });
});

/* POST update the selected contact */
router.post('/update/:id', requireAuth, function (req, res, next) {
    //get the id
    var id = req.params.id;

    //create and populate a contact object
    var contact = new Contact({
        _id: id,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    });

    //update
    Contact.update({
        _id: id
    }, contact, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contacts');
        }
    });
});

/* GET when cancel button is hit, direct to the home page */
router.get('/cancel', requireAuth, function (req, res, next) {
    //if there is an error, output an error message. Otherwise direct back to the business contact list page
    if (err) {
        console.log(err);
        res.end(err);
    } else {
        res.render('contacts');
    }
});


// make this public so the rest of app can see it
module.exports = router;