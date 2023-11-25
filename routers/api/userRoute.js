const express = require('express');

const userRoute = express.Router();

const {login,loginPage,registerPage,addUser, logOut, profile, homePage} = require('../../controllers/api_controller/userController');

const checkLogin = require('../../middlewares/authCheck');

userRoute.get('/loginPage',loginPage);
userRoute.post('/login',login);
userRoute.get('/registerPage',registerPage);
userRoute.post('/addUser',addUser);
userRoute.get('/logOut',logOut);
userRoute.get('/profile',checkLogin,profile);
userRoute.get('/homePage',checkLogin,homePage);

module.exports = userRoute;

