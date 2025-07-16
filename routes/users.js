var express = require('express');
var router = express.Router();
const Users = require('../models/users');
require('../models/connection');
const { checkBody } = require('../modules/checkBody');

router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ['name', 'email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
    Users.find().then(data => {
        if (!req.body.name || !req.body.email || !req.body.password) {
            res.json({ result: false, error: 'Missing or empty fields'});
        } else if (data.some(e => e.email === req.body.email)) {
            res.json({ result: false, error: 'User already exists'});
        } else {
            const newUser = new Users({
                name: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });
            newUser.save().then(() => {
                res.json({ result: true});
            });
        };
    });
});

router.post('/signin', (req, res) => {
    if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
    Users.find().then(data => {
        if (!req.body.email || !req.body.password) {
            res.json({ result: false, error: 'Missing or empty fields'});
        } else if ((!data.some(e => e.email === req.body.email && e.password === req.body.password))) {
            res.json({ result: false, error:'User not found'});
        } else {
            res.json({ result: true});
        };
    });
});

module.exports = router;