const express = require('express');

const userRoute = express.Router();

const {login,loginPage,registerPage,addUser} = require('../../controllers/api_controller/userController');
const admin = require('../../middlewares/admin');

userRoute.get('/loginPage',loginPage);
userRoute.post('/login',login);
userRoute.get('/registerPage',registerPage);
userRoute.post('/addUser',addUser);


module.exports = userRoute;

