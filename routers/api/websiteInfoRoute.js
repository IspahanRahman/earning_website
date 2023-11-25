const express = require('express');

const websiteInfoRoute = express.Router();

const {aboutPage} = require('../../controllers/api_controller/websiteInfoController');

const checkLogin = require('../../middlewares/authCheck');

websiteInfoRoute.get('/aboutPage',checkLogin,aboutPage);


module.exports = websiteInfoRoute;