const express = require('express');

const loginRoute = express.Router();


const login = require('../../controllers/admin_controller/loginController');
const admin = require('../../middlewares/admin');


loginRoute.post('/login',login)
loginRoute.get('/login',admin,login)


module.exports = loginRoute

