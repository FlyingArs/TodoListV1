/*
 * File Name: index.js
 * Author's Name: David Yu 200286902
 * Website Name:http://tomassignment3.azurewebsites.net/
 * File Desciption: the handler that renders all the pages handle all the pages and send emails.
 * It also renders registration and login pages. 
 */


//create express and router objects
var passport = require('passport');
var express = require('express');
var router = express.Router();

//request the user schema
var User = require('../models/user');

//create a nodemailer object
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        message: 'Donald\'s World',
        displayName: req.user ? req.user.username : ''
    });
});

/* GET about page */
router.get('/about', function (req, res, next) {
    res.render('about', {
        title: 'About',
        displayName: req.user ? req.user.username : ''
    });
});

/* GET projects page */
router.get('/projects', function (req, res, next) {
    res.render('projects', {
        title: 'Projects',
        displayName: req.user ? req.user.username : ''
    });
});

/* GET services page */
router.get('/services', function (req, res, next) {
    res.render('services', {
        title: 'Services',
        displayName: req.user ? req.user.username : ''
    });
});

/* GET contact page */
router.get('/contact', function (req, res, next) {
    res.render('contact', {
        title: 'Contact',
        displayName: req.user ? req.user.username : ''
    });
});

/* POST contact page: 
using nodemailer to send email when user hit the "submit" button */

//create a mail transporter
var transporter = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "flyingars@gmail.com",
        pass: "October19*"
    }
});

//create the POST method
router.post('/contact', function (req, res) {

    //specify the mail option   
    var mailOptions = {
        from: 'flyingars@gmail.com',
        to: 'flyingars@gmail.com',
        subject: 'New Business Idea',
        text: req.body.name + req.body.email + req.body.message

    };

    //transporter sends the email
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.render('contact', {
                title: 'Wrong Input. Something Happend.'
            });
        } else {
            res.render('contact', {
                title: 'Correct Input. Thank You For Your Information.'
            });
        }

    });

});


/* Login and Registration Pages */

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.usrename : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/contacts',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.username : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect: '/users',
    failureRedirect: '/register',
    failureFlash: true
}));


/* Process Logout Request */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;